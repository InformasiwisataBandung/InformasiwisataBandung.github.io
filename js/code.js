// ... (your existing code)

// Set up event listeners for edit buttons
const editButtons = document.querySelectorAll('.edit-post');
editButtons.forEach(button => {
    button.addEventListener('click', () => {
        const postName = button.getAttribute('data-post-name');
        // Redirect to the edit form with the postName parameter
        window.location.href = `formedit.html?postName=${postName}`;
    });
});

// ... (your existing code)
