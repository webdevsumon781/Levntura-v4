document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tabs a");
    const programCards = document.querySelectorAll(".all_programs_card");
    const searchInput = document.querySelector(".tab_search-input");
    const noResultMessage = document.querySelector(".no-result-message");
  
    // Function to show or hide program cards based on the selected category
    const filterProgramsByCategory = (category) => {
      let hasResults = false;
      programCards.forEach((card) => {
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
      programCards.forEach((card) => {
        const cardText = card.textContent.toLowerCase();
        if (cardText.includes(searchText)) {
          card.classList.add("show");
          hasResults = true;
          // Underline matched text in card
          underlineMatchedText(card, searchText);
        } else {
          card.classList.remove("show");
          // Reset underline if search text is empty
          resetUnderlinedText(card);
        }
      });
      noResultMessage.style.display = hasResults ? "none" : "block";
    };
  
    // Function to underline matched text
    const underlineMatchedText = (element, searchText) => {
      const regex = new RegExp(`(${searchText})`, "gi");
      const elementsToHighlight = element.querySelectorAll("h2, h5, p");
      elementsToHighlight.forEach((el) => {
        el.innerHTML = el.textContent.replace(
          regex,
          '<span style="background-color: #10ff00;">$1</span>'
        );
      });
    };
  
    // Function to reset underlined text
    const resetUnderlinedText = (element) => {
      const elementsToHighlight = element.querySelectorAll("h2, h5, p");
      elementsToHighlight.forEach((el) => {
        el.innerHTML = el.textContent;
      });
    };
  
    // Event listener for tab clicks
    tabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
  
        // Remove active class from all tabs and add to clicked tab
        tabs.forEach((t) => t.classList.remove("tab_active"));
        tab.classList.add("tab_active");
  
        // Get the category from data attribute
        const category = tab.dataset.category;
  
        // Filter program cards based on category
        filterProgramsByCategory(category);
  
        // Handle search input to apply filter after tab change
        handleSearch(searchInput.value);
      });
    });
  
    // Event listener for search input
    searchInput.addEventListener("input", () => {
      handleSearch(searchInput.value);
    });
  
    // Initial load: filter by the active tab
    const activeTab = document.querySelector(".tabs a.tab_active").dataset.category;
    filterProgramsByCategory(activeTab);
  });
  