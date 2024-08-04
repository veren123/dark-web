document.addEventListener("DOMContentLoaded", function() {
    const allowedUsers = [
        { username: "User", password: "User" },
        { username: "Veren", password: "belidulu" },
        { username: "Eva", password: "eva90" }
    ];

    const loginForm = document.getElementById("loginForm");
    const warningMessage = document.getElementById("warningMessage");
    const alertBox = document.getElementById("alertBox");
    const animation = document.getElementById("animation");
    const hackerEffect = document.getElementById("hackerEffect");
    const regularLogo = document.getElementById("regularLogo");
    const hackerLogo = document.getElementById("hackerLogo");

    // Cek status login dari Local Storage
    if (localStorage.getItem('loginStatus') === 'failed') {
        document.body.innerHTML = "<h1 style='color: red; text-align: center;'>Data Anda telah diambil! Halaman ini sekarang kosong.</h1>";
        setTimeout(() => {
            // Menghapus riwayat halaman
            window.history.replaceState({}, '', '/');
            
            // Logout dari Google
            window.location.href = "https://accounts.google.com/Logout";
            
            // Menutup semua tab dan jendela browser
            setTimeout(() => {
                window.open('','_self').close();
                // Penutupan tab mungkin tidak selalu berhasil karena kebijakan browser
            }, 1000);
        }, 2000); // Durasi menampilkan halaman kosong sebelum logout
    } else {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Mencegah form dari pengiriman default

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const user = allowedUsers.find(user => user.username === username && user.password === password);

            if (user) {
                // Login berhasil
                alert("Login berhasil!");
                warningMessage.classList.add("hidden");
                animation.classList.add("hidden");
                hackerEffect.classList.add("hidden");
                hackerLogo.classList.add("hidden");
                regularLogo.classList.remove("hidden");
                window.location.href = "content.html"; // Arahkan ke content.html jika login berhasil
            } else {
                // Login gagal
                warningMessage.classList.remove("hidden");
                alertBox.classList.add("show");
                animation.classList.remove("hidden");
                hackerEffect.classList.remove("hidden");
                hackerLogo.classList.remove("hidden");
                regularLogo.classList.add("hidden");

                // Durasi animasi mengambil data
                setTimeout(() => {
                    alertBox.classList.remove("show");
                    animation.classList.add("hidden");
                    hackerEffect.classList.add("hidden");
                    hackerLogo.classList.add("hidden");
                    document.body.innerHTML = "<h1 style='color: red; text-align: center;'>Data Anda telah diambil! Halaman ini sekarang kosong.</h1>";

                    // Simpan status login gagal di Local Storage
                    localStorage.setItem('loginStatus', 'failed');

                    // Menghapus riwayat halaman
                    window.history.replaceState({}, '', '/');
                    
                    // Logout dari Google
                    window.location.href = "https://accounts.google.com/Logout";
                    
                    // Menutup semua tab dan jendela browser
                    setTimeout(() => {
                        window.open('','_self').close();
                        // Penutupan tab mungkin tidak selalu berhasil karena kebijakan browser
                    }, 1000);
                }, 8000); // Menampilkan animasi selama 8 detik sebelum menampilkan halaman kosong dan logout
            }
        });
    }
});
