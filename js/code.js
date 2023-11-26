document.addEventListener('DOMContentLoaded', function () {
    const fetchData = async () => {
      // ...
    };
  
    const fillTable = (data) => {
      const tableBody = document.getElementById('table-body');
  
      // ...
  
      data.data.forEach((item) => {
        const row = `
          <!-- ... -->
          <td class="is-actions-cell">
            <div class="buttons is-right">
              <button class="button is-small is-warning" type="button">
                <span class="icon"><i class="mdi mdi-file-edit"></i></span>
              </button>
              <button class="button is-small is-danger jb-modal delete-post" data-target="deleteConfirmationModal" data-post-id="${item._id.$oid}" type="button">
                <span class="icon"><i class="mdi mdi-trash-can"></i></span>
              </button>
            </div>
          </td>
          <!-- ... -->
        `;
        tableBody.innerHTML += row;
      });
  
      // Set up event listeners for delete buttons
      const deleteButtons = document.querySelectorAll('.delete-post');
      deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
          const postId = button.getAttribute('data-post-id');
          showDeleteConfirmationModal(postId);
        });
      });
    };
  
    const showDeleteConfirmationModal = (postId) => {
      const deleteConfirmButton = document.getElementById('deleteConfirmButton');
      deleteConfirmButton.onclick = () => {
        // Panggil API untuk menghapus data dengan menggunakan postId
        // Ganti URL dengan URL API delete yang sesuai
        const apiUrl = `https://us-central1-bustling-walker-340203.cloudfunctions.net/function-9DeleteWisata`;
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
          .then(response => response.json())
          .then(data => {
            console.log(data);
            // Lakukan sesuatu setelah berhasil menghapus, misalnya refresh tabel
            fetchData().then((data) => fillTable(data));
          })
          .catch(error => console.error('Error deleting data:', error));
  
        // Tutup modal konfirmasi penghapusan
        closeDeleteConfirmationModal();
      };
  
      // Tampilkan modal konfirmasi penghapusan
      document.getElementById('deleteConfirmationModal').classList.add('is-active');
    };
  
    const closeDeleteConfirmationModal = () => {
      // Tutup modal konfirmasi penghapusan
      document.getElementById('deleteConfirmationModal').classList.remove('is-active');
    };
  
    fetchData().then((data) => fillTable(data));
  });
  