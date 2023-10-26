// Ambil elemen-elemen HTML yang diperlukan
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit");
const registerForm = document.getElementById("registerForm");

// URL API register
const registerApiUrl = "https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/function-Signup";

// Tambahkan event listener untuk mengirim permintaan saat formulir dikirim
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Mencegah pengiriman form default

    // Ambil nilai dari input username dan password
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Kirim permintaan POST ke API register
    try {
        const response = await fetch(registerApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            // Pendaftaran berhasil, alihkan ke halaman login.html
            //window.location.href = "../pages/loginn.html";
            window.location.href = "../pages/dashboardd.html";
        } else {
            // Handle kesalahan jika diperlukan
            const data = await response.json();
            console.error("Gagal mendaftar:", data.message);
        }
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    }
});
