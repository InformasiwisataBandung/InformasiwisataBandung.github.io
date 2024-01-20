//https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/OtorisasiFIx
document.addEventListener("DOMContentLoaded", function() {
    const tokenForm = document.getElementById("tokenForm");
    const tokenTextArea = document.getElementById("tokenTextArea");
    const okButton = document.querySelector(".ok-button");
    const errorMessage = document.getElementById("error-message");

    tokenForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const token = tokenTextArea.value;

        // Send a request to the authentication API
        fetch("https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/OtorisasiFIx", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === true) {
                // Token is valid, redirect to card.html
                window.location.href = "../pages/card.html";
            } else {
                // Token is not valid, display error message
                errorMessage.textContent = "Token salah"; // Display error message
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });

    // Additional logic if needed...
});
