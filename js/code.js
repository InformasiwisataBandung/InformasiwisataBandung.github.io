document.addEventListener('DOMContentLoaded', function () {
    // ... (existing code) ...

    // Event listener for delete button click
    document.getElementById('table-body').addEventListener('click', function (event) {
        if (event.target.classList.contains('is-danger')) {
            // Show the delete confirmation modal
            document.getElementById('deleteModal').classList.add('is-active');

            // Event listener for confirm delete button click
            document.getElementById('confirmDelete').addEventListener('click', function () {
                // Close the modal
                document.getElementById('deleteModal').classList.remove('is-active');

                // Get the post ID from the clicked row (adjust this based on your data structure)
                const postId = event.target.closest('tr').dataset.postId;

                // Call the API to delete the post
                deletePost(postId);
            });

            // Event listener for modal close
            document.querySelector('.jb-modal-close').addEventListener('click', function () {
                document.getElementById('deleteModal').classList.remove('is-active');
            });
        }
    });

    // Function to delete post by calling the API
    const deletePost = async (postId) => {
        try {
            const response = await fetch('https://us-central1-bustling-walker-340203.cloudfunctions.net/function-9DeleteWisata', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers if needed
                },
                body: JSON.stringify({
                    filter: { _id: postId }, // Adjust this based on your data structure
                }),
            });

            if (!response.ok) {
                throw new Error('Error deleting post');
            }

            // Fetch and fill the table again after deletion
            const data = await fetchData();
            fillTable(data);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
});
