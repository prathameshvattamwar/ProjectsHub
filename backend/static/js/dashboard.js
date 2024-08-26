document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");
    const openBtn = document.getElementById("openBtn");
    const closeBtn = document.getElementById("closeBtn");
    const topNavbar = document.getElementById("top-navbar");
    const myDashboardLink = document.getElementById("my-dashboard-link");

    // Handle opening and closing of the sidebar
    openBtn.addEventListener("click", function() {
        sidebar.style.left = "0";
        mainContent.style.marginLeft = "250px";
        openBtn.style.display = "none";
    });

    closeBtn.addEventListener("click", function() {
        sidebar.style.left = "-250px";
        mainContent.style.marginLeft = "0";
        setTimeout(function() {
            openBtn.style.display = "block";
        }, 300);
    });

    // Handle content switching
    const contentSections = document.querySelectorAll('.content-section');
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            contentSections.forEach(section => {
                section.style.display = section.id === target ? 'block' : 'none';
            });

            if (target === "public-dashboard-content") {
                topNavbar.style.display = 'block';
                sidebar.style.left = "-250px";
                mainContent.style.marginLeft = "0";
                openBtn.style.display = "none";
            } else if (target === "home-content") {
                window.location.href = "/";
            }
        });
    });

    // Handle clicking on My Dashboard to hide top navbar and show sidebar
    myDashboardLink.addEventListener('click', function(e) {
        e.preventDefault();
        topNavbar.style.display = 'none';
        sidebar.style.left = "-250px";
        mainContent.style.marginLeft = "0"; 
        openBtn.style.display = "block";
        document.getElementById('home-content').style.display = 'block';
        contentSections.forEach(section => {
            section.style.display = section.id === 'home-content' ? 'block' : 'none';
        });
    });
});
