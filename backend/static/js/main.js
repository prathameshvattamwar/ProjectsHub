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

    // Validate Login Form
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        let username = document.getElementById("loginUsername").value;
        let password = document.getElementById("loginPassword").value;

        if (!username || !password) {
            document.getElementById("loginErrorMessage").style.display = "block";
            document.getElementById("loginErrorMessage").innerText = "Please fill in all fields.";
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
            displayError("Full Name should not be blank.");
        } else if (!validateEmail(email)) {
            displayError("Please enter a valid email address.");
        } else if (!dob) {
            displayError("Please select your Date of Birth.");
        } else if (!city) {
            displayError("City Name should not be blank.");
        } else if (!validatePassword(password)) {
            displayError("Password should be at least 6 characters long and must contain at least one lowercase letter, one uppercase letter, one special character, and one digit.");
        } else {
            registerUserInDatabase(fullName, email, contactNumber, dob, city, password);
        }
    });

    // Utility function to display error messages
    function displayError(message) {
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

    // Simulate checking user in database
    function checkUserInDatabase(username, password) {
        // Replace with actual AJAX request to your server
        let userExists = false; // Example: Assume user does not exist

        if (!userExists) {
            document.getElementById("loginErrorMessage").style.display = "block";
            document.getElementById("loginErrorMessage").innerText = "User not registered. Please sign up first.";
            $('#loginModal').modal('hide');
            $('#registerModal').modal('show');
        } else {
            window.location.href = "/dashboard"; // Replace with actual redirect
        }
    }

    // Simulate user registration
    function registerUserInDatabase(fullName, email, contactNumber, dob, city, password) {
        // Replace with actual AJAX request to your server
        let registrationSuccess = true; // Example: Assume registration is successful

        if (registrationSuccess) {
            alert("Registration successful! Redirecting to dashboard...");
            window.location.href = "/dashboard"; // Replace with actual redirect
        } else {
            displayError("Registration failed. Please try again.");
        }
    }

});
