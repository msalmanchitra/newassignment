// Dropdown functionality for desktop/mobile clicks
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const toggleBtn = dropdown.querySelector('.dropdown-toggle');
    
    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Close other open dropdowns
        dropdowns.forEach(item => {
            if (item !== dropdown) {
                item.classList.remove('active');
            }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('active');
    });
});

// Close dropdowns when clicking outside
window.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Mobile menu toggle functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('mobile-active');
});

// Make nav links interactive on click
const navLinkItems = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
navLinkItems.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert(`Clicked: ${link.textContent.trim()}`);
        if (navLinks?.classList.contains('mobile-active')) {
            navLinks.classList.remove('mobile-active');
        }
    });
});

// Button handlers for login/signup navigation
const loginButton = document.getElementById('loginBtn');
const signupButton = document.getElementById('signupBtn');

loginButton?.addEventListener('click', () => {
    window.location.href = 'login.html';
});

signupButton?.addEventListener('click', () => {
    window.location.href = 'signup.html';
});

const searchInput = document.getElementById('searchInput');
searchInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        alert(`Searching for: ${searchInput.value}`);
    }
});
// herosection
// Dropdown menu functionality
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const toggleBtn = dropdown.querySelector('.dropdown-toggle');
    
    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dropdowns.forEach(item => {
            if (item !== dropdown) {
                item.classList.remove('active');
            }
        });
        dropdown.classList.toggle('active');
    });
});

window.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');
});

// Tabs switching functionality
const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const tabName = button.getAttribute('data-tab');
        if(tabName === 'about') {
            alert('Switched to About Tab');
        } else if(tabName === 'comments') {
            alert('Switched to Comments (26) Tab');
        }
    });
});

// Figma button & search actions
document.getElementById('openFigmaBtn').addEventListener('click', () => {
    alert('Opening template in Figma editor...');
});

document.getElementById('loginBtn').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Log in popup opened.');
});

document.getElementById('signupBtn').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Sign up popup opened.');
});

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        alert(`Searching for: ${searchInput.value}`);
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