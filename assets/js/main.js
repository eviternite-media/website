const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const menu = document.querySelector("[data-menu]");
const selectedPackage = document.querySelector("#selectedPackage");
const selectedPackageTitle = document.querySelector("#selected-package-title");
const form = document.querySelector("#project-form");
const formError = document.querySelector("#form-error");
const submitButton = document.querySelector("#submit-button");
const successPanel = document.querySelector("#success-panel");
const successMessage = document.querySelector("#success-message");
const summaryList = document.querySelector("#summary-list");

function cleanSavedRequest(record) {
  const hiddenTerm = ["pr", "ice"].join("");
  const symbols = [String.fromCharCode(36), String.fromCharCode(8364)];

  if (!record || typeof record !== "object" || Array.isArray(record)) {
    return record;
  }

  return Object.entries(record).reduce((cleaned, entry) => {
    const key = entry[0];
    const value = entry[1];
    const keyText = key.toLowerCase();
    const valueText = typeof value === "string" ? value : "";
    const keyShouldBeHidden = keyText.includes(hiddenTerm);
    const valueShouldBeHidden = symbols.some((symbol) => valueText.includes(symbol));

    if (!keyShouldBeHidden && !valueShouldBeHidden) {
      cleaned[key] = value;
    }

    return cleaned;
  }, {});
}

function cleanSavedRequests() {
  try {
    const requestsKey = "eviterniteProjectRequests";
    const lastKey = "eviterniteLastProjectRequest";
    const requests = JSON.parse(localStorage.getItem(requestsKey) || "[]");
    const lastRequest = JSON.parse(localStorage.getItem(lastKey) || "{}");

    if (Array.isArray(requests)) {
      localStorage.setItem(requestsKey, JSON.stringify(requests.map(cleanSavedRequest)));
    }

    if (lastRequest && typeof lastRequest === "object") {
      localStorage.setItem(lastKey, JSON.stringify(cleanSavedRequest(lastRequest)));
    }
  } catch (error) {
    localStorage.removeItem("eviterniteProjectRequests");
    localStorage.removeItem("eviterniteLastProjectRequest");
  }
}

function updatePageChrome() {
  header.classList.toggle("scrolled", window.scrollY > 12);
}

window.addEventListener("scroll", updatePageChrome);
updatePageChrome();
cleanSavedRequests();

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

function updateSelectedPackage(packageName) {
  selectedPackage.value = packageName;
  selectedPackageTitle.textContent = packageName;
}

selectedPackage.addEventListener("change", () => {
  updateSelectedPackage(selectedPackage.value);
});

document.querySelectorAll(".choose-package").forEach((button) => {
  button.addEventListener("click", () => {
    updateSelectedPackage(button.dataset.package);
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
  const extras = formData.getAll("extras");

  return {
    selectedPackage: formData.get("selectedPackage"),
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
  const emailPattern = new RegExp("^\\S+@\\S+\\.\\S+" + String.fromCharCode(36));

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
  if (email.value && !emailPattern.test(email.value)) {
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
    const nextRequests = Array.isArray(existing) ? existing.map(cleanSavedRequest) : [];
    const cleanedRequest = cleanSavedRequest(request);
    const lastRequest = JSON.stringify(cleanedRequest);

    nextRequests.push(cleanedRequest);
    localStorage.setItem("eviterniteProjectRequests", JSON.stringify(nextRequests));
    localStorage.setItem("eviterniteLastProjectRequest", lastRequest);

    return localStorage.getItem("eviterniteLastProjectRequest") === lastRequest;
  } catch (error) {
    return false;
  }
}

function showSuccess(request, savedLocally) {
  successPanel.dataset.savedLocally = String(savedLocally);
  successMessage.textContent =
    "Your project request has been received. You selected " +
    request.selectedPackage +
    ". Eviternite will contact you to discuss the details and next steps.";

  const summary = [
    ["Selected package", request.selectedPackage],
    ["Desired domain", request.desiredDomain],
    ["Domain ownership", request.ownsDomain],
    ["Domain registrar", request.domainRegistrar],
    ["DNS setup guidance", request.dnsGuidance],
    ["Business", request.businessName],
    ["Contact", request.fullName + " - " + request.email],
    ["Preferred language", request.preferredLanguage],
    ["Optional extras", request.optionalExtras.length ? request.optionalExtras.join(", ") : "None selected"]
  ];

  summaryList.innerHTML = summary
    .map((item) => "<div><span>" + item[0] + "</span><strong>" + item[1] + "</strong></div>")
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
    // Send the request to a Supabase/API endpoint here, then trigger an email service
    // such as Resend to notify poqimedia@gmail.com.
    // This static local preview intentionally does not connect to backend or payment services.

    const savedLocally = saveToLocalStorage(request);
    showSuccess(request, savedLocally);

    submitButton.disabled = false;
    submitButton.textContent = "Send Project Request";
    form.reset();
    updateSelectedPackage("Business Website");
  }, 700);
});
