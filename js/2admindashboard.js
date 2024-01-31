document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('table-body');
    const loadingSpinner = document.getElementById('loading-spinner');

    const fetchData = async () => {
        try {
            const token = getCookie('token');
            console.log('Token:', token); // Log the token for debugging
            const response = await fetch('https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/Function-3ReadWisata', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Response:', response); // Log the entire response for debugging

            if (!response.ok) {
                console.error('Response:', response);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Response Data:', responseData); // Log the parsed JSON data

            return responseData.data; // Assuming the actual data is nested under 'data' property
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error to be caught in the outer catch block
        }
    };

    const fillTable = (data) => {
        // Clear the table before populating with new data
        tableBody.innerHTML = '';

        if (data && Array.isArray(data)) {
            data.forEach((item) => {
                const row = `
                <tr>
                <td>${item.nama}</td>
                <td>${item.jenis || ''}</td>
                <td>${item.alamat || ''}</td>
                <td>${item.rating || ''}</td>
                </tr>
                `;
                tableBody.innerHTML += row;
            });
        } else {
            console.error('Data structure is not as expected:', data);
            showErrorMessage('Invalid data structure received from the server.');
        }

        // Hide the loading spinner after data is loaded
        loadingSpinner.style.display = 'none';
    };

    const showErrorMessage = (message) => {
        // Display error message in the table or appropriate location
        console.error(message);
        const errorContainer = document.getElementById('notification-container');
        errorContainer.innerHTML = `<div class="notification is-danger">${message}</div>`;
    };

    fetchData()
        .then((data) => {
            if (data) {
                fillTable(data);
            } else {
                showErrorMessage('Failed to fetch valid data.');
            }
        })
        .catch((error) => {
            showErrorMessage(`Error fetching data: ${error.message}`);
        });

    // Function to get cookie value by name
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
});
