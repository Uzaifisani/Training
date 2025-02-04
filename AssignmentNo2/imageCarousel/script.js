// Array of image URLs (using placeholder images for demo)
const images = [
    'https://picsum.photos/800/400?random=1',
    'https://picsum.photos/800/400?random=2',
    'https://picsum.photos/800/400?random=3',
    'https://picsum.photos/800/400?random=4',
    'https://picsum.photos/800/400?random=5'
];

let currentImageIndex = 0;
const imageElement = document.getElementById('carouselImage');

// Set initial image
imageElement.src = images[currentImageIndex];

// Function to show next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    imageElement.src = images[currentImageIndex];
}

// Function to show previous image
function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    imageElement.src = images[currentImageIndex];
}
