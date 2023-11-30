document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postName = urlParams.get('postName');

    // Mengambil data berdasarkan postName
    // You need to implement this fetch function based on your API
    const fetchDataForEdit = async (postName) => {
        try {
            const response = await fetch(`https://us-central1-bustling-walker-340203.cloudfunctions.net/function-7ReadWisata`);
            const data = await response.json();
            
            // Temukan data yang sesuai dengan postName
            const postData = data.data.find(item => item.nama === postName);
            return postData;
        } catch (error) {
            console.error('Errorr fetching data for edit:', error);
        }
    };

    const populateFormForEdit = async () => {
        const data = await fetchDataForEdit(postName);

        // Mengisi bidang formulir dengan data
        if (data) {
            document.getElementById('nama').value = data.nama;
            document.getElementById('konten').value = data.deskripsi;
            document.getElementById('alamat').value = data.alamat;

            // Menangani input file secara terpisah
            const fileInput = document.getElementById('gambar');
            fileInput.parentNode.querySelector('.file-name').innerText = data.gambar;

            document.getElementById('rating').value = data.rating;

            // Tetapkan kategori yang dipilih di menu dropdown
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

    // Mengambil data dan mengisi formulir saat memuat halaman
    populateFormForEdit();

    // Set up event listener for Done button
    const submitBtn = document.getElementById('editBtn');
    submitBtn.addEventListener('click', async () => {
        // Handle form submission here
        const updatedData = {
            nama: document.getElementById('nama').value,
            deskripsi: document.getElementById('konten').value,
            alamat: document.getElementById('alamat').value,
            gambar: document.getElementById('gambar').value,
            rating: document.getElementById('rating').value,
            jenis: document.getElementById('categorySelect').value,
        };

        // Handle the update API call here
        await updateDataFunction(updatedData);

        // Redirect to the dashboard or another page after successful update
        window.location.href = 'admindashboard.html';
    });    

});

// Add this function to handle the API call for updating data
const updateDataFunction = async (data) => {
    try {
        const response = await fetch('https://us-central1-bustling-walker-340203.cloudfunctions.net/function-8UpdateWisata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log('Update result:', result);
    } catch (error) {
        console.error('Error updating data:', error);
    }
};