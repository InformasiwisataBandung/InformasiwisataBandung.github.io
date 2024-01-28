document.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');
    const wisataForm = document.getElementById('wisataForm');
    const errorMessage = document.getElementById('error-message');
  
    submitBtn.addEventListener('click', async function () {
      // Collect form data
      const nama = document.getElementById('nama').value;
      const kategori = document.getElementById('categorySelect').value;
      const konten = document.getElementById('konten').value;
      const alamat = document.getElementById('alamat').value;
      const gambar = document.getElementById('gambar').value;
      const rating = parseFloat(document.getElementById('rating').value);
  
      // Validate form data
      if (!nama || !kategori || !konten || !alamat || !gambar || isNaN(rating)) {
        errorMessage.textContent = 'Please fill in all fields and ensure rating is a valid number.';
        return;
      }
  
      // Prepare data object
      const data = {
        nama,
        jenis: kategori,
        deskripsi: konten,
        lokasi: {
          type: 'Point',
          coordinates: [0] // You may replace this with actual coordinates
        },
        alamat,
        gambar,
        rating
      };
  
      // Make POST request
      try {
        const response = await fetch('https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/CreateWIsataToken1', {
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
        console.log('Post created successfully:', result);
  
        // Reset form and clear error message
        wisataForm.reset();
        errorMessage.textContent = '';
      } catch (error) {
        console.error('Error creating post:', error);
        errorMessage.textContent = 'An error occurred while creating the post. Please try again.';
      }
    });
  
    resetBtn.addEventListener('click', function () {
      // Reset form and clear error message
      wisataForm.reset();
      errorMessage.textContent = '';
    });
  });
  