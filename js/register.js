// Ambil elemen-elemen HTML yang diperlukan
const no_whatsappInput = document.getElementById("no_whatsapp");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit");
const registerForm = document.getElementById("registerForm");
const errorMessage = document.getElementById("error-message");

// Link API register
const registerApiUrl = "https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/function-1SIGNAUTHWA";

// Tambahkan event listener untuk mengirim permintaan saat formulir dikirim
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Mencegah pengiriman form default

    // Ambil nilai dari input username, password, dan nomor WhatsApp
    const no_whatsapp = no_whatsappInput.value;
    const username = usernameInput.value;
    const password = passwordInput.value;
    const role = "user";

    // Kirim permintaan POST ke API register
    try {
        const response = await fetch(registerApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, no_whatsapp, role }),
        });

        if (response.ok) {
            // Pendaftaran berhasil, alihkan ke halaman suksesDaftar.html
            window.location.href = "../pages/suksesDaftar.html";
        } else {
            // Handle kesalahan jika diperlukan
            const data = await response.json();
            if (!data.success) {
                // Pendaftaran gagal, tampilkan pesan kesalahan dari API
                errorMessage.textContent = data.message;
            } else {
                // Pendaftaran berhasil, alihkan ke halaman suksesDaftar.html
                window.location.href = "../pages/suksesDaftar.html";
            }
        }
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    }
});
