import {setCookieWithExpireHour} from "https://jscroot.github.io/cookie/croot.js";

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const message = document.getElementById("message");
    
    
    const submitButton = document.getElementById("submit");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const usernameInput = document.getElementById("username").value;
        const passwordInput = document.getElementById("password");value;

        // Kirim permintaan POST ke API
        fetch("https://us-central1-bustling-walker-340203.cloudfunctions.net/SIgnin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === true) {
                // Pengolahan respons setelah login berhasil
                const token = data.token;
                const welcomeMessage = data.message;
                message.textContent = welcomeMessage;
                setCookieWithExpireHour("token",token,2);
                message.style.color = "green";
                console.log(token);

                // Redirect ke halaman dashboard setelah login berhasil
                window.location.href = "../pages/dashboard.html";
            } else {
                // Pengolahan respons jika login gagal
                errorMessage.textContent = "Userr not found"; // pesan kesalahan
            }
        })
        .catch(error => {
            console.error("ErrorR:", error);
        });
    });
});