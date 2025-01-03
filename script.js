// Create a new div for the custom cursor
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

// Setup the drawing canvas
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; // Set canvas width
canvas.height = window.innerHeight; // Set canvas height

let isDrawing = false;

// Start drawing when mouse is down
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    draw(e.pageX, e.pageY);
});

// Stop drawing when mouse is up
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.beginPath(); // Start a new path
});

// Draw on canvas
canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        draw(e.pageX, e.pageY);
    }
});

// Draw function
function draw(x, y) {
    ctx.lineWidth = 5; // Set line width
    ctx.lineCap = 'round'; // Round edges for smoother drawing
    ctx.strokeStyle = 'rgba(255, 182, 193, 0.8)'; // Pastel pink color

    ctx.lineTo(x, y); // Draw line to new position
    ctx.stroke(); // Render the stroke
    ctx.beginPath(); // Start a new path for the next segment
    ctx.moveTo(x, y); // Move to the new position
}

// Function to create a trail effect
function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.classList.add('trail');
    document.body.appendChild(trail);

    // Position the trail at the cursor position
    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;

    // Remove the trail after a short duration
    setTimeout(() => {
        trail.remove();
    }, 500); // Adjust duration as needed (in milliseconds)
}

// Update cursor position based on mouse movement
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;

    // Create a trail at the cursor position
    createTrail(x, y);
});

// Change cursor color based on hover effects for gallery items
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        cursor.style.backgroundColor = 'rgba(255, 193, 203, 0.8)'; // Light pastel pink on hover
    });

    item.addEventListener('mouseleave', () => {
        cursor.style.backgroundColor = 'rgba(255, 182, 193, 0.8)'; // Original pastel pink color
    });

    // Show modal on image click
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const imageDescription = document.getElementById('imageDescription');

        modal.style.display = "block"; // Show the modal
        modalImage.src = img.src; // Set modal image source
        imageDescription.innerHTML = img.alt; // Set image description
    });
});

// Close modal functionality
const closeModal = document.getElementById('closeModal');
closeModal.addEventListener('click', () => {
    const modal = document.getElementById('imageModal');
    modal.style.display = "none"; // Hide the modal
});

// Close modal when clicking outside of the image
const modal = document.getElementById('imageModal');
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none"; // Hide the modal
    }
});

// Optional: Fade-in effect for gallery items when scrolling into view
const options = {
    threshold: 0.1 // Trigger when 10% of the item is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-in'); // Add fade-in class
            observer.unobserve(entry.target); // Stop observing after it becomes visible
        }
    });
}, options);

// Observe each gallery item
galleryItems.forEach(item => {
    observer.observe(item);
});

// Clear canvas after a time interval
setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
}, 1000); // Adjust duration for clearing drawings (in milliseconds)
