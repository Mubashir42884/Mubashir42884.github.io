// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('change', toggleTheme);

function toggleTheme() {
    document.body.dataset.theme = 
        document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', document.body.dataset.theme);
}

// Set saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.dataset.theme = savedTheme;
themeToggle.checked = savedTheme === 'dark';

// Sample Posts Data
const posts = [
    {
        title: "Logits and BCE with Logits Loss – Explained",
        date: "2025-02-17",
        keywords: ["Machine Learning", "Deep Learning", "PyTorch", "Neural Networks", "Linear Regression", "Learning", "Academic"],
        image: "resources/bce-with-logits-loss.jpg",
        content: "Binary classification is a fundamental task in machine learning, often using the Binary Cross-Entropy,...",
        highlight: true,
        location: "17_Feb_2025_logits-bce-loss.html"
    },
    {
        title: "Data Visualization Techniques",
        date: "2024-03-18",
        keywords: ["Data Science", "Visualization", "Tools"],
        image: "resources/image.jpg",
        content: "Learn about the latest data visualization tools...",
        highlight: false
    },
    {
        title: "Machine Learning Basics",
        date: "2024-03-20",
        keywords: ["AI", "Machine Learning", "Tutorial"],
        image: "resources/image.jpg",
        content: "A beginner's guide to machine learning...",
        highlight: true
    },
    // Add more posts as needed
];

// Get highlighted posts or latest 3 posts
function getSlideshowPosts() {
    const highlightedPosts = posts.filter(post => post.highlight);
    return highlightedPosts.length > 0 ? highlightedPosts.slice(0, 3) : posts.slice(0, 3);
}

// Render Jumbotron Slides
function renderJumbotronSlides() {
    const slideshowPosts = getSlideshowPosts();
    const jumbotronSlides = document.querySelector('.jumbotron-slides');

    if (jumbotronSlides) {
        jumbotronSlides.innerHTML = slideshowPosts.map(post => `
            <div class="jumbotron-slide" style="background-image: url('${post.image}')">
                <div class="jumbotron-content">
                    <a href="${post.location || '#'}" class="post-link"><h2>${post.title}</h2></a>
                    <a href="${post.location || '#'}" class="post-link"></a>
                    <p>${post.content.substring(0, 150)}...</p>
                    <div class="post-keywords">
                        ${post.keywords.map(kw => `<span class="keyword">${kw}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Slide Navigation
let slideIndex = 0;

function moveSlide(n) {
    const slides = document.querySelectorAll('.jumbotron-slide');
    const totalSlides = slides.length;
    slideIndex = (slideIndex + n + totalSlides) % totalSlides; // Ensures cyclic navigation

    // Apply transform to the slides wrapper
    document.querySelector('.jumbotron-slides').style.transform = `translateX(-${slideIndex * 100}%)`;
}

// Auto Slide (Optional)
function autoSlide() {
    moveSlide(1);
}

// Initialize Slideshow
renderJumbotronSlides();

// Ensure slides move with smooth transitions
setTimeout(() => {
    document.querySelector('.jumbotron-slides').style.transition = "transform 0.5s ease-in-out";
}, 100);

// Optional: Auto-slide every 15 seconds
setInterval(autoSlide, 15000);


// Render Posts
function renderPosts(filteredPosts) {
    const container = document.getElementById('postContainer');
    if (container) {
        container.innerHTML = filteredPosts.map(post => `
            <a href="${post.location || '#'}" class="post-link">
                <article class="post-card">
                    <img src="${post.image}" alt="${post.title}" class="post-image">
                    <div class="post-content">
                        <h3 class="post-title">${post.title}</h3>
                        <div class="post-date">${new Date(post.date).toDateString()}</div>
                        <div class="post-keywords">
                            ${post.keywords.map(kw => `<span class="keyword">${kw}</span>`).join('')}
                        </div>
                    </div>
                </article>
            </a>
        `).join('');
    }
}

// Render Archives
function renderArchives() {
    const archivesList = document.getElementById('archivesList');
    if (archivesList) {
        archivesList.innerHTML = posts.map(post => `
            <li>${post.title} [${new Date(post.date).toLocaleDateString()}]</li>
        `).join('');
    }
}

// Filter Posts by Keyword (used for both search and tag clicks)
function filterPostsByKeyword(keyword) {
    const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(keyword) ||
        post.keywords.some(kw => kw.toLowerCase().includes(keyword))
    );
    renderPosts(filtered);
}

// Add event listeners to tags
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        const tagName = tag.textContent.trim().toLowerCase(); // Get the tag name
        filterPostsByKeyword(tagName); // Filter posts by the tag name
    });
});

// Search Bar Functionality
const searchBar = document.querySelector('.search-bar');
if (searchBar) {
    searchBar.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        filterPostsByKeyword(term);
    });
}

// Initial render
renderPosts(posts);
renderArchives();