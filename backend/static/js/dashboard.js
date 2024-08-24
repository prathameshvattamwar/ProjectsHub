document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");
    const personalDashboard = document.getElementById("personal-dashboard");
    const publicDashboard = document.getElementById("public-dashboard");
    const openBtn = document.getElementById("openBtn");
    const closeBtn = document.getElementById("closeBtn");
    const topNavbar = document.getElementById("top-navbar");
    const myDashboardLink = document.getElementById("my-dashboard-link");
    const publicDashboardLink = document.getElementById("public-dashboard-link");

    // Initially, show the public dashboard and hide the personal dashboard
    personalDashboard.style.display = "none";
    publicDashboard.style.display = "block";
    topNavbar.style.display = "block";

    // Show personal dashboard and hide public dashboard
    myDashboardLink.addEventListener("click", function() {
        personalDashboard.style.display = "block";
        publicDashboard.style.display = "none";
        topNavbar.style.display = "none";
        sidebar.style.left = "-250px";
        mainContent.style.marginLeft = "0";
        openBtn.style.display = "block";
    });

    // Switch to public dashboard and hide personal dashboard
    publicDashboardLink.addEventListener("click", function() {
        personalDashboard.style.display = "none";
        publicDashboard.style.display = "block";
        topNavbar.style.display = "block";
        sidebar.style.left = "-250px";
        mainContent.style.marginLeft = "0";
    });

    openBtn.addEventListener("click", function() {
        sidebar.style.left = "0";
        mainContent.style.marginLeft = "250px";
        openBtn.style.display = "none";
    });

    closeBtn.addEventListener("click", function() {
        sidebar.style.left = "-250px";
        mainContent.style.marginLeft = "0";
        openBtn.style.display = "block";
    });
});
