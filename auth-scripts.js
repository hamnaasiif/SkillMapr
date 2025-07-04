// Authentication Scripts for SkillMapr

const $ = window.jQuery // Declare the $ variable
const bootstrap = window.bootstrap // Declare the bootstrap variable

$(document).ready(() => {
  // Initialize authentication functionality
  initializeAuth()

  // Page-specific initialization
  const currentPage = getCurrentPage()

  switch (currentPage) {
    case "login":
      initializeLogin()
      break
    case "signup":
      initializeSignup()
      break
    case "forgot-password":
      initializeForgotPassword()
      break
  }
})

// Get current page
function getCurrentPage() {
  const path = window.location.pathname
  if (path.includes("login")) return "login"
  if (path.includes("signup")) return "signup"
  if (path.includes("forgot-password")) return "forgot-password"
  return "unknown"
}

// Initialize common authentication functionality
function initializeAuth() {
  // Password toggle functionality
  $(".toggle-password").on("click", function () {
    const input = $(this).siblings("input")
    const icon = $(this).find("i")

    if (input.attr("type") === "password") {
      input.attr("type", "text")
      icon.removeClass("fa-eye").addClass("fa-eye-slash")
    } else {
      input.attr("type", "password")
      icon.removeClass("fa-eye-slash").addClass("fa-eye")
    }
  })

  // Form validation styling
  $("input, select").on("blur", function () {
    validateField($(this))
  })

  // Real-time validation
  $("input").on("input", function () {
    const field = $(this)
    clearTimeout(field.data("timeout"))
    field.data(
      "timeout",
      setTimeout(() => {
        validateField(field)
      }, 500),
    )
  })

  // Social login handlers
  $("#googleLogin, #googleSignup").on("click", () => {
    handleSocialLogin("google")
  })

  $("#githubLogin, #githubSignup").on("click", () => {
    handleSocialLogin("github")
  })
}

// Initialize login page
function initializeLogin() {
  $("#loginForm").on("submit", (e) => {
    e.preventDefault()
    handleLogin()
  })

  // Remember me functionality
  loadRememberedCredentials()
}

// Initialize signup page
function initializeSignup() {
  $("#signupForm").on("submit", (e) => {
    e.preventDefault()
    handleSignup()
  })

  // Password strength checker
  $("#password").on("input", function () {
    checkPasswordStrength($(this).val())
  })

  // Confirm password validation
  $("#confirmPassword").on("input", () => {
    validatePasswordMatch()
  })
}

// Initialize forgot password page
function initializeForgotPassword() {
  $("#resetForm").on("submit", (e) => {
    e.preventDefault()
    handlePasswordReset()
  })

  // Resend functionality
  $("#resendBtn").on("click", function () {
    if (!$(this).prop("disabled")) {
      resendResetEmail()
    }
  })
}

// Handle login
function handleLogin() {
  const form = $("#loginForm")
  const email = $("#email").val()
  const password = $("#password").val()
  const rememberMe = $("#rememberMe").is(":checked")

  // Validate form
  if (!validateLoginForm()) {
    return
  }

  // Show loading state
  showButtonLoading("#loginBtn")

  // Simulate API call
  setTimeout(() => {
    // Hide loading state
    hideButtonLoading("#loginBtn")

    // Save credentials if remember me is checked
    if (rememberMe) {
      saveCredentials(email)
    }

    // Show success and redirect
    showSuccessModal("Welcome Back!", "You have successfully signed in to SkillMapr.", () => {
      // Redirect to dashboard
      window.location.href = "dashboard.html"
    })
  }, 2000)
}

// Handle signup
function handleSignup() {
  const form = $("#signupForm")

  // Validate form
  if (!validateSignupForm()) {
    return
  }

  // Show loading state
  showButtonLoading("#signupBtn")

  // Get form data
  const formData = {
    firstName: $("#firstName").val(),
    lastName: $("#lastName").val(),
    email: $("#email").val(),
    password: $("#password").val(),
    skillLevel: $("#skillLevel").val(),
    newsletter: $("#newsletter").is(":checked"),
  }

  // Simulate API call
  setTimeout(() => {
    // Hide loading state
    hideButtonLoading("#signupBtn")

    // Show success modal
    showSuccessModal(
      "Account Created!",
      "Welcome to SkillMapr! Please check your email to verify your account.",
      () => {
        // Redirect to login
        window.location.href = "login.html"
      },
    )
  }, 2500)
}

