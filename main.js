document.addEventListener('DOMContentLoaded', () => {
    // This is placeholder data. In a real application, you would fetch this from a server.
    const portfolioData = [
        { id: 1, title: 'E-commerce Website', category: 'javascript', image: 'https://via.placeholder.com/300x200.png?text=E-commerce' },
        { id: 2, title: 'Responsive Blog Design', category: 'html', image: 'https://via.placeholder.com/300x200.png?text=Blog+Design' },
        { id: 3, title: 'Weather App', category: 'javascript', image: 'https://via.placeholder.com/300x200.png?text=Weather+App' },
        { id: 4, title: 'CSS Grid Portfolio', category: 'css', image: 'https://via.placeholder.com/300x200.png?text=CSS+Portfolio' },
        { id: 5, title: 'User Experience Study', category: 'ux', image: 'https://via.placeholder.com/300x200.png?text=UX+Study' },
        { id: 6, title: 'Interactive Form', category: 'javascript', image: 'https://via.placeholder.com/300x200.png?text=Interactive+Form' }
    ];

    const portfolioGrid = document.getElementById('portfolio-grid');
    const filterButtonsContainer = document.getElementById('filter-buttons');

    // Function to render portfolio items in the grid
    const displayPortfolioItems = (items) => {
        if (!portfolioGrid) return;
        portfolioGrid.innerHTML = ''; // Clear the grid
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'portfolio-card glass-effect animated-card';
            card.setAttribute('data-category', item.category);

            card.innerHTML = `
                <div class="card-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${item.title}</h3>
                    <div class="card-tags">
                        <span class="tag">${item.category}</span>
                    </div>
                </div>
            `;
            portfolioGrid.appendChild(card);
        });
    };

    // Set up filter functionality
    if (filterButtonsContainer) {
        filterButtonsContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                // Update active button
                document.querySelector('.filters .btn.active').classList.remove('active');
                e.target.classList.add('active');

                const filter = e.target.getAttribute('data-filter');
                const cards = document.querySelectorAll('.portfolio-card');
                
                cards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
            }
        });
    }

    // Initial display of portfolio items
    displayPortfolioItems(portfolioData);

    const sections = document.querySelectorAll('.hidden-section');
    const revealOnScroll = () => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                section.classList.add('revealed-section');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Reveal any in view on load
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.active-page').forEach(page => page.classList.remove('active-page'));
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.classList.add('active-page');
        window.scrollTo(0, 0);
    });
});

