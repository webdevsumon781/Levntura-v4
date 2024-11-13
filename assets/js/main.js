// country code and flag
const phoneNumberInput = document.querySelectorAll(".phoneNumber");
for (let i = 0; i < phoneNumberInput.length; i++) {
  const iti = window.intlTelInput(phoneNumberInput[i], {
    initialCountry: "auto",
    separateDialCode: true,
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });
  function process(event) {
    event.preventDefault();
    const phoneNumber = iti.getNumber();
    // Handle the phone number (e.g., send it to the server for verification)
    console.log("Phone number:", phoneNumber);
  }
}

// country add
const countriesSelect = document.querySelectorAll(".countries");
for (let i = 0; i < countriesSelect.length; i++) {
  // Fetch country data from an API (e.g., REST Countries API)
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.name.common;
        option.textContent = country.name.common;
        countriesSelect[i].appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching country data:", error));
}

// Add Event on elements
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-open-btn");

  const toggleButtonColors = () => {
    navButtons.forEach((button) => {
      if (document.body.classList.contains("bg-black")) {
        button.classList.add("bg-black");
      } else {
        button.classList.remove("bg-black");
      }
    });
  };

  // Simulate background color change
  const toggleBackgroundColor = () => {
    document.body.classList.toggle("bg-black");
    toggleButtonColors();
  };

  // Initial call to set button colors based on initial background color
  toggleButtonColors();
});

// Navbar Toggle

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

window.addEventListener("scroll", function () {
  var scrollPosition = window.scrollY;
  var parallaxElement = document.querySelector(".parallax_move_down");
  var mainBgElement = document.querySelector(".main_bg");

  if (scrollPosition > 210) {
    parallaxElement.classList.add("hidden");
    mainBgElement.classList.add("white-background");
  } else {
    parallaxElement.classList.remove("hidden");
    mainBgElement.classList.remove("white-background");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const leftColumn = document.querySelector(".left_column");
  const rightColumn = document.querySelector(".right_column");

  let scrollSpeed = 1; // Adjust the speed here

  // Function to create an infinite loop by cloning items
  function infiniteScroll(container, direction) {
    const items = container.children;
    const containerHeight = container.offsetHeight;

    let offset = 0;

    function scroll() {
      if (direction === "up") {
        offset -= scrollSpeed;
        if (offset <= -items[0].offsetHeight) {
          container.appendChild(items[0]); // Move first element to the end
          offset = 0;
        }
      } else if (direction === "down") {
        offset += scrollSpeed;
        if (offset >= items[0].offsetHeight) {
          container.appendChild(items[0]); // Move first element to the end
          offset = 0;
        }
      }
      container.style.transform = `translateY(${offset}px)`;
      requestAnimationFrame(scroll);
    }

    scroll();
  }

  // Start scrolling: left goes up, right goes down
  infiniteScroll(leftColumn, "up");
  infiniteScroll(rightColumn, "down");

  // Pause scrolling on hover
  const pauseScrolling = () => (scrollSpeed = 0);
  const resumeScrolling = () => (scrollSpeed = 1);

  leftColumn.addEventListener("mouseover", pauseScrolling);
  leftColumn.addEventListener("mouseout", resumeScrolling);

  rightColumn.addEventListener("mouseover", pauseScrolling);
  rightColumn.addEventListener("mouseout", resumeScrolling);
});

/*=============== Slider ===============*/

document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(
    ".card__container, .swiper-container-two, .card__container_three "
  );

  sliders.forEach((slider) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              slider.classList.add("full-width");
            }, 1000);
            observer.unobserve(slider);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(slider);
  });
});

let swiperCards = new Swiper(".card__content", {
  loop: true,
  autoplay: true,
  spaceBetween: 16,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    400: {
      slidesPerView: 1.2,
    },

    600: {
      slidesPerView: 1.6,
    },

    708: {
      slidesPerView: 2.1,
    },

    808: {
      slidesPerView: 2.1,
    },

    968: {
      slidesPerView: 2.4,
    },

    1100: {
      slidesPerView: 2.7,
    },

    1160: {
      slidesPerView: 2.7,
    },

    1250: {
      slidesPerView: 2.9,
    },

    1350: {
      slidesPerView: 3.5,
    },

    1550: {
      slidesPerView: 4.5,
    },

    1850: {
      slidesPerView: 5,
    },
  },
});

const brandSlider = new Swiper(".brand_content", {
  loop: true,
  // autoplay: {
  //   delay: 0,
  // },
  // speed: 3000,
  autoplay: true,
  spaceBetween: 16,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    300: {
      slidesPerView: 1.8,
    },

    400: {
      slidesPerView: 2.6,
    },

    600: {
      slidesPerView: 3,
    },

    708: {
      slidesPerView: 3.4,
    },

    808: {
      slidesPerView: 3.8,
    },

    968: {
      slidesPerView: 4.3,
    },

    1100: {
      slidesPerView: 4.3,
    },

    1160: {
      slidesPerView: 5,
    },

    1250: {
      slidesPerView: 6,
    },

    1350: {
      slidesPerView: 7,
    },
  },
});

