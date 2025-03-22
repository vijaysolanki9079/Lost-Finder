// Func. to nav. btw pages
function navigateTo(page) {
    document.getElementById("home-page").style.display = "none";
    document.getElementById("login-page").style.display = "none";
    document.getElementById("signup-page").style.display = "none";
    document.getElementById("dashboard-page").style.display = "none";

    // Show the reqt. page
    document.getElementById(page + "-page").style.display = "block";
}
function openComparePage() {
    window.location.href = "compare.html"; 
}
function openReportPage() {
    window.location.href = "report.html"; 
}


// login form subm.
function handleLogin(event) {
    event.preventDefault(); 

    let identifier = document.getElementById("identifier").value;
    let password = document.getElementById("password").value;
    let loginError = document.getElementById("login-error");

    // Dummy user data for auth.
    let user = JSON.parse(localStorage.getItem("user"));

    if (user && (user.email === identifier || user.phone === identifier) && user.password === password) {
        localStorage.setItem("isLoggedIn", "true"); 
        localStorage.setItem("currentUser", user.firstName); 
        navigateTo("dashboard");
        document.getElementById("user-name").textContent = user.firstName; 
    } else {
        loginError.textContent = "Invalid email/phone or password!";
        loginError.style.display = "block";
    }
}

// Handle signup form subm.
function handleSignup(event) {
    event.preventDefault();

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password-signup").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let signupError = document.getElementById("signup-error");

    // Validation: Check if pass. match
    if (password !== confirmPassword) {
        signupError.textContent = "Passwords do not match!";
        signupError.style.display = "block";
        return;
    }

    let user = { firstName, lastName, email, phone, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Signup successful! You can now log in.");
    navigateTo("login");
}

// Handle logout
function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigateTo("home");
}

// Check if user is already logged in
window.onload = function () {
    if (localStorage.getItem("isLoggedIn") === "true") {
        navigateTo("dashboard");
        document.getElementById("user-name").textContent = localStorage.getItem("currentUser");
    } else {
        navigateTo("home");
    }
};

// Disable Right Click
document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    alert("Right-click is disabled!");
});

// Disable Keyboard Shortcuts
document.addEventListener("keydown", (event) => {
    if (
        event.key === "F12" || 
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) || 
        (event.ctrlKey && event.key === "U")
    ) {
        event.preventDefault();
        alert("Inspecting is disabled!");
    }
});

// Prevent Developer Tools
setInterval(() => {
    (function() {
        if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
            document.body.innerHTML = "Inspecting is disabled!";
            alert("Developer tools detected! Page content is blocked.");
        }
    })();
}, 1000);


