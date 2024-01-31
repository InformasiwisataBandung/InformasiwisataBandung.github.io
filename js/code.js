document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('table-body');
    const loadingSpinner = document.getElementById('loading-spinner');
  
    const fetchData = async () => {
      try {
        const token = getCookie('token');
        const response = await fetch('https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/Function-3ReadWisata', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const { data } = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        return null;
      }
    };
  
    const fillTable = (data) => {
      // Bersihkan isi tabel sebelum mengisi data baru
      tableBody.innerHTML = '';
  
      if (data && data.data) {
        data.data.forEach((item) => {
          const row = `
            <tr>
              <td>${item.nama}</td>
              <td>${item.jenis}</td>
              <td>${item.alamat}</td>
              <td>${item.rating}</td>
            </tr>
          `;
          tableBody.innerHTML += row;
        });
      } else {
        console.error('Data structure is not as expected:', data);
      }
  
      // Sembunyikan loading spinner setelah data dimuat
      loadingSpinner.style.display = 'none';
    };
  
    const showErrorMessage = (message) => {
      // Tampilkan pesan error di dalam tabel atau tempat lain yang sesuai
      console.error(message);
      const errorContainer = document.getElementById('notification-container');
      errorContainer.innerHTML = `<div class="notification is-danger">${message}</div>`;
    };
  
    fetchData()
      .then((data) => {
        if (data) {
          fillTable(data);
        } else {
          showErrorMessage('Failed to fetch data.');
        }
      })
      .catch((error) => {
        showErrorMessage('Error fetching data. Please try again.');
      });
  
    // Fungsi untuk mendapatkan nilai cookie berdasarkan nama
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
  });
  