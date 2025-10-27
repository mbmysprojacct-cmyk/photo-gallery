// Name this external file gallery.js

function upDate(previewPic) {
  const imageDiv = document.getElementById('image');
  imageDiv.style.backgroundImage = "url('" + previewPic.src + "')";
  imageDiv.textContent = previewPic.alt;
  console.log('[upDate] Showing:', previewPic.alt);
}

function unDo() {
  const imageDiv = document.getElementById('image');
  imageDiv.style.backgroundImage = "url('')";
  imageDiv.textContent = "Hover over or focus on an image below to display here.";
  console.log('[unDo] Reset to default');
}

// Called on load: sets up keyboard access & tabindex in a loop
function addTabFocus() {
  const images = document.querySelectorAll('.preview');

  for (let i = 0; i < images.length; i++) {
    const img = images[i];

    // Add tabindex via JS (you also added focus/blur inline in HTML)
    img.setAttribute('tabindex', '0');

    // Device-independent JS listeners (progressive enhancement)
    img.addEventListener('mouseenter', function () { upDate(this); });
    img.addEventListener('mouseleave', unDo);
    img.addEventListener('focus', function () { upDate(this); });
    img.addEventListener('blur', unDo);

    // Keyboard activation for non-mouse users (Enter/Space/Escape)
    img.addEventListener('keydown', function (e) {
      const key = e.key || e.code;
      if (key === 'Enter' || key === ' ') {
        upDate(this);
        // prevent page scroll on Space
        e.preventDefault();
      } else if (key === 'Escape' || key === 'Esc') {
        unDo();
      }
    });
  }

  console.log('[onload] addTabFocus initialized for', images.length, 'images');
}

// onload hook (assignment requirement)
window.onload = addTabFocus;
