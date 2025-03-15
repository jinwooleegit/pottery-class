// Utility functions
const utils = {
    // Add active class to current navigation item
    setActiveNavLink() {
        const currentPath = window.location.pathname;
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    },

    // Smooth scroll to element
    scrollTo(element, duration = 300) {
        const target = document.querySelector(element);
        if (!target) return;
        
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    },

    // Handle tab switching
    initTabs() {
        document.querySelectorAll('.tabs').forEach(tabGroup => {
            const tabs = tabGroup.querySelectorAll('.tab');
            const contents = document.querySelectorAll('[data-tab-content]');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const target = tab.dataset.tabTarget;

                    // Update active states
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');

                    // Show target content
                    contents.forEach(content => {
                        content.style.display = content.dataset.tabContent === target ? 'block' : 'none';
                    });
                });
            });
        });
    },

    // Progressive enhancement for quote sharing
    initQuoteSharing() {
        if (!navigator.share) return;

        document.querySelectorAll('.quote').forEach(quote => {
            const shareBtn = document.createElement('button');
            shareBtn.className = 'btn btn-secondary mt-2';
            shareBtn.textContent = '공유하기';
            
            shareBtn.addEventListener('click', () => {
                navigator.share({
                    title: document.title,
                    text: quote.textContent,
                    url: window.location.href
                }).catch(console.error);
            });

            quote.appendChild(shareBtn);
        });
    },

    // Add print button to speech pages
    initPrintButton() {
        if (document.querySelector('.speech-content')) {
            const printBtn = document.createElement('button');
            printBtn.className = 'btn btn-primary mt-3';
            printBtn.textContent = 'PDF로 저장';
            printBtn.addEventListener('click', () => window.print());
            
            document.querySelector('.speech-content').appendChild(printBtn);
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    utils.setActiveNavLink();
    utils.initTabs();
    utils.initQuoteSharing();
    utils.initPrintButton();
}); 