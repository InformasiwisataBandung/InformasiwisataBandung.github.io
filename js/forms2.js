function submitForm() {
    const categorySelect = document.getElementById('categorySelect');
    const namaInput = document.getElementById('nama');
    const kontenTextarea = document.getElementById('konten');
    const alamatInput = document.getElementById('alamat');
    const gambarInput = document.getElementById('gambar');
    const ratingInput = document.getElementById('rating');
    
    // Get token from cookies
    const token = getCookie('token');
    
    // Validate form data before sending
    if (!validateForm()) {
        return;
    }
    
    // Prepare form data including the image file
    const formData = new FormData();
    formData.append('jenis', categorySelect.value);
    formData.append('nama', namaInput.value);
    formData.append('deskripsi', kontenTextarea.value);
    formData.append('alamat', alamatInput.value);
    formData.append('gambar', gambarInput.files[0]); // File input field
    formData.append('rating', parseFloat(ratingInput.value));
    
    // Make a POST request to the API endpoint with authorization
    fetch('https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/CreateWIsataToken1', {
        method: 'POST',
        headers: {
            'token': token // Add authorization header
        },
        body: formData, // Send form data as FormData
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        console.log('Success:', data);
        showNotification("Data has been successfully submitted", "success");
        // You can handle success accordingly, for example, display a success message or redirect the user
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification("Failed to submit data. Please try again.", "danger");
        // Handle errors, display an error message, or log the error
    });
}
