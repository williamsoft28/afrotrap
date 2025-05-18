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