/*=============== Slider ===============*/
let programCards = new Swiper(".programs_card", {
  loop: true,
  spaceBetween: 16,
  grabCursor: true,
  autoplay: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    200: {
      slidesPerView: 1.4,
    },

    400: {
      slidesPerView: 1.4,
    },

    600: {
      slidesPerView: 2.6,
    },

    708: {
      slidesPerView: 3.1,
    },

    808: {
      slidesPerView: 3.1,
    },

    968: {
      slidesPerView: 3.4,
    },

    1100: {
      slidesPerView: 3.4,
    },

    1160: {
      slidesPerView: 3.7,
    },

    1250: {
      slidesPerView: 4,
    },

    1350: {
      slidesPerView: 5,
    },

    1550: {
      slidesPerView: 6,
    },

    1850: {
      slidesPerView: 6,
    },
  },
});

let mediaCards = new Swiper(".media_card", {
  loop: true,
  spaceBetween: 16,
  grabCursor: true,
  autoplay: {
    delay: 1,
  },
  speed: 2000,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    300: {
      slidesPerView: 1.2,
    },

    400: {
      slidesPerView: 1.2,
    },

    600: {
      slidesPerView: 1.6,
    },

    708: {
      slidesPerView: 2.1,
    },

    808: {
      slidesPerView: 2.1,
    },

    968: {
      slidesPerView: 2.4,
    },

    1100: {
      slidesPerView: 2.7,
    },

    1160: {
      slidesPerView: 2.7,
    },

    1250: {
      slidesPerView: 2.9,
    },

    1350: {
      slidesPerView: 4.2,
    },
  },
});

let knowledgeCards = new Swiper(".knowledge_image_content", {
  loop: true,
  spaceBetween: 16,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    400: {
      slidesPerView: 1.2,
    },

    600: {
      slidesPerView: 1.6,
    },

    708: {
      slidesPerView: 2.1,
    },

    808: {
      slidesPerView: 2.1,
    },

    968: {
      slidesPerView: 2.4,
    },

    1100: {
      slidesPerView: 2.7,
    },

    1160: {
      slidesPerView: 2.7,
    },

    1250: {
      slidesPerView: 2.9,
    },

    1350: {
      slidesPerView: 4.5,
    },
  },
});

const videos = document.querySelectorAll(".videoElement");

// Loop through each video and add the click event listener
videos.forEach((video) => {
  video.addEventListener("mouseover", () => {
    // Check if the video is playing
    if (video.paused) {
      video.muted = false; // Unmute the video
      video.play(); // Play the video
    } else {
      video.pause(); // Pause the video
      video.muted = true; // Mute the video
    }
  });

  video.addEventListener("mouseout", () => {
    // Check if the video is playing
    if (video.play) {
      video.pause(); // Pause the video
      video.muted = true; // Mute the video
    }
  });
});

/*=============== Slider ===============*/
let reviewCards = new Swiper(".review_card", {
  loop: true,
  spaceBetween: 16,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    400: {
      slidesPerView: 1.3,
    },

    500: {
      slidesPerView: 1.6,
    },

    600: {
      slidesPerView: 1.8,
    },

    708: {
      slidesPerView: 2.1,
    },

    808: {
      slidesPerView: 2.1,
    },

    968: {
      slidesPerView: 2.4,
    },

    1100: {
      slidesPerView: 2.7,
    },

    1160: {
      slidesPerView: 2.7,
    },

    1250: {
      slidesPerView: 2.9,
    },

    1350: {
      slidesPerView: 4.5,
    },
  },
});

var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/*=============== Slider ===============*/
let programThreeCards = new Swiper(".programs_three_card", {
  loop: true,
  spaceBetween: 16,
  grabCursor: true,
  freeMode: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    300: {
      slidesPerView: 1.1,
    },

    400: {
      slidesPerView: 1.1,
    },

    500: {
      slidesPerView: 1.3,
    },

    600: {
      slidesPerView: 1.7,
    },

    708: {
      slidesPerView: 2.1,
    },

    808: {
      slidesPerView: 2.1,
    },

    968: {
      slidesPerView: 2.4,
    },

    1100: {
      slidesPerView: 2.7,
    },

    1160: {
      slidesPerView: 2.7,
    },

    1250: {
      slidesPerView: 3.9,
    },

    1350: {
      slidesPerView: 5.5,
    },
  },
});

/*=============== Slider ===============*/
let programFourCards = new Swiper(".programs_four_card", {
  loop: true,
  spaceBetween: 16,
  grabCursor: true,
  freeMode: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    400: {
      slidesPerView: 1.2,
    },

    600: {
      slidesPerView: 1.6,
    },

    708: {
      slidesPerView: 2.1,
    },

    808: {
      slidesPerView: 2.1,
    },

    968: {
      slidesPerView: 2.4,
    },

    1100: {
      slidesPerView: 2.7,
    },

    1160: {
      slidesPerView: 1.4,
    },

    1250: {
      slidesPerView: 2,
    },

    1350: {
      slidesPerView: 4.3,
    },
  },
});

/*=============== Slider ===============*/

