document.addEventListener("DOMContentLoaded", function() {

    // Smooth Scrolling for Navbar Links
    $(".navbar-nav a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            let hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    const sections = [
        { trigger: "#home", target: "#home .container", y: 50, start: "top center" },
        { trigger: "#about", target: "#about h2", x: -100, start: "top 75%" },
        { trigger: "#about", target: "#about p", x: 100, delay: 0.2, start: "top 75%" },
        { trigger: "#services", target: "#services h2", scale: 0.5, start: "top 75%" },
        { trigger: "#services", target: "#services p", y: 50, delay: 0.2, start: "top 75%" },
        { trigger: "#why-choose-us", target: "#why-choose-us h2", y: -50, start: "top 75%" },
        { trigger: "#why-choose-us", target: "#why-choose-us p", y: 50, delay: 0.2, start: "top 75%" },
        { trigger: "#features", target: "#features h2", y: 100, start: "top 75%" },
        { trigger: "#features", target: "#features p", x: -100, delay: 0.2, start: "top 75%" },
        { trigger: "#contact", target: "#contact h2", x: -100, start: "top 75%" },
        { trigger: "#contact", target: "#contact p", x: 100, delay: 0.2, start: "top 75%" },
    ];

    sections.forEach(section => {
        gsap.from(section.target, {
            duration: 1,
            opacity: 0,
            y: section.y || 0,
            x: section.x || 0,
            scale: section.scale || 1,
            delay: section.delay || 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section.trigger,
                start: section.start
            }
        });
    });

    // Trigger Login Modal
    $("#loginBtn").on('click', function() {
        $('#loginModal').modal('show');
    });

    // Trigger Registration Modal via switch
    $("#switchToRegister").on('click', function(event) {
        event.preventDefault();
        $('#loginModal').modal('hide');
        $('#registerModal').modal('show');
    });

    // Trigger Login Modal via Upload Project button
    $("#uploadProjectsBtn").on('click', function() {
        $('#loginModal').modal('show');
    });

    $("#uploadProjectBtn").on('click',function(){
        $('#loginModal').modal('show');
    });

    // Validate Login Form
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        let username = document.getElementById("loginUsername").value;
        let password = document.getElementById("loginPassword").value;

        if (!username || !password) {
            displayLoginError("Please fill in all fields.");
        } else {
            checkUserInDatabase(username, password);
        }
    });

    // Validate Registration Form
    document.getElementById("registerForm").addEventListener("submit", function(event) {
        event.preventDefault();

        let fullName = document.getElementById("registerFullName").value;
        let email = document.getElementById("registerEmail").value;
        let contactNumber = document.getElementById("registerContactNumber").value;
        let dob = document.getElementById("registerDOB").value;
        let city = document.getElementById("registerCity").value;
        let password = document.getElementById("registerPassword").value;

        if (!fullName) {
            displayRegisterError("Full Name should not be blank.");
        } else if (!validateEmail(email)) {
            displayRegisterError("Please enter a valid email address.");
        } else if (!dob) {
            displayRegisterError("Please select your Date of Birth.");
        } else if (!city) {
            displayRegisterError("City Name should not be blank.");
        } else if (!validatePassword(password)) {
            displayRegisterError("Password should be at least 6 characters long and must contain at least one lowercase letter, one uppercase letter, one special character, and one digit.");
        } else {
            registerUserInDatabase(fullName, email, contactNumber, dob, city, password);
        }
    });

    // Utility function to display login error messages
    function displayLoginError(message) {
        const errorMsg = document.getElementById("loginErrorMessage");
        errorMsg.style.display = "block";
        errorMsg.innerText = message;
    }

    // Utility function to display registration error messages
    function displayRegisterError(message) {
        const errorMsg = document.getElementById("registerErrorMessage");
        errorMsg.style.display = "block";
        errorMsg.innerText = message;
    }

    // Utility function to validate email format
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    // Utility function to validate password
    function validatePassword(password) {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordPattern.test(password);
    }

    // Check user in database via AJAX request
    function checkUserInDatabase(username, password) {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: username, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirect to home instead of dashboard
                window.location.href = "/";
            } else {
                displayLoginError("User not registered or incorrect password. Please try again or sign up.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayLoginError("An error occurred. Please try again.");
        });
    }

    // Register user in database via AJAX request
    function registerUserInDatabase(fullName, email, contactNumber, dob, city, password) {
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullname: fullName,
                email: email,
                contact_number: contactNumber,
                dob: dob,
                city: city,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Registration successful! Redirecting to home...");
                window.location.href = "/";
            } else {
                displayRegisterError("Registration failed. Please try again.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayRegisterError("An error occurred. Please try again.");
        });
    }

});
