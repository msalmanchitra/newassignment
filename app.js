// ==========================================
// NAVBAR & WEBSITE JAVASCRIPT
// ==========================================


// ==========================================
// DROPDOWN FUNCTIONALITY
// ==========================================

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {

    const toggleBtn =
        dropdown.querySelector(".dropdown-toggle");

    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", (e) => {

        e.preventDefault();
        e.stopPropagation();

        // Close all other dropdowns
        dropdowns.forEach((item) => {

            if (item !== dropdown) {
                item.classList.remove("active");
            }

        });

        // Toggle current dropdown
        dropdown.classList.toggle("active");

    });

});


// ==========================================
// CLOSE DROPDOWN WHEN CLICKING OUTSIDE
// ==========================================

window.addEventListener("click", (e) => {

    if (!e.target.closest(".dropdown")) {

        dropdowns.forEach((dropdown) => {

            dropdown.classList.remove("active");

        });

    }

});


// ==========================================
// MOBILE MENU
// ==========================================

const mobileMenuToggle =
    document.getElementById("mobileMenuToggle");

const navLinks =
    document.getElementById("navLinks");


if (mobileMenuToggle && navLinks) {

    mobileMenuToggle.addEventListener("click", (e) => {

        e.stopPropagation();

        // Open / close mobile menu
        navLinks.classList.toggle("mobile-active");

        // Hamburger animation
        mobileMenuToggle.classList.toggle("active");

    });

}


// ==========================================
// MOBILE NAV LINKS
// ==========================================

const navLinkItems =
    document.querySelectorAll(
        ".nav-link:not(.dropdown-toggle)"
    );


navLinkItems.forEach((link) => {

    link.addEventListener("click", (e) => {

        e.preventDefault();

        // Close mobile menu
        if (
            navLinks &&
            navLinks.classList.contains("mobile-active")
        ) {

            navLinks.classList.remove(
                "mobile-active"
            );

            mobileMenuToggle?.classList.remove(
                "active"
            );

        }

    });

});


// ==========================================
// CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
// ==========================================

document.addEventListener("click", (e) => {

    if (
        navLinks &&
        mobileMenuToggle &&
        !navLinks.contains(e.target) &&
        !mobileMenuToggle.contains(e.target)
    ) {

        navLinks.classList.remove(
            "mobile-active"
        );

        mobileMenuToggle.classList.remove(
            "active"
        );

    }

});


// ==========================================
// LOGIN BUTTON
// ==========================================

const loginButton =
    document.getElementById("loginBtn");


if (loginButton) {

    loginButton.addEventListener("click", (e) => {

        // Agar actual login.html par jana hai
        // to preventDefault mat karo.

        window.location.href =
            "login.html";

    });

}


// ==========================================
// SIGNUP BUTTON
// ==========================================

const signupButton =
    document.getElementById("signupBtn");


if (signupButton) {

    signupButton.addEventListener("click", (e) => {

        // Agar actual signup.html par jana hai
        // to preventDefault mat karo.

        window.location.href =
            "signup.html";

    });

}


// ==========================================
// SEARCH
// ==========================================

const searchInput =
    document.getElementById("searchInput");


if (searchInput) {

    searchInput.addEventListener(
        "keypress",
        (e) => {

            if (e.key === "Enter") {

                const searchValue =
                    searchInput.value.trim();

                if (searchValue !== "") {

                    alert(
                        `Searching for: ${searchValue}`
                    );

                }

            }

        }
    );

}


// ==========================================
// TABS
// ==========================================

const tabButtons =
    document.querySelectorAll(".tab-btn");


tabButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove active from all tabs
        tabButtons.forEach((btn) => {

            btn.classList.remove("active");

        });

        // Add active to clicked tab
        button.classList.add("active");


        const tabName =
            button.getAttribute("data-tab");


        if (tabName === "about") {

            alert(
                "Switched to About Tab"
            );

        }


        if (tabName === "comments") {

            alert(
                "Switched to Comments (26) Tab"
            );

        }

    });

});


// ==========================================
// OPEN IN FIGMA BUTTON
// ==========================================

const openFigmaBtn =
    document.getElementById("openFigmaBtn");


if (openFigmaBtn) {

    openFigmaBtn.addEventListener(
        "click",
        () => {

            alert(
                "Opening template in Figma editor..."
            );

        }
    );

}


// ==========================================
// WINDOW RESIZE
// ==========================================

window.addEventListener("resize", () => {

    // Desktop par mobile menu close
    if (window.innerWidth > 900) {

        navLinks?.classList.remove(
            "mobile-active"
        );

        mobileMenuToggle?.classList.remove(
            "active"
        );


        // Dropdowns bhi reset
        dropdowns.forEach((dropdown) => {

            dropdown.classList.remove(
                "active"
            );

        });

    }

});
// section 01
// Interactive functionality for tags and links

