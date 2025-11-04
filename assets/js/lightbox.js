// Simple Lightbox for Gallery Images
document.addEventListener('DOMContentLoaded', function() {
  // Create lightbox modal HTML
  const lightboxHTML = `
    <div id="lightbox-modal" class="lightbox-overlay" style="display:none;">
      <div class="lightbox-container">
        <button class="lightbox-close" aria-label="Close">&times;</button>
        <button class="lightbox-prev" aria-label="Previous">&lsaquo;</button>
        <button class="lightbox-next" aria-label="Next">&rsaquo;</button>
        <img src="" alt="" class="lightbox-image">
        <div class="lightbox-counter"></div>
      </div>
    </div>
  `;

  // Add lightbox to body
  document.body.insertAdjacentHTML('beforeend', lightboxHTML);

  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = lightbox.querySelector('.lightbox-image');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const lightboxPrev = lightbox.querySelector('.lightbox-prev');
  const lightboxNext = lightbox.querySelector('.lightbox-next');
  const lightboxCounter = lightbox.querySelector('.lightbox-counter');

  let currentIndex = 0;
  let galleryImages = [];

  // Find all gallery images and make them clickable
  const galleryItems = document.querySelectorAll('.gallery-item img, .car-item img');

  galleryItems.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function(e) {
      e.preventDefault();
      openLightbox(img, index);
    });
  });

  function openLightbox(clickedImg, index) {
    // Get all images in the same gallery container
    const container = clickedImg.closest('.row');
    galleryImages = Array.from(container.querySelectorAll('.gallery-item img, .car-item img'));
    currentIndex = galleryImages.indexOf(clickedImg);

    showImage(currentIndex);
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function showImage(index) {
    if (galleryImages.length === 0) return;

    currentIndex = index;
    const img = galleryImages[currentIndex];

    // Get the full-size image source
    let fullSrc = img.dataset.fullsrc || img.src;

    lightboxImg.src = fullSrc;
    lightboxImg.alt = img.alt;

    // Update counter
    lightboxCounter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;

    // Show/hide navigation buttons
    lightboxPrev.style.display = galleryImages.length > 1 ? 'block' : 'none';
    lightboxNext.style.display = galleryImages.length > 1 ? 'block' : 'none';
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showImage(currentIndex);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentIndex);
  }

  // Event listeners
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', nextImage);
  lightboxPrev.addEventListener('click', prevImage);

  // Close on background click
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    }
  });
});
