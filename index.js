// Simple mobile menu toggle
        document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });
        
        // Filter functionality
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                // Here you would filter the artists based on the selected filter
            });
        });


        // Fonctionnalités avancées
document.addEventListener('DOMContentLoaded', function() {
    // Filtrage dynamique
    const searchInput = document.querySelector('.search-input');
    const countryFilter = document.querySelector('.country-filter');
    
    searchInput.addEventListener('input', filterArtists);
    countryFilter.addEventListener('change', filterArtists);
    
    function filterArtists() {
        const searchTerm = searchInput.value.toLowerCase();
        const country = countryFilter.value;
        
        document.querySelectorAll('.artist-card').forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const cardCountry = card.dataset.country;
            
            const nameMatch = name.includes(searchTerm);
            const countryMatch = country === 'all' || cardCountry === country;
            
            card.style.display = (nameMatch && countryMatch) ? 'block' : 'none';
        });
    }
    
    // Pagination (exemple pour 10 artistes par page)
    const itemsPerPage = 10;
    let currentPage = 1;
    
    function showPage(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        
        document.querySelectorAll('.artist-card').forEach((card, index) => {
            card.style.display = (index >= start && index < end) ? 'block' : 'none';
        });
    }
});