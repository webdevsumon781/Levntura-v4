// Show the apply popup form
document.getElementById("openFormButton").addEventListener("click", function () {
  document.getElementById("applyPopupForm").classList.add("slideUp");
});

// Close the apply popup form
document.getElementById("closeFormButton").addEventListener("click", function () {
  document.getElementById("applyPopupForm").classList.remove("slideUp");
});

// Close the popup if clicked outside the form
document.addEventListener("click", function (event) {
  if (event.target === document.getElementById("applyPopupForm")) {
    document.getElementById("applyPopupForm").classList.remove("slideUp");
  }
});

// Drag-and-drop functionality for file upload
const uploadBoxNew = document.getElementById("uploadBoxNew");

uploadBoxNew.addEventListener("dragover", function (event) {
  event.preventDefault();
  this.classList.add("drag_over_new"); // Add drag over effect
});

uploadBoxNew.addEventListener("dragleave", function (event) {
  event.preventDefault();
  this.classList.remove("drag_over_new"); // Remove drag over effect
});

uploadBoxNew.addEventListener("drop", function (event) {
  event.preventDefault();
  this.classList.remove("drag_over_new"); // Remove drag over effect
  const files = event.dataTransfer.files;
  handleFilesNew(files); // Handle dropped files
});

// Trigger file input click
document.getElementById("uploadLinkNew").addEventListener("click", function () {
  document.getElementById("fileInputNew").click();
});

// Handle file input change
document.getElementById("fileInputNew").addEventListener("change", function () {
  const files = this.files;
  handleFilesNew(files); // Handle selected files
});

// Function to handle uploaded files
function handleFilesNew(files) {
  console.log("Files uploaded:", files);
  // You can add code here to display the file previews, as mentioned earlier
}

// Open the apply form with the apply button
document.getElementById("applyBtn").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("applyPopupForm").style.display = "flex";
});

// Close the popup form with the close button
document.getElementById("closePopupBtn").addEventListener("click", function () {
  document.getElementById("applyPopupForm").style.display = "none";
});

// Close the form when clicking outside of the form content (optional)
window.addEventListener("click", function (event) {
  if (event.target == document.getElementById("applyPopupForm")) {
    document.getElementById("applyPopupForm").style.display = "none";
  }
});



// Function to handle uploaded files and display previews
function handleFilesNew(files) {
  console.log("Files uploaded:", files);

  // Clear any previous file previews
  const uploadBoxNew = document.getElementById("uploadBoxNew");
  const uploadContentNew = uploadBoxNew.querySelector(".upload_content_new");
  uploadContentNew.innerHTML = ""; // Clear current content

  // Loop through each file and generate a preview
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // Check if the file is a PDF or an image
    if (file.type === "application/pdf") {
      // Create an iframe to display the PDF
      const pdfPreview = document.createElement("iframe");
      pdfPreview.classList.add("full-preview");
      pdfPreview.src = URL.createObjectURL(file); // Use URL.createObjectURL to display the PDF
      pdfPreview.setAttribute("frameborder", "0");

      // Append the PDF preview to the upload content area
      uploadContentNew.appendChild(pdfPreview);
    } else if (file.type.startsWith("image/")) {
      // Create an image element to display the image
      const imagePreview = document.createElement("img");
      imagePreview.classList.add("full-preview");
      imagePreview.src = URL.createObjectURL(file); // Use URL.createObjectURL to display the image

      // Append the image preview to the upload content area
      uploadContentNew.appendChild(imagePreview);
    } else {
      // If the file is neither a PDF nor an image, show an error message
      const errorMsg = document.createElement("p");
      errorMsg.textContent = "Please upload a valid PDF or image file.";
      errorMsg.classList.add("error-msg");
      uploadContentNew.appendChild(errorMsg);
    }

    // Create and append the "Cancel" button
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("cancel-upload-btn");
    uploadContentNew.appendChild(cancelButton);

    // Add event listener to cancel button to reset the upload box
    cancelButton.addEventListener("click", function () {
      resetUploadBox();
    });
  }
}

// Function to reset the upload box content
function resetUploadBox() {
  const uploadBoxNew = document.getElementById("uploadBoxNew");
  const uploadContentNew = uploadBoxNew.querySelector(".upload_content_new");
  uploadContentNew.innerHTML = `
    <i class="fa-solid fa-cloud-upload-alt"></i>
    <p>
      <a href="#" id="uploadLinkNew">Click to Upload</a>
      Or Drag And Drop
    </p>
    <input type="file" id="fileInputNew" multiple hidden />
  `;

  // Re-attach event listeners to the new upload link and input after reset
  document.getElementById("uploadLinkNew").addEventListener("click", function () {
    document.getElementById("fileInputNew").click();
  });

  document.getElementById("fileInputNew").addEventListener("change", function () {
    const files = this.files;
    handleFilesNew(files);
  });
}