// Tag & Pill click handler
const allTags = document.querySelectorAll('.tag-link, .tag-pill-primary');
allTags.forEach(tag => {
    tag.addEventListener('click', (e) => {
        e.preventDefault();
        alert(`Filtered by tag: ${tag.innerText}`);
    });
});

// UIUX-Expert Link handler
document.getElementById('uiuxExpertLink').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Redirecting to UIUX-Expert profile page...');
});

// Social links handler (Dribbble, Behance, etc.)
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = link.getAttribute('data-name');
        alert(`Opening author's ${platform} page...`);
    });
});

// Share buttons functionality
document.getElementById('copyLinkBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
});

document.getElementById('twitterShareBtn').addEventListener('click', () => {
    alert('Opening Twitter/X share dialog...');
});

document.getElementById('fbShareBtn').addEventListener('click', () => {
    alert('Opening Facebook share dialog...');
});
// section 03
// Toolbar Page Dropdown Toggle
const dropdownToggle = document.getElementById('pageDropdownToggle');
const toolbarMenu = document.getElementById('toolbarMenu');

dropdownToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownToggle.classList.toggle('active');
});

// Close dropdown when clicking outside
window.addEventListener('click', () => {
    dropdownToggle.classList.remove('active');
});

// Page option selection handler
const pageLinks = toolbarMenu.querySelectorAll('a');
pageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        pageLinks.forEach(l => l.classList.remove('active-page'));
        link.classList.add('active-page');
        
        // Update label text dynamically
        const spanText = dropdownToggle.querySelector('span');
        spanText.innerHTML = `Page: <strong>${link.innerText}</strong>`;
        alert(`Switched canvas page to: ${link.innerText}`);
    });
});

// Zoom Controls Functionality
let currentZoom = 44; // Matching screenshot default value 44%
const zoomValueText = document.getElementById('zoomValueText');
const canvasCard = document.getElementById('canvasCard');

document.getElementById('zoomInBtn').addEventListener('click', () => {
    if (currentZoom < 150) {
        currentZoom += 10;
        updateZoom();
    }
});

document.getElementById('zoomOutBtn').addEventListener('click', () => {
    if (currentZoom > 20) {
        currentZoom -= 10;
        updateZoom();
    }
});

function updateZoom() {
    zoomValueText.innerText = `${currentZoom}%`;
    const scaleFactor = currentZoom / 44; // relative to 44% base
    canvasCard.style.transform = `scale(${scaleFactor})`;
}

// Fullscreen button functionality
document.getElementById('fullscreenBtn').addEventListener('click', () => {
    const viewport = document.getElementById('canvasViewport');
    if (!document.fullscreenElement) {
        viewport.requestFullscreen().catch(err => {
            alert(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
});
// comment section
// ==========================================
// COMMENTS SECTION JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const comments = document.querySelectorAll(".comment");
    const helpButton = document.getElementById("helpButton");


    // ==========================================
    // COMMENT HOVER EFFECT
    // ==========================================

    comments.forEach((comment) => {

        comment.addEventListener("mouseenter", () => {
            comment.style.cursor = "default";
        });

    });


    // ==========================================
    // HELP BUTTON
    // ==========================================

    helpButton.addEventListener("click", () => {

        alert("Need help? This is the comments section.");

    });


    // ==========================================
    // SIMPLE FADE-IN ANIMATION
    // ==========================================

    comments.forEach((comment, index) => {

        comment.style.opacity = "0";
        comment.style.transform = "translateY(5px)";

        setTimeout(() => {

            comment.style.transition =
                "opacity 0.35s ease, transform 0.35s ease";

            comment.style.opacity = "1";
            comment.style.transform = "translateY(0)";

        }, index * 80);

    });

});

//footer
/* =========================================
   FOOTER JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const footerLinks =
        document.querySelectorAll(".footer-column a");

    const helpButton =
        document.getElementById("helpButton");


    /* =====================================
       LINK HOVER
    ===================================== */

    footerLinks.forEach((link) => {

        link.addEventListener("mouseenter", () => {

            link.style.cursor = "pointer";

        });

    });


    /* =====================================
       HELP BUTTON
    ===================================== */

    helpButton.addEventListener("click", () => {

        alert(
            "How can we help you?"
        );

    });


    /* =====================================
       FOOTER FADE-IN
    ===================================== */

    const footer =
        document.querySelector(".footer");


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        footer.classList.add(
                            "footer-visible"
                        );

                        observer.unobserve(
                            footer
                        );

                    }

                });

            },
            {
                threshold: 0.1
            }
        );


    observer.observe(footer);

});