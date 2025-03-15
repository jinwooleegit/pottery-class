document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    // Tab functionality
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected tab content
            const target = tab.getAttribute('data-tab-target');
            const content = document.querySelector(`[data-tab-content="${target}"]`);
            content.classList.add('active');
        });
    });

    // Print functionality
    const printButton = document.querySelector('.print-button');
    if (printButton) {
        printButton.addEventListener('click', () => {
            window.print();
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Image modal functionality
    const mediaItems = document.querySelectorAll('.media-item img');
    mediaItems.forEach(img => {
        img.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <p>${img.nextElementSibling?.textContent || ''}</p>
                </div>
            `;
            document.body.appendChild(modal);
            
            modal.addEventListener('click', () => {
                modal.remove();
            });
        });
    });
}); 