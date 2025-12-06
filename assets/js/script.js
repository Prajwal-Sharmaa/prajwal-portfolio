'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }


// programmatically trigger a mailto launch
const triggerMailtoLink = (href) => {
  if (!href) { return; }

  const hiddenLink = document.createElement("a");
  hiddenLink.href = href;
  hiddenLink.style.display = "none";
  hiddenLink.setAttribute("aria-hidden", "true");
  document.body.appendChild(hiddenLink);
  hiddenLink.click();
  document.body.removeChild(hiddenLink);
};



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formStatus = document.querySelector("[data-form-status]");

if (form) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn && formBtn.removeAttribute("disabled");
      } else {
        formBtn && formBtn.setAttribute("disabled", "");
      }
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const fullname = data.get("fullname");
    const email = data.get("email");
    const message = data.get("message");

    const recipient = "Prajwalsharma244@gmail.com";
    const subject = encodeURIComponent(`Portfolio inquiry from ${fullname}`);
    const body = encodeURIComponent(`Name: ${fullname}\nEmail: ${email}\n\n${message}`);

    const mailtoURL = `mailto:${recipient}?subject=${subject}&body=${body}`;
    const gmailFallbackURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${subject}&body=${body}`;

    triggerMailtoLink(mailtoURL);

    if (formStatus) {
      formStatus.innerHTML = `Opening your email app so you can send the message. <a href="${mailtoURL}">Click here</a> if nothing opened, or <a href="${gmailFallbackURL}" target="_blank" rel="noopener">compose in Gmail</a>.`;
    }

    form.reset();
    formBtn && formBtn.setAttribute("disabled", "");
  });
}


// contact copy email button
const copyButtons = document.querySelectorAll("[data-copy-email]");
const copyStatus = document.querySelector("[data-copy-status]");

const copyToClipboard = async (value) => {
  if (!value) { return false; }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch (error) {
      console.error("Clipboard write failed", error);
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const result = document.execCommand("copy");
  document.body.removeChild(textarea);
  return result;
};

if (copyButtons.length) {
  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const email = button.dataset.copyEmail;
      const success = await copyToClipboard(email);
      if (copyStatus) {
        copyStatus.textContent = success ? "Email copied to clipboard." : "Could not copy—please copy manually.";
      }
    });
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}