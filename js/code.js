document.addEventListener('DOMContentLoaded', function () {
    // ...
  
    const showDeleteConfirmationModal = (postId) => {
      const deleteConfirmButton = document.getElementById('deleteConfirmButton');
      deleteConfirmButton.onclick = () => {
        // Ganti URL API delete dengan URL yang sesuai
        const apiUrl = 'https://us-central1-bustling-walker-340203.cloudfunctions.net/function-9DeleteWisata';
  
        fetch(apiUrl, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filter: {
              _id: {
                $oid: postId,
              },
            },
          }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
            // Lakukan sesuatu setelah berhasil menghapus, misalnya refresh tabel
            fetchData().then((data) => fillTable(data));
          })
          .catch(error => {
            console.error('Error deleting data:', error);
            // Tampilkan pesan kesalahan ke pengguna
            alert('Error deleting data. Please try again.');
          })
          .finally(() => {
            // Tutup modal konfirmasi penghapusan, baik berhasil maupun gagal
            closeDeleteConfirmationModal();
          });
      };
  
      // ...
    };
  
    // ...
  });
  