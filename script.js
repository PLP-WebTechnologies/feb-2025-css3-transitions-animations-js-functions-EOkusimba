document.addEventListener("DOMContentLoaded", function () {
    // Element selections
    const changeTextBtn = document.getElementById("changeTextBtn");
    const changeColorBtn = document.getElementById("changeColorBtn");
    const addParagraphBtn = document.getElementById("addParagraphBtn");
    const removeElementBtn = document.getElementById("removeElementBtn");
    const subtitle = document.querySelector(".header-subtitle");
    const header = document.querySelector(".header");
    const storyContent = document.querySelector(".story-content");
    const heroImage = document.getElementById("heroImage");
    
    // Form elements
    const sampleForm = document.getElementById("sampleForm");
    const emailInput = document.getElementById("emailInput");
    const emailError = document.getElementById("emailError");
    const passwordInput = document.getElementById("passwordInput");
    const passwordError = document.getElementById("passwordError");
  
    // ------------------------------------------------------------
    // Local Storage for User Preferences
    // ------------------------------------------------------------
    // Retrieve stored subtitle and header color (if available)
    const storedSubtitle = localStorage.getItem("userSubtitle");
    const storedHeaderColor = localStorage.getItem("headerColor");
    
    if (storedSubtitle && subtitle) {
      subtitle.textContent = storedSubtitle;
    }
    if (storedHeaderColor && header) {
      header.style.backgroundColor = storedHeaderColor;
    }
  
    // ------------------------------------------------------------
    // Basic Event Handling with Animation and localStorage Support
    // ------------------------------------------------------------
    if (changeTextBtn && subtitle) {
      changeTextBtn.addEventListener("click", function () {
        // Prompt for new subtitle text
        const newSubtitle = prompt("Enter a new subtitle:");
        if (newSubtitle) {
          subtitle.textContent = newSubtitle;
          // Save the new subtitle in localStorage for persistence
          localStorage.setItem("userSubtitle", newSubtitle);
          // Trigger an animation (ensure .animate is defined in CSS with keyframes/transition)
          subtitle.classList.add("animate");
          setTimeout(() => {
            subtitle.classList.remove("animate");
          }, 1000);
        }
      });
    }
  
    if (changeColorBtn && header) {
      changeColorBtn.addEventListener("click", function () {
        // Prompt for a new header background color
        const newColor = prompt("Enter a new header background color (e.g., #FF5733 or red):");
        if (newColor) {
          header.style.backgroundColor = newColor;
          // Save header color preference in localStorage
          localStorage.setItem("headerColor", newColor);
          // Simple animation: scale header briefly for visual effect
          header.style.transform = "scale(1.05)";
          setTimeout(() => {
            header.style.transform = "scale(1)";
          }, 300);
        } else {
          // Fallback: toggle a CSS class if no color provided
          header.classList.toggle("modified");
        }
      });
    }
  
    if (addParagraphBtn && storyContent) {
      addParagraphBtn.addEventListener("click", function () {
        let newParagraph = document.createElement("p");
        newParagraph.textContent = "Follow me for more coding stories!";
        // Initial opacity 0 for a fade-in effect
        newParagraph.style.opacity = "0";
        storyContent.appendChild(newParagraph);
        // Animate fade in
        setTimeout(() => {
          newParagraph.style.transition = "opacity 0.5s ease";
          newParagraph.style.opacity = "1";
        }, 50);
      });
    }
  
    if (removeElementBtn && storyContent) {
      removeElementBtn.addEventListener("click", function () {
        let elementToRemove = storyContent.querySelector("p:last-child");
        if (elementToRemove) {
          // Fade-out animation before removal
          elementToRemove.style.transition = "opacity 0.5s ease";
          elementToRemove.style.opacity = "0";
          setTimeout(() => {
            elementToRemove.remove();
          }, 500);
        }
      });
    }
  
    // ------------------------------------------------------------
    // Additional Event Handling
    // ------------------------------------------------------------
    // Keypress detection example: update subtitle on Enter key press
    document.addEventListener("keypress", function (event) {
      console.log("Key pressed:", event.key);
      if (event.key === "Enter") {
        subtitle.textContent = "Enter key pressed! Bugs be gone!";
      }
    });
  
    // Double-click secret action on header
    if (header) {
      header.addEventListener("dblclick", function () {
        alert("Secret action unlocked! You double-clicked the header!");
        header.style.backgroundColor = "#f0e68c"; // Secret style change
      });
    }
  
    // Long press detection on "Change Text" button to trigger another subtitle update
    let pressTimer;
    if (changeTextBtn && subtitle) {
      changeTextBtn.addEventListener("mousedown", function () {
        pressTimer = setTimeout(function () {
          subtitle.textContent = "Long press activated! Ready to debug life.";
          localStorage.setItem("userSubtitle", "Long press activated! Ready to debug life.");
          subtitle.classList.add("animate");
          setTimeout(() => {
            subtitle.classList.remove("animate");
          }, 1000);
        }, 1500);
      });
      changeTextBtn.addEventListener("mouseup", function () {
        clearTimeout(pressTimer);
      });
      changeTextBtn.addEventListener("mouseleave", function () {
        clearTimeout(pressTimer);
      });
    }
  
    // Interactive Image Gallery: cycle images and trigger a simple animation on click
    const imageArray = [
      "https://images.pexels.com/photos/8885041/pexels-photo-8885041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg?auto=compress&cs=tinysrgb&w=400"
    ];
    let currentImageIndex = 0;
    if (heroImage) {
      heroImage.addEventListener("click", function () {
        currentImageIndex = (currentImageIndex + 1) % imageArray.length;
        heroImage.src = imageArray[currentImageIndex];
        // Trigger animation on the image for visual feedback
        heroImage.classList.add("animate");
        setTimeout(() => {
          heroImage.classList.remove("animate");
        }, 1000);
      });
    }
  
    // ------------------------------------------------------------
    // Form Validation with Real-Time Feedback
    // ------------------------------------------------------------
    if (sampleForm) {
      sampleForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission for demo purposes
        let valid = true;
    
        // Email validation using regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
          emailError.textContent = "Please enter a valid email address.";
          valid = false;
        } else {
          emailError.textContent = "";
        }
    
        // Password validation: ensure at least 8 characters
        if (passwordInput.value.length < 8) {
          passwordError.textContent = "Password must be at least 8 characters long.";
          valid = false;
        } else {
          passwordError.textContent = "";
        }
    
        if (valid) {
          alert("Form submitted successfully!");
          sampleForm.reset();
        }
      });
    
      // Real-time feedback for Email
      emailInput.addEventListener("input", function () {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
          emailError.textContent = "Invalid email format.";
        } else {
          emailError.textContent = "";
        }
      });
    
      // Real-time feedback for Password
      passwordInput.addEventListener("input", function () {
        if (passwordInput.value.length < 8) {
          passwordError.textContent = "Minimum 8 characters required.";
        } else {
          passwordError.textContent = "";
        }
      });
    }
  });
  