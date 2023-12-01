document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postName = urlParams.get('postName');

    // Function to fetch data for editing
    const fetchDataForEdit = async (postName) => {
        try {
            const response = await fetch(`https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/function-7ReadWisata`);
            const data = await response.json();
            const postData = data.data.find(item => item.nama === postName);
            return postData;
        } catch (error) {
            console.error('Error fetching data for edit:', error);
        }
    };

    const populateFormForEdit = async () => {
        const data = await fetchDataForEdit(postName);

        if (data) {
            // Populate form fields with data
            document.getElementById('nama').value = data.nama;
            document.getElementById('konten').value = data.deskripsi;
            document.getElementById('alamat').value = data.alamat;

            // Handling file input separately
            const fileInput = document.getElementById('gambar');
            fileInput.parentNode.querySelector('.file-name').innerText = data.gambar;

            document.getElementById('rating').value = data.rating;

            // Set the selected category in the dropdown menu
            const categorySelect = document.getElementById('categorySelect');
            const selectedCategory = data.jenis;
            for (let i = 0; i < categorySelect.options.length; i++) {
                if (categorySelect.options[i].value === selectedCategory) {
                    categorySelect.selectedIndex = i;
                    break;
                }
            }
        } else {
            console.error(`Data not found for postName: ${postName}`);
        }
    };

    // Fetch data and populate form on page load
    populateFormForEdit();

    // Set up event listener for Done button
    const submitBtn = document.getElementById('editBtn');
    submitBtn.addEventListener('click', async () => {
        const updatedData = {
            nama: document.getElementById('nama').value,
            deskripsi: document.getElementById('konten').value,
            alamat: document.getElementById('alamat').value,
            gambar: document.getElementById('gambar').value,
            rating: document.getElementById('rating').value,
            jenis: document.getElementById('categorySelect').value,
        };

        try {
            await updateDataFunction(updatedData);

            // Redirect to dashboard after successful update
            window.location.href = 'admindashboard.html';
        } catch (error) {
            console.error('Error updating data:', error);
            // Show an alert or handle the error accordingly
        }
    });

});

const updateDataFunction = async (data) => {
    try {
        const response = await fetch('https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/function-8UpdateWisata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Update result:', result);

    } catch (error) {
        console.error('Error updating data:', error);
        throw error; // Re-throw the error for the calling function to catch
    }
};

/**
 * func UpdateWisataHTTP(w http.ResponseWriter, r *http.Request) {
    // ... (same as your existing code)

	filter := requestBody["filter"].(map[string]interface{})
	update := requestBody["update"].(map[string]interface{})

	filterBSON, err := convertToBSON(filter)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	updateBSON, err := convertToBSON(update)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = gisbdg.UpdateWisata("mongodb+srv://MigrasiData:Salman123456.@cluster0.ot8qmry.mongodb.net", "InformasiWisataBandung", "TempatWisata", filterBSON, updateBSON)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"message": "Data updated successfully",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

//...

func UpdateWisata(databaseURL, databaseName, collectionName string, filter, update bson.D) error {
	// Connect to the MongoDB database
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(databaseURL))
	if err != nil {
		return err
	}
	defer client.Disconnect(context.Background())

	// Get the collection
	collection := client.Database(databaseName).Collection(collectionName)

	// Update the document in the collection
	_, err = collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return err
	}

	return nil
}

 */