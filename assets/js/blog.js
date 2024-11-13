document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabs a");
  const blogCards = document.querySelectorAll(".blog_card");
  const searchInput = document.querySelector(".tab_search-input");

  // Function to show or hide blog cards based on the selected category
  const filterBlogsByCategory = (category) => {
    let hasResults = false;
    blogCards.forEach((card) => {
      if (category === "all" || card.dataset.category === category) {
        card.classList.add("show");
        hasResults = true;
      } else {
        card.classList.remove("show");
      }
    });
    noResultMessage.style.display = hasResults ? "none" : "block";
  };

  // Function to handle the search input
  const handleSearch = (searchText) => {
    searchText = searchText.toLowerCase();
    let hasResults = false;
    blogCards.forEach((card) => {
      const titleElement = card.querySelector(".blog_heading_two h1");
      const articleElement = card.querySelector(".blog_aricle p");
      const titleText = titleElement.textContent.toLowerCase();
      const articleText = articleElement.textContent.toLowerCase();

      if (titleText.includes(searchText) || articleText.includes(searchText)) {
        card.classList.add("show");
        hasResults = true;
        // Underline matched text in title and article
        underlineMatchedText(titleElement, titleText, searchText);
        underlineMatchedText(articleElement, articleText, searchText);
      } else {
        card.classList.remove("show");
        // Reset underline if search text is empty
        titleElement.innerHTML = titleElement.textContent;
        articleElement.innerHTML = articleElement.textContent;
      }
    });
    noResultMessage.style.display = hasResults ? "none" : "block";
  };

  // Function to underline matched text
  const underlineMatchedText = (element, text, searchText) => {
    const regex = new RegExp(`(${searchText})`, "gi");
    const newText = text.replace(
      regex,
      '<span style="background-color: #FC535C; ">$1</span>'
    );
    element.innerHTML = newText;
  };

  // Event listener for tab clicks
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active class from all tabs and add to clicked tab
      tabs.forEach((t) => t.classList.remove("blog_tab_active"));
      tab.classList.add("blog_tab_active");

      // Get the category from data attribute
      const category = tab.dataset.tab;

      // Filter blog cards based on category
      filterBlogsByCategory(category);

      // Handle search input to apply filter after tab change
      handleSearch(searchInput.value);
    });
  });

  // Event listener for search input
  searchInput.addEventListener("input", () => {
    handleSearch(searchInput.value);
  });

  // Initial load: filter by the active tab
  const activeTab = document.querySelector(".tabs a.blog_tab_active").dataset
    .tab;
  filterBlogsByCategory(activeTab);
});

