document.addEventListener('DOMContentLoaded', function () {
    // Fungsi untuk mendapatkan data dari API MongoDB
    const fetchData = async () => {
        try {
            const response = await fetch('https://us-central1-bustling-walker-340203.cloudfunctions.net/function-7ReadWisata');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Fungsi untuk mengisi tabel dengan data
    const fillTable = (data) => {
    const tableBody = document.getElementById('table-body');

    // Bersihkan isi tabel sebelum mengisi data baru
    tableBody.innerHTML = '';

    // Cek apakah data ada di dalam property "data"
    if (data && data.data) {
        // Iterasi melalui data dan tambahkan baris baru ke tabel
        data.data.forEach((item) => {
            const row = 
            `
                <tr>
                    <td class="is-checkbox-cell">
                        <label class="b-checkbox checkbox">
                            <input type="checkbox" value="false">
                            <span class="check"></span>
                        </label>
                    </td>
                    <td data-label="Judul">${item.nama}</td>
                    <td data-label="Jenis">${item.jenis}</td>
                    <td data-label="Alamat">${item.alamat}</td>
                    <td data-label="Rating">${item.rating}</td>
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
                </tr>
            `;
            // Tambahkan baris ke tabel
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
    } else {
        console.error('Data structure is not as expected:', data);
    }
    }; //end const fillTable = (data) => {

    // Panggil fetchData dan fillTable ketika halaman dimuat
    //fetchData().then((data) => fillTable(data));

    // Event listener for delete button click
    

    // Function to delete post by calling the API
    


}); //end document.addEventListener('DOMContentLoaded', function () {
