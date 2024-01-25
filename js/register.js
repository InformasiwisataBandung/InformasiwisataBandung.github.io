// Tambahkan event listener untuk mengirim permintaan saat formulir dikirim
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Mencegah pengiriman form default

    //Ambil nilai dari input username dan password dan nomor wa
    const no_whatsapp = no_whatsappInput.value;
    const username = usernameInput.value;
    const password = passwordInput.value;
    const role = "user";

    //Kirim permintaan POST ke API register
    try {
        const response = await fetch(registerApiUrl, {
            method: "POST",
            //mode: "no-cors", // Menggunakan mode no-cors
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
            if (data.status === false) {
                // Tampilkan pesan kesalahan sesuai respons dari API
                errorMessage.textContent = data.message;
            } else {
                // Tampilkan pesan kesalahan umum jika respons tidak sesuai format yang diharapkan
                errorMessage.textContent = "Gagal melakukan pendaftaran.";
            }
        }
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    }
});