document.addEventListener("DOMContentLoaded", function () {
  // Get modal elements
  var modal = document.getElementById("myModal");
  var btn = document.querySelector(".blog_create_btn");
  var span = document.getElementsByClassName("close")[0];
  var closeBtn = document.getElementById("closeBtn");

  btn.onclick = function () {
    modal.style.display = "block";
  };

  if (span) {
    span.onclick = function () {
      modal.style.display = "none";
    };
  }

  if (closeBtn) {
    closeBtn.onclick = function () {
      modal.style.display = "none";
    };
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Step navigation
  var currentStep = 0;
  showStep(currentStep);

  function showStep(n) {
    var steps = document.getElementsByClassName("step");
    steps[n].classList.add("active");

    // Disable previous button if on the first step
    document.getElementById("prevBtn").disabled = n == 0;

    // Change button text to "Submit" on the last step, otherwise "Next"
    document.getElementById("nextBtn").innerHTML =
      n == steps.length - 1 ? "Submit" : "Next";

    updateStepIndicators(n);
  }

  window.nextPrev = function (n) {
    // Validate the current step before moving forward
    if (n === 1 && !validateStep(currentStep)) {
      return false; // Block advancing if the current step is invalid
    }

    var steps = document.getElementsByClassName("step");
    steps[currentStep].classList.remove("active");

    // Move to the next or previous step
    currentStep += n;

    // If reached the end of the form
    if (currentStep >= steps.length) {
      document.getElementById("regForm").submit();
      return false;
    }

    // Show the current step
    showStep(currentStep);
  };

  // Function to validate email and phone number
  function validateStep(stepIndex) {
    var step = document.getElementsByClassName("step")[stepIndex];
    var inputs = step.querySelectorAll("input, textarea");
    var valid = true;

    // Regular expression for email and phone number validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/; // Adjust to your required phone format

    inputs.forEach((input) => {
      // Skip validation for file inputs
      if (input.type === "file") {
        return;
      }

      // General validation for empty inputs
      if (input.value.trim() === "") {
        input.classList.add("error");
        valid = false;
      } else {
        input.classList.remove("error");
      }

      // Specific validation for email field
      if (input.type === "email" && !emailRegex.test(input.value.trim())) {
        input.classList.add("error");
        valid = false;
      }

      // Specific validation for phone number field
      if (input.type === "tel" && !phoneRegex.test(input.value.trim())) {
        input.classList.add("error");
        valid = false;
      }
    });

    // Display or hide error messages (only visual, does not block)
    var errorMessages = step.querySelectorAll(".error-message");
    errorMessages.forEach((msg) => {
      msg.style.display = valid ? "none" : "block";
    });

    return valid; // Return whether the step is valid
  }

  function updateStepIndicators(n) {
    var steps = document.getElementsByClassName("step");

    // Remove the active class from all steps
    for (var i = 0; i < steps.length; i++) {
      steps[i].classList.remove("active");
    }

    // Add the active class to the current step
    steps[n].classList.add("active");
  }

  function updateStepIndicators(n) {
    var steps = document.getElementsByClassName("step");

    // Remove the active class from all steps
    for (var i = 0; i < steps.length; i++) {
      steps[i].classList.remove("active");
    }

    // Add the active class to the current step
    steps[n].classList.add("active");
  }

  // Word count functionality for text areas
  const textareas = {
    title: document.querySelector("#blogTitle"),
    article: document.querySelector("#blogArticle"),
  };

  const maxWords = {
    title: 100,
    article: 1000,
  };

  Object.keys(textareas).forEach((key) => {
    const textarea = textareas[key];
    const wordCountElement = textarea.parentElement.querySelector(
      ".text_number_update"
    );
    const warningMessage =
      textarea.parentElement.querySelector(".warning-message");

    textarea.addEventListener("input", function (event) {
      const max = maxWords[key];
      const words = event.target.value
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
      const wordCount = words.length;

      if (wordCount > max) {
        const trimmedWords = words.slice(0, max);
        event.target.value = trimmedWords.join(" ");
        wordCountElement.textContent = max;
        warningMessage.style.display = "block";
      } else {
        wordCountElement.textContent = wordCount;
        warningMessage.style.display = "none";
      }
    });
  });

  // Drop zone and file upload functionality
  const dropZone = document.getElementById("dropZone");
  const fileInput = document.getElementById("uploadPictures");
  const uploadLink = document.getElementById("uploadLink");
  const plusIcons = document.querySelectorAll(".plus-icon");
  const imageFields = document.querySelectorAll(".image-field");

  dropZone.addEventListener("dragover", function (event) {
    event.preventDefault();
    dropZone.classList.add("drag-over");
  });

  dropZone.addEventListener("dragleave", function () {
    dropZone.classList.remove("drag-over");
  });

  dropZone.addEventListener("drop", function (event) {
    event.preventDefault();
    dropZone.classList.remove("drag-over");
    handleFiles(event.dataTransfer.files);
  });

  uploadLink.addEventListener("click", function (event) {
    event.preventDefault();
    fileInput.click();
  });

  fileInput.addEventListener("change", function () {
    handleFiles(this.files);
  });

  plusIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const inputId = this.getAttribute("data-input-id");
      document.getElementById(inputId).click();
    });
  });

  function handleFiles(files) {
    const allowedFiles = [...files].slice(0, 5); // Limit to 5 files

    allowedFiles.forEach((file, index) => {
      if (index < imageFields.length) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const preview = imageFields[index].querySelector(".image-preview");
          preview.style.backgroundImage = `url(${e.target.result})`;
          imageFields[index].querySelector(".plus-icon").style.display = "none";
          imageFields[index].querySelector(".remove-icon").style.display =
            "block";
        };
        reader.readAsDataURL(file);
      }
    });
  }

  document.querySelectorAll(".upload_img_plus").forEach((input, index) => {
    input.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const preview = document.getElementById(`preview${index + 1}`);
          preview.style.backgroundImage = `url(${e.target.result})`;
          document
            .getElementById(`imageField${index + 1}`)
            .querySelector(".plus-icon").style.display = "none";
          document
            .getElementById(`imageField${index + 1}`)
            .querySelector(".remove-icon").style.display = "block";
        };
        reader.readAsDataURL(file);
      }
    });
  });

  document.querySelectorAll(".remove-icon").forEach((icon) => {
    icon.addEventListener("click", function () {
      const inputId = this.getAttribute("data-input-id");
      const fileInput = document.getElementById(inputId);
      fileInput.value = ""; // Clear the file input
      const preview =
        this.closest(".image-field").querySelector(".image-preview");
      preview.style.backgroundImage = ""; // Clear the preview
      this.style.display = "none"; // Hide the remove icon
      this.closest(".image-field").querySelector(".plus-icon").style.display =
        "block"; // Show the plus icon
    });
  });
});
