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

// Système de Vote
document.addEventListener('DOMContentLoaded', function() {
    // Données des artistes (à remplacer par vos données réelles)
    const artists = [
        { id: 1, name: "MC Afro", image: "artist1.jpg", votes: 42000 },
        { id: 2, name: "Trap Queen", image: "artist2.jpg", votes: 38000 },
        // ... Ajoutez tous vos artistes
    ];

    // Éléments DOM
    const votingGrid = document.querySelector('.voting-grid');
    const artistSearch = document.getElementById('artistSearch');
    const voteModal = document.getElementById('voteModal');
    const votedArtistName = document.getElementById('votedArtistName');
    const closeModal = document.querySelector('.close-modal');

    // Afficher les artistes
    function renderArtists(filteredArtists = artists) {
        votingGrid.innerHTML = '';
        
        // Trouver le maximum de votes pour la progression
        const maxVotes = Math.max(...filteredArtists.map(a => a.votes));
        
        filteredArtists.forEach(artist => {
            const votePercentage = (artist.votes / maxVotes) * 100;
            
            const card = document.createElement('div');
            card.className = 'vote-card';
            card.innerHTML = `
                <img src="${artist.image}" alt="${artist.name}" class="vote-card-image">
                <div class="vote-card-info">
                    <h3>${artist.name}</h3>
                    <div class="vote-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${votePercentage}%"></div>
                        </div>
                        <span>${formatVotes(artist.votes)} votes</span>
                    </div>
                    <button class="btn-vote" data-artist-id="${artist.id}">
                        <i class="fas fa-heart"></i> Voter
                    </button>
                </div>
            `;
            
            votingGrid.appendChild(card);
        });
        
        // Ajouter les écouteurs d'événements
        addVoteEventListeners();
    }

    // Formater les votes (ex: 42000 → "42K")
    function formatVotes(num) {
        return num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num;
    }

    // Recherche d'artistes
    artistSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filtered = artists.filter(artist => 
            artist.name.toLowerCase().includes(searchTerm)
        );
        renderArtists(filtered);
    });

    // Gestion des votes
    function addVoteEventListeners() {
        document.querySelectorAll('.btn-vote').forEach(button => {
            button.addEventListener('click', function() {
                const artistId = parseInt(this.dataset.artistId);
                const artist = artists.find(a => a.id === artistId);
                
                // Ici, vous devriez appeler votre système de vote existant
                // Ceci est une simulation
                simulateVote(artist);
            });
        });
    }

    // Simulation de vote (à remplacer par votre appel API)
    function simulateVote(artist) {
        // Mise à jour temporaire (en réel, attendez la réponse du serveur)
        artist.votes += 1;
        
        // Afficher la confirmation
        votedArtistName.textContent = artist.name;
        voteModal.style.display = 'flex';
        
        // Rafraîchir l'affichage après un délai
        setTimeout(() => {
            renderArtists();
        }, 2000);
    }

    // Fermer la modale
    closeModal.addEventListener('click', function() {
        voteModal.style.display = 'none';
    });

    // Fermer en cliquant à l'extérieur
    window.addEventListener('click', function(e) {
        if (e.target === voteModal) {
            voteModal.style.display = 'none';
        }
    });

    // Initialisation
    renderArtists();
});

// Intégration avec votre système existant
async function submitRealVote(artistId) {
    try {
        // Remplacez ceci par votre appel API réel
        const response = await fetch('/votre-endpoint-de-vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer VOTRE_TOKEN'
            },
            body: JSON.stringify({ artistId })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Mettre à jour l'interface
            updateVoteUI(artistId, data.newVoteCount);
            return true;
        }
        return false;
    } catch (error) {
        console.error("Erreur:", error);
        return false;
    }
}