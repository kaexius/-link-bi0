// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            body.removeAttribute('data-theme');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Add click analytics (optional)
    const linkItems = document.querySelectorAll('.link-item');
    linkItems.forEach(link => {
        link.addEventListener('click', function(e) {
            const linkTitle = this.querySelector('.link-title').textContent;
            console.log(`Link clicked: ${linkTitle}`);
            
            // You can add analytics tracking here
            // Example: gtag('event', 'click', { 'event_category': 'Link', 'event_label': linkTitle });
        });
    });
    
    // Add loading states
    const profileImg = document.getElementById('profileImg');
    profileImg.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    // Add smooth scrolling for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.link-item, .profile').forEach(el => {
        observer.observe(el);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 't' && e.ctrlKey) {
            e.preventDefault();
            themeToggle.click();
        }
    });
    
    // Add simple error handling for broken images
    profileImg.addEventListener('error', function() {
        this.src = 'https://via.placeholder.com/150/4A90E2/FFFFFF?text=PHOTO';
    });
});

// Utility function to copy link to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // You could show a toast notification here
        console.log('Link copied to clipboard');
    });
}

// Add right-click context menu for copying links
document.querySelectorAll('.link-item').forEach(link => {
    link.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        const url = this.getAttribute('href');
        copyToClipboard(url);
        
        // Optional: Show a temporary tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Link copied!';
        tooltip.style.cssText = `
            position: fixed;
            top: ${e.clientY}px;
            left: ${e.clientX}px;
            background: var(--accent-color);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.9rem;
            z-index: 1000;
            pointer-events: none;
        `;
        document.body.appendChild(tooltip);
        
        setTimeout(() => {
            document.body.removeChild(tooltip);
        }, 1500);
    });
});