let programFiveCards = new Swiper(".programs_five_card", {
  loop: true,
  spaceBetween: 16,
  grabCursor: true,
  freeMode: true,

  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  //   dynamicBullets: true,
  // },

  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev",
  // },

  breakpoints: {
    400: {
      slidesPerView: 1.2,
    },

    600: {
      slidesPerView: 1.6,
    },

    708: {
      slidesPerView: 2.1,
    },

    808: {
      slidesPerView: 2.1,
    },

    968: {
      slidesPerView: 2.4,
    },

    1100: {
      slidesPerView: 2.5,
    },

    1160: {
      slidesPerView: 2.7,
    },

    1250: {
      slidesPerView: 2,
    },

    1350: {
      slidesPerView: 4.2,
    },
  },
});

/*=============== Slider ===============*/
let programSevenCards = new Swiper(".programs_seven_card", {
  loop: true,
  spaceBetween: 16,
  freeMode: true,
  freeModeSticky: true,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    400: {
      slidesPerView: 1.3,
    },

    600: {
      slidesPerView: 2,
    },

    708: {
      slidesPerView: 3,
    },

    808: {
      slidesPerView: 4,
    },

    968: {
      slidesPerView: 4,
    },

    1100: {
      slidesPerView: 4.4,
    },

    1160: {
      slidesPerView: 4,
    },

    1250: {
      slidesPerView: 4,
    },

    1350: {
      slidesPerView: 6.4,
    },
  },
});

// FAQ
document.addEventListener("DOMContentLoaded", function () {
  const firstFaqItem = document.querySelector(".faq-item");
  if (firstFaqItem) {
    firstFaqItem.querySelector(".faq-answer").style.maxHeight =
      firstFaqItem.querySelector(".faq-answer").scrollHeight + "px";
  }
});

function toggleFAQ(element) {
  const faqItem = element.parentElement;
  const isActive = faqItem.classList.contains("active");
  const allFaqItems = document.querySelectorAll(".faq-item");

  allFaqItems.forEach((item) => {
    item.classList.remove("active");
    item.querySelector(".faq-answer").style.maxHeight = null;
  });

  if (!isActive) {
    faqItem.classList.add("active");
    faqItem.querySelector(".faq-answer").style.maxHeight =
      faqItem.querySelector(".faq-answer").scrollHeight + "px";
  }
}

// Pagination

document.addEventListener("DOMContentLoaded", function () {
  const paginationLinks = document.querySelectorAll(".page-link");

  paginationLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      document.querySelector(".page-item.active").classList.remove("active");
      this.parentElement.classList.add("active");
    });
  });
});

function showPopup() {
  document.getElementById("popupForm").style.display = "flex";

  // Pre-populate the major input field with three predefined categories
  const predefinedMajors = ["Computer Science", "Design", "Graphic Design"];
  predefinedMajors.forEach((major) => addTag(major));
}

function closePopup() {
  document.getElementById("popupForm").style.display = "none";

  // Clear the tags when the popup is closed
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => tag.remove());
}

document.addEventListener("DOMContentLoaded", function () {
  const majorInput = document.getElementById("majorInput");
  const tagContainer = document.querySelector(".tag_container");

  if (majorInput && tagContainer) {
    majorInput.addEventListener("change", function () {
      const selectedMajor = majorInput.value;
      if (selectedMajor) {
        addTag(selectedMajor);
        majorInput.value = "";
      }
    });

    function addTag(text) {
      const existingTags = Array.from(tagContainer.children).map((tag) =>
        tag.textContent.replace("×", "").trim()
      );
      if (existingTags.includes(text)) return;

      const tag = document.createElement("div");
      tag.className = "tag";
      tag.innerText = text;

      const removeButton = document.createElement("span");
      removeButton.className = "remove_tag";
      removeButton.innerHTML = "&times;";
      removeButton.onclick = function () {
        tag.remove();
      };

      tag.appendChild(removeButton);
      tagContainer.appendChild(tag);
    }
  }
});

// program page full with slider
document.querySelector(".card__container").ondrag = function () {
  document.querySelector(".card__container").style.overflow = "visible";
};

document.querySelector(".card__container_two").onmouseover = function () {
  document
    .querySelector(".card__container_two")
    .classList.add("leftSpaceRemove");
};
document.querySelector(".card__container_two").onmouseout = function () {
  document
    .querySelector(".card__container_two")
    .classList.remove("leftSpaceRemove");
};

document.getElementById("applyForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevents actual submission for demo
  const successMessage = document.getElementById("successMessage");

  // Show the success message
  successMessage.style.display = "block";

  // Hide the message after 3 seconds
  setTimeout(function () {
    successMessage.style.display = "none";
  }, 3000);
});


function showSuccessMessage(event) {
  event.preventDefault(); // Prevents actual form submission for demonstration
  const successMessage = document.getElementById("successMessage");
  
  // Show the message
  successMessage.style.display = "block";
  
  // Hide the message after a few seconds
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 2000);

  // Clear the form fields after submission if needed
  event.target.reset();
}

// Attach event listeners to all forms
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", showSuccessMessage);
});
