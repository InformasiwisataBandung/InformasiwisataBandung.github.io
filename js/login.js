//Mengambil nilai dari elemen input pada HTML  
const loginForm = document.getElementById("loginForm");
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

//Panggil fungsi validation saat input beruba  
usernameInput.addEventListener("input", validation);
passwordInput.addEventListener("input", validation);

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Kirim permintaan HTTP POST ke server Golang (sesuaikan dengan URL yang benar)
    fetch("https://asia-southeast2-testlogin-366704.cloudfunctions.net/function-16", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === true) {
                // Redirect user to user.html upon successful login
                window.location.href = "../pages/dashboard.html";
            } else {
                // Handle failed login
                errorMessage.textContent = "Userr not found"; // pesan kesalahan
            }
        })
        .catch(error => {
            console.error("Errorr:", error);
        });
});

/**
// Handle form submission
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    // Kirim permintaan HTTP POST ke server Golang
    const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        // Redirect user to user.html upon successful login
        window.location.href = "user.html";
    } else {
        // Handle failed login
        console.log("Login failed. Please check your username and password.");
    }
});
 */
