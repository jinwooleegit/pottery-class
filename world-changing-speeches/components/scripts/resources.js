document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const searchInput = document.querySelector('.search-input');
    const filterTags = document.querySelectorAll('.filter-tag');
    const resourceItems = document.querySelectorAll('.resource-item');

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        resourceItems.forEach(item => {
            const title = item.querySelector('.resource-item__title').textContent.toLowerCase();
            const description = item.querySelector('.resource-item__description').textContent.toLowerCase();
            const meta = item.querySelector('.resource-item__meta').textContent.toLowerCase();
            
            const matches = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          meta.includes(searchTerm);
            
            item.style.display = matches ? 'block' : 'none';
        });
    });

    // Filter functionality
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Remove active class from all tags
            filterTags.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tag
            tag.classList.add('active');
            
            const filter = tag.textContent.toLowerCase();
            
            // Show all items if "전체" is selected
            if (filter === '전체') {
                resourceItems.forEach(item => {
                    item.style.display = 'block';
                });
                return;
            }
            
            // Filter items based on category
            resourceItems.forEach(item => {
                const category = item.closest('.resource-category').querySelector('.resource-category__title').textContent.toLowerCase();
                item.style.display = category.includes(filter) ? 'block' : 'none';
            });
        });
    });
}); 