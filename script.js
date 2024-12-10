const scrollableCards = document.querySelector('.scrollable-cards');
const cardHeight = document.querySelector('.card').offsetHeight + 20;

let isDragging = false;
let startY, scrollTop;

// Utility to enable/disable dragging
const setDragging = (dragging) => {
  isDragging = dragging;
  scrollableCards.style.cursor = dragging ? 'grabbing' : 'grab';
  scrollableCards.style.transition = dragging ? 'none' : 'scroll 0.3s ease';
};

// Scroll to the closest card
const scrollToClosestCard = () => {
  const index = Math.round(scrollableCards.scrollTop / cardHeight);
  scrollableCards.scrollTo({ top: index * cardHeight, behavior: 'smooth' });
};

// Start dragging
const startDrag = (e) => {
  setDragging(true);
  startY = e.pageY - scrollableCards.offsetTop;
  scrollTop = scrollableCards.scrollTop;
};

// Handle mouse/touch move
const moveDrag = (e) => {
  if (!isDragging) return;
  const y = (e.touches ? e.touches[0].pageY : e.pageY) - scrollableCards.offsetTop;
  scrollableCards.scrollTop = scrollTop - (y - startY);
};

// Stop dragging
const stopDrag = () => {
  if (!isDragging) return;
  setDragging(false);
  scrollToClosestCard();
};

// Mouse events
scrollableCards.addEventListener('mousedown', startDrag);
scrollableCards.addEventListener('mousemove', moveDrag);
scrollableCards.addEventListener('mouseup', stopDrag);
scrollableCards.addEventListener('mouseleave', stopDrag);

// Touch events for mobile compatibility
scrollableCards.addEventListener('touchstart', (e) => {
  e.preventDefault();
  startDrag(e);
});
scrollableCards.addEventListener('touchmove', (e) => {
  e.preventDefault();
  moveDrag(e);
});
scrollableCards.addEventListener('touchend', stopDrag);

// Prevent mouse wheel scroll
scrollableCards.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
