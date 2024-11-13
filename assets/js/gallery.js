document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("fullscreenModal");
  const modalImg = document.getElementById("fullImg");
  const closeBtn = document.querySelector(".close-btn-two");
  const galleryImages = Array.from(document.querySelectorAll(".gallery-img"));
  let currentIndex = 0;
  const SWIPE_THRESHOLD = 50; // Minimum distance to detect a swipe

  // Open the modal when an image is clicked
  galleryImages.forEach((img, index) => {
    img.onclick = function () {
      currentIndex = index;
      showModalImage(img.src);
    };
  });

  function showModalImage(src) {
    modal.style.display = "flex";
    modalImg.src = src;
    modalImg.style.transform = "scale(0.9)";
    setTimeout(() => {
      modalImg.style.transform = "scale(1)";
    }, 10);
  }

  // Close the modal
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Variables to handle swipe detection
  let startX = 0;
  let isDragging = false;

  // Mouse events for swipe detection on modal
  modal.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isDragging = true;
  });

  modal.addEventListener("mouseup", (e) => {
    if (isDragging) {
      handleSwipe(e.clientX);
      isDragging = false;
    }
  });

  modal.addEventListener("mousemove", (e) => {
    // Prevent default dragging behavior if dragging starts on image
    if (isDragging) e.preventDefault();
  });

  modal.addEventListener("mouseleave", () => {
    isDragging = false;
  });

  // Touch events for swipe detection on modal
  modal.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  modal.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    handleSwipe(endX);
  });

  // Function to determine swipe direction
  function handleSwipe(endX) {
    const swipeDistance = startX - endX;
    if (Math.abs(swipeDistance) > SWIPE_THRESHOLD) {
      if (swipeDistance > 0) {
        showNextImage(); // Swiped left
      } else {
        showPrevImage(); // Swiped right
      }
    }
  }
  function showNextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showModalImage(galleryImages[currentIndex].src);
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    showModalImage(galleryImages[currentIndex].src);
  }

  // Switch images when thumbnails are clicked
  document.querySelectorAll(".thumbnail-img").forEach((thumbnail) => {
    thumbnail.onclick = function () {
      showModalImage(this.src);
    };
  });


  

  // Multiselect functionality
  document
    .querySelector('.custom-multiselect input[type="text"]')
    .addEventListener("click", function () {
      const optionsBox = this.nextElementSibling;
      optionsBox.style.display =
        optionsBox.style.display === "block" ? "none" : "block";
    });

  document
    .querySelectorAll('.custom-multiselect .options input[type="checkbox"]')
    .forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        const selectedOptions = [];
        document
          .querySelectorAll(
            '.custom-multiselect .options input[type="checkbox"]:checked'
          )
          .forEach(function (selected) {
            selectedOptions.push(selected.parentNode.textContent.trim());
          });
        document.querySelector('.custom-multiselect input[type="text"]').value =
          selectedOptions.join(", ");
        if (selectedOptions.length > 0) {
          checkbox.closest(".options").style.display = "none";
        }
      });
    });

  document.addEventListener("click", function (e) {
    const multiselect = document.querySelector(".custom-multiselect");
    if (!multiselect.contains(e.target)) {
      document.querySelector(".custom-multiselect .options").style.display =
        "none";
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const programInput = document.getElementById("programInput");
  const selectedProgramsContainer = document.getElementById("selectedPrograms");
  const programsList = new Set();

  // Add a tag when user selects an option
  programInput.addEventListener("change", function () {
    const selectedProgram = programInput.value.trim();

    // Check if the program is already added or if input is empty
    if (selectedProgram && !programsList.has(selectedProgram)) {
      programsList.add(selectedProgram);
      addTag(selectedProgram);
    }
    programInput.value = ""; // Clear input after selection
  });

  // Function to add a tag to the container
  function addTag(program) {
    const tag = document.createElement("div");
    tag.className = "program-tag";
    tag.textContent = program;

    const removeBtn = document.createElement("span");
    removeBtn.className = "remove-program-tag";
    removeBtn.textContent = "x";
    removeBtn.onclick = function () {
      programsList.delete(program);
      tag.remove();
    };

    tag.appendChild(removeBtn);
    selectedProgramsContainer.appendChild(tag);
  }
});
