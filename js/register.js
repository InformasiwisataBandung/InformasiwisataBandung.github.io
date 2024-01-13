registerForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Mencegah pengiriman form default

    // Tampilkan loading spinner
    const loadingSpinner = document.getElementById("loading-spinner");
    loadingSpinner.classList.remove("hidden"); // Menghapus kelas "hidden"

    // Ambil nilai dari input username dan password
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
            errorMessage.textContent = data.message; // Menampilkan pesan kesalahan dari API
        }
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    } finally {
        // Menyembunyikan loading spinner setelah selesai
        loadingSpinner.style.display = "none";
    }
});