// Handle password reset
function handlePasswordReset() {
  const email = $("#resetEmail").val()

  // Validate email
  if (!validateEmail(email)) {
    showFieldError("#resetEmail", "Please enter a valid email address")
    return
  }

  // Show loading state
  showButtonLoading("#resetBtn")

  // Simulate API call
  setTimeout(() => {
    // Hide loading state
    hideButtonLoading("#resetBtn")

    // Show success step
    showResetSuccess(email)
  }, 1500)
}

// Show reset success step
function showResetSuccess(email) {
  $("#sentEmail").text(email)
  $("#resetStep").removeClass("active")
  $("#successStep").addClass("active")

  // Start countdown timer
  startResendCountdown()
}

// Start resend countdown
function startResendCountdown() {
  let countdown = 60
  const countdownElement = $("#countdown")
  const resendBtn = $("#resendBtn")
  const resendText = $(".resend-text")
  const resendReady = $(".resend-ready")

  const timer = setInterval(() => {
    countdown--
    countdownElement.text(countdown)

    if (countdown <= 0) {
      clearInterval(timer)
      resendBtn.prop("disabled", false)
      resendText.addClass("d-none")
      resendReady.removeClass("d-none")
    }
  }, 1000)
}

// Resend reset email
function resendResetEmail() {
  const email = $("#sentEmail").text()

  showButtonLoading("#resendBtn")

  setTimeout(() => {
    hideButtonLoading("#resendBtn")

    // Reset countdown
    $(".resend-text").removeClass("d-none")
    $(".resend-ready").addClass("d-none")
    $("#countdown").text("60")
    $("#resendBtn").prop("disabled", true)

    startResendCountdown()

    // Show toast notification
    showToast("Email Sent", "Reset instructions have been sent again.", "success")
  }, 1000)
}

// Handle social login
function handleSocialLogin(provider) {
  const providerName = provider.charAt(0).toUpperCase() + provider.slice(1)

  // Show loading state
  showToast("Redirecting", `Connecting to ${providerName}...`, "info")

  // Simulate OAuth redirect
  setTimeout(() => {
    showToast("Success", `Successfully connected with ${providerName}!`, "success")

    setTimeout(() => {
      window.location.href = "dashboard.html"
    }, 1500)
  }, 2000)
}

// Validation functions
function validateLoginForm() {
  let isValid = true

  const email = $("#email")
  const password = $("#password")

  if (!validateEmail(email.val())) {
    showFieldError(email, "Please enter a valid email address")
    isValid = false
  } else {
    showFieldSuccess(email)
  }

  if (password.val().length < 6) {
    showFieldError(password, "Password must be at least 6 characters")
    isValid = false
  } else {
    showFieldSuccess(password)
  }

  return isValid
}

function validateSignupForm() {
  let isValid = true

  // Validate all fields
  const fields = ["#firstName", "#lastName", "#email", "#password", "#confirmPassword", "#skillLevel"]

  fields.forEach((fieldId) => {
    const field = $(fieldId)
    if (!validateField(field)) {
      isValid = false
    }
  })

  // Check terms agreement
  if (!$("#agreeTerms").is(":checked")) {
    showFieldError("#agreeTerms", "You must agree to the terms and conditions")
    isValid = false
  }

  return isValid
}

function validateField(field) {
  const fieldId = field.attr("id")
  const value = field.val().trim()

  switch (fieldId) {
    case "firstName":
    case "lastName":
      if (value.length < 2) {
        showFieldError(field, "Name must be at least 2 characters")
        return false
      }
      break

    case "email":
    case "resetEmail":
      if (!validateEmail(value)) {
        showFieldError(field, "Please enter a valid email address")
        return false
      }
      break

    case "password":
      if (value.length < 8) {
        showFieldError(field, "Password must be at least 8 characters")
        return false
      }
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        showFieldError(field, "Password must contain uppercase, lowercase, and number")
        return false
      }
      break

    case "confirmPassword":
      if (value !== $("#password").val()) {
        showFieldError(field, "Passwords do not match")
        return false
      }
      break

    case "skillLevel":
      if (!value) {
        showFieldError(field, "Please select your experience level")
        return false
      }
      break
  }

  showFieldSuccess(field)
  return true
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validatePasswordMatch() {
  const password = $("#password").val()
  const confirmPassword = $("#confirmPassword").val()

  if (confirmPassword && password !== confirmPassword) {
    showFieldError("#confirmPassword", "Passwords do not match")
    return false
  } else if (confirmPassword) {
    showFieldSuccess("#confirmPassword")
    return true
  }
}

