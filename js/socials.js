// Example script to enhance interactions
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.social-card');
    cards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'scale(1.15)';
        });
        card.addEventListener('mouseout', () => {
            card.style.transform = 'scale(1)';
        });
    });
});
