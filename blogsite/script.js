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
        title: "Information Theory in AI",
        date: "2024-03-15",
        keywords: ["AI", "Information Science", "Mathematics"],
        image: "resources/image.jpg",
        content: "Exploring the mathematical foundations of AI...",
        highlight: true
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
    if (highlightedPosts.length > 0) {
        return highlightedPosts.slice(0, 3); // Show up to 3 highlighted posts
    } else {
        return posts.slice(0, 3); // Show the latest 3 posts
    }
}

// Render Jumbotron Slides
function renderJumbotronSlides() {
    const slideshowPosts = getSlideshowPosts();
    const jumbotronSlides = document.querySelector('.jumbotron-slides');
    jumbotronSlides.innerHTML = slideshowPosts.map(post => `
        <div class="jumbotron-slide" style="background-image: url('${post.image}')">
            <div class="jumbotron-content">
                <h2>${post.title}</h2>
                <p>${post.content.substring(0, 150)}...</p>
                <div class="post-keywords">
                    ${post.keywords.map(kw => `<span class="keyword">${kw}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Slide Navigation
let slideIndex = 0;

function moveSlide(n) {
    const slides = document.querySelectorAll('.jumbotron-slide');
    slideIndex += n;

    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }

    const offset = -slideIndex * 100;
    document.querySelector('.jumbotron-slides').style.transform = `translateX(${offset}%)`;
}

// Auto Slide (Optional)
function autoSlide() {
    moveSlide(1);
}

// Initialize Slideshow
renderJumbotronSlides();

// Optional: Auto-slide every 5 seconds
setInterval(autoSlide, 15000);

// Render Posts
function renderPosts(filteredPosts) {
    const container = document.getElementById('postContainer');
    container.innerHTML = filteredPosts.map(post => `
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
    `).join('');
}

// Render Archives
function renderArchives() {
    const archivesList = document.getElementById('archivesList');
    archivesList.innerHTML = posts.map(post => `
        <li>${post.title} [${new Date(post.date).toLocaleDateString()}]</li>
    `).join('');
}

// Filter Posts by Tag
document.querySelectorAll('.blog-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const tag = e.target.dataset.tag;
        const filtered = tag === 'all' ? posts : posts.filter(post => post.tag === tag);
        renderPosts(filtered);
    });
});

// Initial render
renderPosts(posts);
renderArchives();