// Password strength checker
function checkPasswordStrength(password) {
  const strengthBar = $(".strength-fill")
  const strengthText = $(".strength-level")

  let strength = 0
  let strengthLabel = "Weak"

  // Length check
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++

  // Character variety checks
  if (/[a-z]/.test(password)) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++

  // Determine strength level
  if (strength <= 2) {
    strengthLabel = "Weak"
    strengthBar.removeClass().addClass("strength-fill weak")
  } else if (strength <= 3) {
    strengthLabel = "Fair"
    strengthBar.removeClass().addClass("strength-fill fair")
  } else if (strength <= 4) {
    strengthLabel = "Good"
    strengthBar.removeClass().addClass("strength-fill good")
  } else {
    strengthLabel = "Strong"
    strengthBar.removeClass().addClass("strength-fill strong")
  }

  strengthText.text(strengthLabel)
}

// UI Helper functions
function showFieldError(field, message) {
  const fieldElement = $(field)
  fieldElement.addClass("is-invalid").removeClass("is-valid")
  fieldElement.siblings(".invalid-feedback").text(message)
}

function showFieldSuccess(field) {
  const fieldElement = $(field)
  fieldElement.addClass("is-valid").removeClass("is-invalid")
}

function showButtonLoading(buttonSelector) {
  const button = $(buttonSelector)
  button.prop("disabled", true)
  button.find(".btn-text").addClass("d-none")
  button.find(".btn-spinner").removeClass("d-none")
}

function hideButtonLoading(buttonSelector) {
  const button = $(buttonSelector)
  button.prop("disabled", false)
  button.find(".btn-text").removeClass("d-none")
  button.find(".btn-spinner").addClass("d-none")
}

function showSuccessModal(title, message, callback) {
  const modal = $("#successModal")
  modal.find(".modal-title").text(title)
  modal.find("p").text(message)

  modal.modal("show")

  modal
    .find(".btn")
    .off("click")
    .on("click", () => {
      modal.modal("hide")
      if (callback) callback()
    })
}

function showToast(title, message, type = "info") {
  // Create toast element
  const toastId = "toast-" + Date.now()
  const iconClass = {
    success: "fa-check-circle text-success",
    error: "fa-exclamation-circle text-danger",
    warning: "fa-exclamation-triangle text-warning",
    info: "fa-info-circle text-info",
  }[type]

  const toastHtml = `
        <div id="${toastId}" class="toast align-items-center border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body d-flex align-items-center">
                    <i class="fas ${iconClass} me-2"></i>
                    <div>
                        <strong>${title}</strong><br>
                        <small>${message}</small>
                    </div>
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `

  // Add to page
  if (!$("#toastContainer").length) {
    $("body").append(
      '<div id="toastContainer" class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 9999;"></div>',
    )
  }

  $("#toastContainer").append(toastHtml)

  // Show toast
  const toast = new bootstrap.Toast(document.getElementById(toastId))
  toast.show()

  // Remove after hiding
  $(`#${toastId}`).on("hidden.bs.toast", function () {
    $(this).remove()
  })
}

// Remember me functionality
function saveCredentials(email) {
  localStorage.setItem("rememberedEmail", email)
}

function loadRememberedCredentials() {
  const rememberedEmail = localStorage.getItem("rememberedEmail")
  if (rememberedEmail) {
    $("#email").val(rememberedEmail)
    $("#rememberMe").prop("checked", true)
  }
}

// Keyboard shortcuts
$(document).on("keydown", (e) => {
  // Enter key on forms
  if (e.key === "Enter" && !e.shiftKey) {
    const activeForm = $("form:visible")
    if (activeForm.length) {
      e.preventDefault()
      activeForm.submit()
    }
  }

  // Escape key to close modals
  if (e.key === "Escape") {
    $(".modal.show").modal("hide")
  }
})

// Auto-focus first input
$(window).on("load", () => {
  setTimeout(() => {
    $("input:visible:first").focus()
  }, 500)
})

// Form auto-save (for longer forms)
function autoSaveForm() {
  const formData = {}
  $("#signupForm input, #signupForm select").each(function () {
    if ($(this).attr("type") !== "password") {
      formData[$(this).attr("name")] = $(this).val()
    }
  })

  localStorage.setItem("signupFormData", JSON.stringify(formData))
}

