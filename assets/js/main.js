const packages = {
  "Starter Website": "$399",
  "Business Website": "$799",
  "Premium Website": "$1,499",
  "Online Store / Booking Website": "$2,250",
  "Custom Web System": "$3,000"
};

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const menu = document.querySelector("[data-menu]");
const selectedPackage = document.querySelector("#selectedPackage");
const selectedPackageTitle = document.querySelector("#selected-package-title");
const selectedPackagePrice = document.querySelector("#selected-package-price");
const form = document.querySelector("#project-form");
const formError = document.querySelector("#form-error");
const submitButton = document.querySelector("#submit-button");
const successPanel = document.querySelector("#success-panel");
const successMessage = document.querySelector("#success-message");
const summaryList = document.querySelector("#summary-list");
const stickyWhatsapp = document.querySelector(".sticky-whatsapp");

function updatePageChrome() {
  header.classList.toggle("scrolled", window.scrollY > 12);
  stickyWhatsapp.classList.toggle("visible", window.innerWidth > 640 || window.scrollY > 520);
}

window.addEventListener("scroll", updatePageChrome);
window.addEventListener("resize", updatePageChrome);
updatePageChrome();

menuButton.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.querySelector(".sr-only").textContent = isOpen ? "Close navigation menu" : "Open navigation menu";
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

function updateSelectedPackage(packageName, price) {
  selectedPackage.value = packageName;
  selectedPackageTitle.textContent = packageName;
  selectedPackagePrice.textContent = price;
}

selectedPackage.addEventListener("change", () => {
  const option = selectedPackage.options[selectedPackage.selectedIndex];
  updateSelectedPackage(selectedPackage.value, option.dataset.price);
});

document.querySelectorAll(".choose-package").forEach((button) => {
  button.addEventListener("click", () => {
    updateSelectedPackage(button.dataset.package, button.dataset.price);
    document.querySelector("#start").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const isOpen = button.classList.toggle("open");
    answer.classList.toggle("open", isOpen);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

function getFormData() {
  const formData = new FormData(form);
  const packageName = formData.get("selectedPackage");
  const extras = formData.getAll("extras");

  return {
    selectedPackage: packageName,
    fixedPackagePrice: packages[packageName],
    desiredDomain: formData.get("desiredDomain").trim(),
    fullName: formData.get("fullName").trim(),
    businessName: formData.get("businessName").trim(),
    phone: formData.get("phone").trim(),
    email: formData.get("email").trim(),
    industry: formData.get("industry").trim(),
    ownsDomain: formData.get("ownsDomain"),
    domainRegistrar: formData.get("domainRegistrar"),
    dnsGuidance: formData.get("dnsGuidance"),
    hasHosting: formData.get("hasHosting"),
    hasLogo: formData.get("hasLogo"),
    hasPhotosText: formData.get("hasPhotosText"),
    preferredLanguage: formData.get("language"),
    optionalExtras: extras,
    notes: formData.get("notes").trim(),
    submittedAt: new Date().toISOString()
  };
}

function validateForm() {
  let valid = true;
  formError.textContent = "";
  form.querySelectorAll(".invalid").forEach((field) => field.classList.remove("invalid"));

  const requiredFields = form.querySelectorAll("[required]");
  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.classList.add("invalid");
      valid = false;
    }
  });

  const email = form.querySelector('[name="email"]');
  if (email.value && !/^\S+@\S+\.\S+$/.test(email.value)) {
    email.classList.add("invalid");
    valid = false;
  }

  if (!valid) {
    formError.textContent = "Please complete the required fields before submitting.";
  }

  return valid;
}

function saveToLocalStorage(request) {
  try {
    const existing = JSON.parse(localStorage.getItem("eviterniteProjectRequests") || "[]");
    const nextRequests = Array.isArray(existing) ? existing : [];
    const lastRequest = JSON.stringify(request);

    nextRequests.push(request);
    localStorage.setItem("eviterniteProjectRequests", JSON.stringify(nextRequests));
    localStorage.setItem("eviterniteLastProjectRequest", lastRequest);

    return localStorage.getItem("eviterniteLastProjectRequest") === lastRequest;
  } catch (error) {
    return false;
  }
}

function showSuccess(request, savedLocally) {
  successPanel.dataset.savedLocally = String(savedLocally);
  successMessage.textContent = `Your project request has been received. You selected ${request.selectedPackage} for ${request.fixedPackagePrice}. Eviternite will contact you with the next steps. Extra custom requests can be reviewed separately.`;

  const summary = [
    ["Selected package", request.selectedPackage],
    ["Fixed package price", request.fixedPackagePrice],
    ["Desired domain", request.desiredDomain],
    ["Domain ownership", request.ownsDomain],
    ["Domain registrar", request.domainRegistrar],
    ["DNS setup guidance", request.dnsGuidance],
    ["Business", request.businessName],
    ["Contact", `${request.fullName} - ${request.email}`],
    ["Preferred language", request.preferredLanguage],
    ["Optional extras", request.optionalExtras.length ? request.optionalExtras.join(", ") : "None selected"]
  ];

  summaryList.innerHTML = summary
    .map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`)
    .join("");

  successPanel.hidden = false;
  successPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateForm()) return;

  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  window.setTimeout(() => {
    const request = getFormData();

    // Future backend connection point:
    // Send `request` to a Supabase/API endpoint here, then trigger an email service
    // such as Resend to notify poqimedia@gmail.com.
    // This static local preview intentionally does not fake backend or payment behavior.

    const savedLocally = saveToLocalStorage(request);
    showSuccess(request, savedLocally);

    submitButton.disabled = false;
    submitButton.textContent = "Submit Project Request";
    form.reset();
    updateSelectedPackage("Business Website", "$799");
  }, 700);
});
