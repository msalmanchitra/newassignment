/* =========================================
   BLOG HERO JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const homeLink = document.querySelector(".home-link");
    const currentPage = document.querySelector(".current-page");

    /*
     * Home link protection
     * index.html کو Home page سمجھا گیا ہے.
     */
    if (homeLink) {

        homeLink.addEventListener("click", (event) => {

            event.preventDefault();

            window.location.href = "index.html";
        });
    }


    /*
     * Current page indicator
     */
    if (currentPage) {

        currentPage.setAttribute(
            "aria-current",
            "page"
        );
    }


    /*
     * Small entrance animation
     */
    const heroContent = document.querySelector(".hero-content");

    if (heroContent) {

        heroContent.classList.add("hero-loaded");
    }

});


// hero

(function () {
            'use strict';

            // ── DOM references ──────────────────────────────
            const searchInput = document.getElementById('searchInput');
            const searchBtn = document.getElementById('searchBtn');
            const categoryList = document.getElementById('categoryList');
            const recentPostsContainer = document.getElementById('recentPosts');
            const postTitle = document.querySelector('.post-title');
            const postExcerpt = document.querySelector('.post-excerpt');
            const metaRow = document.querySelector('.meta-row');

            // ── Post data (simulated backend) ──────────────
            const posts = {
                'millennial-design': {
                    title: 'Going all-in with millennial design',
                    date: '03 Aug 2022',
                    category: 'wood',
                    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc.',
                },
                decorating: {
                    title: 'Exploring new ways of decorating',
                    date: '03 Aug 2022',
                    category: 'interior',
                    excerpt: 'Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Nec sagittis aliquam malesuada bibendum arcu vitae elementum.',
                },
            };

            const currentPost = 'millennial-design';

            // ── Search functionality ───────────────────────
            function performSearch() {
                const query = searchInput.value.trim().toLowerCase();
                if (!query) {
                    // Reset — show all
                    filterRecentPosts('');
                    highlightSearchTerm('');
                    return;
                }

                filterRecentPosts(query);
                highlightSearchTerm(query);

                // Scroll to the first visible recent post if sidebar is visible
                const firstVisible = recentPostsContainer.querySelector(
                    '.recent-post-item:not([style*="display: none"])'
                );
                if (firstVisible && window.innerWidth <= 768) {
                    firstVisible.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }

            function filterRecentPosts(query) {
                const items = recentPostsContainer.querySelectorAll('.recent-post-item');
                items.forEach(function (item) {
                    const titleEl = item.querySelector('.recent-post-title');
                    const title = titleEl.textContent.toLowerCase();
                    const postKey = item.getAttribute('data-post');
                    const postData = posts[postKey];

                    let matches =
                        title.includes(query) ||
                        (postData && postData.category.toLowerCase().includes(query)) ||
                        (postData && postData.excerpt.toLowerCase().includes(query));

                    if (query === '') matches = true;

                    item.style.display = matches ? '' : 'none';
                });
            }

            function highlightSearchTerm(query) {
                // Remove previous highlights
                removeHighlights();

                if (!query) return;

                const postTitleEl = document.querySelector('.post-title');
                const postExcerptEl = document.querySelector('.post-excerpt');
                const recentPostTitles = recentPostsContainer.querySelectorAll('.recent-post-title');

                highlightInElement(postTitleEl, query);
                highlightInElement(postExcerptEl, query);
                recentPostTitles.forEach(function (el) {
                    highlightInElement(el, query);
                });
            }

            function highlightInElement(el, query) {
                if (!el || !query) return;
                const text = el.textContent;
                const regex = new RegExp('(' + escapeRegExp(query) + ')', 'gi');
                if (regex.test(text)) {
                    el.innerHTML = text.replace(
                        regex,
                        '<mark class="search-highlight">$1</mark>'
                    );
                }
            }

            function removeHighlights() {
                const highlights = document.querySelectorAll('.search-highlight');
                highlights.forEach(function (mark) {
                    const parent = mark.parentNode;
                    parent.replaceChild(document.createTextNode(mark.textContent), mark);
                    parent.normalize();
                });
            }

            function escapeRegExp(string) {
                return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            }

            // ── Category filter ────────────────────────────
            function filterByCategory(category) {
                const items = recentPostsContainer.querySelectorAll('.recent-post-item');
                items.forEach(function (item) {
                    const postKey = item.getAttribute('data-post');
                    const postData = posts[postKey];
                    if (!category || (postData && postData.category === category)) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Update active class
                const allCatItems = categoryList.querySelectorAll('li');
                allCatItems.forEach(function (li) {
                    li.classList.remove('active');
                });
                const activeLi = categoryList.querySelector('[data-category="' + category + '"]');
                if (activeLi) {
                    activeLi.classList.add('active');
                }
            }

            // ── Recent post click → swap main content ──────
            function swapMainContent(postKey) {
                const postData = posts[postKey];
                if (!postData) return;

                // Animate out
                postTitle.style.opacity = '0';
                postTitle.style.transform = 'translateY(10px)';
                postExcerpt.style.opacity = '0';
                postExcerpt.style.transform = 'translateY(10px)';

                setTimeout(function () {
                    postTitle.textContent = postData.title;
                    postExcerpt.textContent = postData.excerpt;

                    // Update meta date
                    const dateSpan = metaRow.querySelectorAll('.meta-item')[1];
                    if (dateSpan) {
                        // Keep icon, update text
                        const textNodes = dateSpan.childNodes;
                        for (let i = textNodes.length - 1; i >= 0; i--) {
                            if (textNodes[i].nodeType === Node.TEXT_NODE) {
                                textNodes[i].textContent = postData.date;
                                break;
                            }
                        }
                    }

                    // Update category in meta
                    const categorySpan = metaRow.querySelectorAll('.meta-item')[2];
                    if (categorySpan) {
                        const catLink = categorySpan.querySelector('.meta-link');
                        if (catLink) {
                            catLink.textContent =
                                postData.category.charAt(0).toUpperCase() + postData.category.slice(1);
                        }
                    }

                    // Animate in
                    postTitle.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    postExcerpt.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    postTitle.style.opacity = '1';
                    postTitle.style.transform = 'translateY(0)';
                    postExcerpt.style.opacity = '1';
                    postExcerpt.style.transform = 'translateY(0)';

                    // Highlight active recent post
                    const allRecent = recentPostsContainer.querySelectorAll('.recent-post-item');
                    allRecent.forEach(function (item) {
                        item.style.background = '';
                    });
                    const activeRecent = recentPostsContainer.querySelector(
                        '[data-post="' + postKey + '"]'
                    );
                    if (activeRecent) {
                        activeRecent.style.background = 'rgba(184,142,92,0.08)';
                        activeRecent.style.borderRadius = '4px';
                        activeRecent.style.padding = '10px 8px';
                    }
                }, 200);
            }

            // ── Event Listeners ────────────────────────────
            searchBtn.addEventListener('click', performSearch);
            searchInput.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    performSearch();
                }
            });
            // Live search as user types (debounced)
            let searchTimeout;
            searchInput.addEventListener('input', function () {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(performSearch, 300);
            });

            // Category clicks
            categoryList.addEventListener('click', function (e) {
                const li = e.target.closest('li');
                if (!li) return;
                const category = li.getAttribute('data-category');
                filterByCategory(category);
            });

            // Recent post clicks
            recentPostsContainer.addEventListener('click', function (e) {
                const item = e.target.closest('.recent-post-item');
                if (!item) return;
                const postKey = item.getAttribute('data-post');
                if (postKey) {
                    swapMainContent(postKey);

                    // On mobile, scroll to main content
                    if (window.innerWidth <= 768) {
                        document.querySelector('.main-content').scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                    }
                }
            });

            // Read more click
            const readMoreLink = document.querySelector('.read-more');
            if (readMoreLink) {
                readMoreLink.addEventListener('click', function (e) {
                    e.preventDefault();
                    // Simulate navigation feedback
                    readMoreLink.textContent = 'Loading...';
                    readMoreLink.style.pointerEvents = 'none';
                    setTimeout(function () {
                        readMoreLink.textContent = 'Read more';
                        readMoreLink.style.pointerEvents = '';
                    }, 800);
                });
            }

            // ── Initial highlight for active recent post ───
            const initialActive = recentPostsContainer.querySelector(
                '[data-post="' + currentPost + '"]'
            );
            if (initialActive) {
                initialActive.style.background = 'rgba(184,142,92,0.08)';
                initialActive.style.borderRadius = '4px';
                initialActive.style.padding = '10px 8px';
            }

            // ── Keyboard accessibility ────────────────────
            document.addEventListener('keydown', function (e) {
                // Escape to clear search
                if (e.key === 'Escape' && document.activeElement === searchInput) {
                    searchInput.value = '';
                    performSearch();
                    searchInput.blur();
                }
            });

            // ── Resize handler — update sticky sidebar offset ──
            let resizeTimeout;
            window.addEventListener('resize', function () {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(function () {
                    const sidebar = document.querySelector('.sidebar');
                    if (window.innerWidth <= 768) {
                        sidebar.style.position = 'static';
                    } else {
                        sidebar.style.position = 'sticky';
                        sidebar.style.top = '24px';
                    }
                }, 150);
            });

            console.log(
                '%c🪵 Blog ready — search, filter categories, click recent posts to swap content.',
                'color: #b88e5c; font-weight: bold;'
            );
        })();

        // Third section


        document.addEventListener("DOMContentLoaded", () => {

    const pageButtons = document.querySelectorAll(".page-btn[data-page]");
    const nextButton = document.getElementById("nextBtn");

    let currentPage = 1;
    const totalPages = 3;


    // ================================
    // CHANGE ACTIVE PAGE
    // ================================

    function setActivePage(page) {

        currentPage = page;

        pageButtons.forEach(button => {

            const buttonPage = Number(button.dataset.page);

            if (buttonPage === currentPage) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }

        });

        updateNextButton();
    }


    // ================================
    // PAGE BUTTON CLICK
    // ================================

    pageButtons.forEach(button => {

        button.addEventListener("click", () => {

            const page = Number(button.dataset.page);

            setActivePage(page);

        });

    });


    // ================================
    // NEXT BUTTON
    // ================================

    nextButton.addEventListener("click", () => {

        if (currentPage < totalPages) {

            setActivePage(currentPage + 1);

        }

    });


    // ================================
    // NEXT BUTTON STATE
    // ================================

    function updateNextButton() {

        if (currentPage >= totalPages) {

            nextButton.disabled = true;

        } else {

            nextButton.disabled = false;

        }

    }


    // Initial state
    updateNextButton();

});