// Load auto-saved form data
function loadAutoSavedData() {
  const savedData = localStorage.getItem("signupFormData")
  if (savedData) {
    const formData = JSON.parse(savedData)
    Object.keys(formData).forEach((key) => {
      $(`[name="${key}"]`).val(formData[key])
    })
  }
}

// Clear auto-saved data on successful submission
function clearAutoSavedData() {
  localStorage.removeItem("signupFormData")
}

// Initialize auto-save for signup form
if (getCurrentPage() === "signup") {
  loadAutoSavedData()

  $("#signupForm input, #signupForm select").on("change input", () => {
    clearTimeout(window.autoSaveTimeout)
    window.autoSaveTimeout = setTimeout(autoSaveForm, 1000)
  })
}

// Analytics tracking (placeholder)
function trackEvent(eventName, properties = {}) {
  // This would integrate with your analytics service (Google Analytics, Mixpanel, etc.)
  console.log("Analytics Event:", eventName, properties)

  // Example: Track form submissions, button clicks, errors, etc.
  if (window.gtag) {
    window.gtag("event", eventName, properties)
  }
}

// Track page views
function trackPageView(pageName) {
  trackEvent("page_view", {
    page_name: pageName,
    page_url: window.location.href,
  })
}

// Track authentication events
function trackAuthEvent(action, method = "email") {
  trackEvent("auth_action", {
    action: action, // 'login', 'signup', 'forgot_password'
    method: method, // 'email', 'google', 'github'
  })
}

// Initialize page tracking
$(document).ready(() => {
  const currentPage = getCurrentPage()
  trackPageView(currentPage)
})

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)

  // Track errors for debugging
  trackEvent("javascript_error", {
    message: e.message,
    filename: e.filename,
    line: e.lineno,
    page: getCurrentPage(),
  })
})

// Network error handling
function handleNetworkError(error) {
  console.error("Network Error:", error)

  showToast("Connection Error", "Please check your internet connection and try again.", "error")

  trackEvent("network_error", {
    error: error.message,
    page: getCurrentPage(),
  })
}

// Form submission error handling
function handleFormError(formId, error) {
  console.error(`Form Error (${formId}):`, error)

  showToast("Submission Error", "Something went wrong. Please try again.", "error")

  trackEvent("form_error", {
    form_id: formId,
    error: error.message,
  })
}

// Accessibility enhancements
function enhanceAccessibility() {
  // Add ARIA labels to form controls
  $('input[type="password"]').attr("aria-describedby", "password-help")
  $('input[type="email"]').attr("aria-describedby", "email-help")

  // Add keyboard navigation for custom elements
  $(".social-btn")
    .attr("tabindex", "0")
    .on("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        $(this).click()
      }
    })

  // Announce form validation errors to screen readers
  $(".invalid-feedback").attr("role", "alert").attr("aria-live", "polite")

  // Focus management for modals
  $("#successModal").on("shown.bs.modal", function () {
    $(this).find(".btn").focus()
  })
}

// Initialize accessibility enhancements
$(document).ready(() => {
  enhanceAccessibility()
})

// Performance monitoring
function measurePerformance() {
  if ("performance" in window) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType("navigation")[0]

        trackEvent("page_performance", {
          load_time: perfData.loadEventEnd - perfData.loadEventStart,
          dom_ready: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          page: getCurrentPage(),
        })
      }, 0)
    })
  }
}

// Initialize performance monitoring
measurePerformance()

// Service Worker registration (for PWA functionality)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful")
      })
      .catch((err) => {
        console.log("ServiceWorker registration failed: ", err)
      })
  })
}

// Offline detection
function handleOfflineStatus() {
  function updateOnlineStatus() {
    if (navigator.onLine) {
      showToast("Back Online", "Your connection has been restored.", "success")
    } else {
      showToast("Offline", "You are currently offline. Some features may not work.", "warning")
    }
  }

  window.addEventListener("online", updateOnlineStatus)
  window.addEventListener("offline", updateOnlineStatus)
}

// Initialize offline detection
handleOfflineStatus()

// Console welcome message
console.log(`
🎯 SkillMapr Authentication System

Built with ❤️ using:
- Bootstrap 5
- jQuery 3.6
- Font Awesome 6
- Custom CSS & JS

Features:
✅ Responsive Design
✅ Form Validation
✅ Password Strength
✅ Social Login
✅ Remember Me
✅ Accessibility
✅ Error Handling
✅ Auto-save

Happy Learning! 🚀
`)
