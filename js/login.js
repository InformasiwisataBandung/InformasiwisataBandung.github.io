import {setCookieWithExpireHour} from "https://jscroot.github.io/cookie/croot.js";

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const message = document.getElementById("message");
    const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
    const submitButton = document.getElementById("submit");
    const errorMessage = document.getElementById("error-message");

    //Fungsi untuk mengecek apakah form telah diisi dengan benar
    const validation = () => {
    const username = usernameInput.value;
    const pass = passwordInput.value;
    if (username !== "" && pass !== "") {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
    };

    //Panggil fungsi validation saat input berubah
    usernameInput.addEventListener("input", validation);
    passwordInput.addEventListener("input", validation);

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const username = usernameInput.value;
    const password = passwordInput.value;

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
            console.error("Errorr:", error);
        });
    });
});