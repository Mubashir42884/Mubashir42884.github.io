// Get the button and the second SVG
const reactionBtn = document.getElementById('reactionBtn');
const balloonHeart = document.querySelector('.bi-balloon-heart-fill');

// Add a click event listener to the button
reactionBtn.addEventListener('click', function () {
    // Toggle the 'hidden' class to show or hide the second SVG
    balloonHeart.classList.toggle('hidden');
});
