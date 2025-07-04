// SkillMapr Landing Page JavaScript

const $ = window.$ // Declare the $ variable
const AOS = window.AOS // Declare the AOS variable

$(document).ready(() => {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  })

  // Navbar scroll effect
  $(window).scroll(() => {
    if ($(window).scrollTop() > 50) {
      $(".navbar").addClass("navbar-scrolled")
    } else {
      $(".navbar").removeClass("navbar-scrolled")
    }
  })

  // Smooth scrolling for navigation links
  $('a[href^="#"]').on("click", function (event) {
    var target = $(this.getAttribute("href"))
    if (target.length) {
      event.preventDefault()
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 80,
          },
          1000,
        )
    }
  })

  // Strip buttons interaction
  $(".strip-btn").on("click", function () {
    const skill = $(this).data("skill")

    // Add loading state
    $(this).addClass("btn-loading")

    // Simulate loading
    setTimeout(() => {
      $(this).removeClass("btn-loading")
      alert(`🚀 Loading roadmap for ${skill}!\n\nThis will redirect you to the ${skill} learning path.`)
    }, 1000)
  })

  // Strip buttons hover effect
  $(".strip-btn")
    .on("mouseenter", function () {
      $(this).css("transform", $(this).css("transform") + " scale(1.05)")
    })
    .on("mouseleave", function () {
      $(this).css("transform", $(this).css("transform").replace(" scale(1.05)", ""))
    })

  // Start Now button interaction
  $(".start-now-btn").on("click", function () {
    $(this).addClass("btn-loading")

    setTimeout(() => {
      $(this).removeClass("btn-loading")
      alert("🎯 Welcome to SkillMapr!\n\nYou will be redirected to the skill selection page.")
    }, 1200)
  })

  // Start Roadmap button in navbar
  $("#startRoadmapBtn").on("click", () => {
    alert("🗺️ Starting your roadmap journey!\n\nRedirecting to roadmap builder...")
  })

  // Navigation menu interactions
  $(".nav-link").on("click", function (e) {
    const href = $(this).attr("href")

    if (href === "#about") {
      e.preventDefault()
      alert("📖 About SkillMapr\n\nLearn more about our mission to revolutionize skill development.")
    } else if (href === "#explore") {
      e.preventDefault()
      alert("🔍 Explore Skills\n\nBrowse our comprehensive skill library.")
    } else if (href === "#github") {
      e.preventDefault()
      alert("💻 GitHub Repository\n\nCheck out our open-source code!")
    }
  })

  // Feature cards hover animation
  $(".feature-card")
    .on("mouseenter", function () {
      $(this).find("i").addClass("fa-bounce")
    })
    .on("mouseleave", function () {
      $(this).find("i").removeClass("fa-bounce")
    })

  // Popular Roadmaps interaction
  $(".roadmap-card").on("click", function () {
    const roadmap = $(this).data("roadmap")
    const title = $(this).find(".roadmap-title").text()

    // Add loading effect
    $(this).addClass("loading")

    setTimeout(() => {
      $(this).removeClass("loading")
      alert(
        `🎯 Starting ${title} roadmap!\n\nYou will be redirected to the detailed roadmap with all modules and learning materials.`,
      )
    }, 800)
  })

  // Roadmap buttons interaction
  $(".btn-roadmap").on("click", function (e) {
    e.stopPropagation() // Prevent card click
    const roadmapCard = $(this).closest(".roadmap-card")
    const roadmap = roadmapCard.data("roadmap")
    const title = roadmapCard.find(".roadmap-title").text()

    // Add loading state
    $(this).addClass("btn-loading")

    setTimeout(() => {
      $(this).removeClass("btn-loading")
      alert(`🚀 Welcome to ${title}!\n\nRedirecting to your personalized learning dashboard...`)
    }, 1000)
  })

  // View All Roadmaps button
  $(".view-all-btn").on("click", function () {
    $(this).addClass("btn-loading")

    setTimeout(() => {
      $(this).removeClass("btn-loading")
      alert(
        "🗺️ Explore All Roadmaps!\n\nBrowse our complete collection of skill roadmaps and find your perfect learning path.",
      )
    }, 800)
  })

  // Customize button interaction
  $(".customize-btn").on("click", function () {
    $(this).addClass("btn-loading")

    setTimeout(() => {
      $(this).removeClass("btn-loading")
      alert(
        "🎨 Welcome to the Customization Studio!\n\nStart personalizing your roadmap design with themes, layouts, and more.",
      )
    }, 1000)
  })

  // Module drag simulation
  $(".module-item").on("mousedown", function () {
    $(this).addClass("dragging")

    // Simulate drag effect
    setTimeout(() => {
      $(this).removeClass("dragging")
    }, 200)
  })

  // Color picker interaction
  $(".color-option").on("click", function () {
    const color = $(this).data("color")

    // Remove active class from all options
    $(".color-option").removeClass("active")

    // Add active class to clicked option
    $(this).addClass("active")

    // Change theme
    $(".demo-background").removeClass("theme-red theme-blue theme-green theme-purple")
    $(".demo-background").addClass(`theme-${color}`)

    // Show feedback
    const colorNames = {
      red: "Crimson Red",
      blue: "Ocean Blue",
      green: "Forest Green",
      purple: "Royal Purple",
    }

    // Animate color change
    $(".module-item").each(function (index) {
      setTimeout(() => {
        $(this).addClass("color-changing")
        setTimeout(() => {
          $(this).removeClass("color-changing")
        }, 300)
      }, index * 100)
    })

    setTimeout(() => {
      alert(`🎨 Theme changed to ${colorNames[color]}!\n\nYour roadmap now uses the ${colorNames[color]} color scheme.`)
    }, 500)
  })

  // Module hover effects with sound simulation
  $(".module-item").on("mouseenter", function () {
    const moduleLabel = $(this).find(".module-label").text()

    // Add subtle shake effect
    $(this).addClass("module-hover")

    setTimeout(() => {
      $(this).removeClass("module-hover")
    }, 300)
  })

  // Feature item enhanced interactions
  $(".feature-item").on("click", function () {
    const featureTitle = $(this).find("h5").text()
    const featureDesc = $(this).find("p").text()

    $(this).addClass("feature-clicked")

    setTimeout(() => {
      $(this).removeClass("feature-clicked")
      alert(`✨ ${featureTitle}\n\n${featureDesc}\n\nClick "Start Customizing" to explore this feature!`)
    }, 200)
  })

  // Keyboard navigation
  $(document).on("keydown", (e) => {
    // Press 'S' to start
    if (e.key.toLowerCase() === "s" && !$(e.target).is("input, textarea")) {
      $(".start-now-btn").click()
    }

    // Press 'R' for roadmap
    if (e.key.toLowerCase() === "r" && !$(e.target).is("input, textarea")) {
      $("#startRoadmapBtn").click()
    }

    // Press 'V' to view all roadmaps
    if (e.key.toLowerCase() === "v" && !$(e.target).is("input, textarea")) {
      $(".view-all-btn").click()
    }

    // Press 'C' to customize
    if (e.key.toLowerCase() === "c" && !$(e.target).is("input, textarea")) {
      $(".customize-btn").click()
    }

    // Press number keys (1-4) to change colors
    if (["1", "2", "3", "4"].includes(e.key) && !$(e.target).is("input, textarea")) {
      const colors = ["red", "blue", "green", "purple"]
      const colorIndex = Number.parseInt(e.key) - 1
      if (colors[colorIndex]) {
        $(`.color-option[data-color="${colors[colorIndex]}"]`).click()
      }
    }
  })

  // Dynamic skill strip generation (for demo purposes)
  function addRandomSkill() {
    const skills = [
      "UI/UX Design",
      "Data Science",
      "Machine Learning",
      "Photography",
      "Video Editing",
      "Social Media",
      "SEO",
      "Content Writing",
      "Project Management",
      "Public Speaking",
    ]

    const randomSkill = skills[Math.floor(Math.random() * skills.length)]
    const newStrip = $(`<button class="strip-btn" data-skill="${randomSkill}">${randomSkill.toUpperCase()}</button>`)

    // Add event listeners to new strip
    newStrip.on("click", function () {
      const skill = $(this).data("skill")
      alert(`🚀 Loading roadmap for ${skill}!`)
    })

    $(".strips-container").append(newStrip)
  }

  // Easter egg: Double click on logo to add random skill
  $(".navbar-brand").on("dblclick", () => {
    addRandomSkill()
    alert("🎉 New skill added to the strip!")
  })

  // Responsive menu handling
  $(".navbar-toggler").on("click", () => {
    setTimeout(() => {
      if ($(".navbar-collapse").hasClass("show")) {
        $("body").addClass("menu-open")
      } else {
        $("body").removeClass("menu-open")
      }
    }, 100)
  })

  // Close mobile menu when clicking outside
  $(document).on("click", (e) => {
    if (!$(e.target).closest(".navbar").length) {
      $(".navbar-collapse").removeClass("show")
      $("body").removeClass("menu-open")
    }
  })

  // Console welcome message
  console.log(`
    🎯 Welcome to SkillMapr!
    
    Built with ❤️ by Hamna Asif
    
    Keyboard shortcuts:
    - Press 'S' to start
    - Press 'R' for roadmap
    - Press 'V' to view all roadmaps
    - Press 'C' to customize
    - Press 1-4 to change colors
    - Double-click logo for easter egg
    
    Happy learning! 🚀
    `)

  // Drag and Drop Functionality for Modules
  let draggedElement = null
  let draggedIndex = null

  // Add drag and drop event listeners
  function initializeDragAndDrop() {
    const modules = document.querySelectorAll('.module-item[draggable="true"]')
    const container = document.getElementById("sortable-modules")

    modules.forEach((module, index) => {
      // Drag start
      module.addEventListener("dragstart", (e) => {
        draggedElement = module
        draggedIndex = index
        module.classList.add("dragging")
        e.dataTransfer.effectAllowed = "move"
        e.dataTransfer.setData("text/html", module.outerHTML)
      })

      // Drag end
      module.addEventListener("dragend", (e) => {
        module.classList.remove("dragging")
        container.classList.remove("drag-over")
        // Remove all drop targets
        modules.forEach((m) => m.classList.remove("drop-target"))
      })

      // Drag over
      module.addEventListener("dragover", (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = "move"

        // Remove previous drop targets
        modules.forEach((m) => m.classList.remove("drop-target"))

        // Add drop target indicator
        if (module !== draggedElement) {
          module.classList.add("drop-target")
        }
      })

      // Drag enter
      module.addEventListener("dragenter", (e) => {
        e.preventDefault()
        container.classList.add("drag-over")
      })

      // Drag leave
      module.addEventListener("dragleave", (e) => {
        // Only remove if we're leaving the container entirely
        if (!container.contains(e.relatedTarget)) {
          container.classList.remove("drag-over")
          module.classList.remove("drop-target")
        }
      })

      // Drop
      module.addEventListener("drop", (e) => {
        e.preventDefault()

        if (module !== draggedElement) {
          const allModules = Array.from(container.children)
          const draggedIdx = allModules.indexOf(draggedElement)
          const targetIdx = allModules.indexOf(module)

          // Reorder the modules
          if (draggedIdx < targetIdx) {
            container.insertBefore(draggedElement, module.nextSibling)
          } else {
            container.insertBefore(draggedElement, module)
          }

          // Show success message
          setTimeout(() => {
            alert("🎯 Module reordered successfully!\n\nYour roadmap layout has been updated.")
          }, 200)
        }

        // Clean up
        container.classList.remove("drag-over")
        modules.forEach((m) => m.classList.remove("drop-target"))
      })
    })

    // Container drag over
    container.addEventListener("dragover", (e) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = "move"
    })

    // Container drop (for dropping at the end)
    container.addEventListener("drop", (e) => {
      e.preventDefault()

      // If dropping in empty space, append to end
      const rect = container.getBoundingClientRect()
      const afterElement = getDragAfterElement(container, e.clientY)

      if (afterElement == null) {
        container.appendChild(draggedElement)
      } else {
        container.insertBefore(draggedElement, afterElement)
      }

      container.classList.remove("drag-over")
    })
  }

  // Helper function to determine drop position
  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".module-item:not(.dragging)")]

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child }
        } else {
          return closest
        }
      },
      { offset: Number.NEGATIVE_INFINITY },
    ).element
  }

  // Initialize drag and drop functionality
  initializeDragAndDrop()

  // Enhanced module interactions with drag feedback
  $(".module-item").on("mousedown", function (e) {
    // Only add dragging class if not already dragging
    if (!$(this).hasClass("dragging")) {
      $(this).addClass("drag-ready")

      setTimeout(() => {
        $(this).removeClass("drag-ready")
      }, 200)
    }
  })

  // Touch support for mobile drag and drop
  let touchItem = null
  const touchOffset = { x: 0, y: 0 }

  $(".module-item").on("touchstart", function (e) {
    touchItem = this
    const touch = e.originalEvent.touches[0]
    const rect = this.getBoundingClientRect()
    touchOffset.x = touch.clientX - rect.left
    touchOffset.y = touch.clientY - rect.top

    $(this).addClass("touch-dragging")
  })

  $(document).on("touchmove", (e) => {
    if (touchItem) {
      e.preventDefault()
      const touch = e.originalEvent.touches[0]

      $(touchItem).css({
        position: "fixed",
        left: touch.clientX - touchOffset.x + "px",
        top: touch.clientY - touchOffset.y + "px",
        zIndex: 1000,
        pointerEvents: "none",
      })
    }
  })

  $(document).on("touchend", (e) => {
    if (touchItem) {
      const touch = e.originalEvent.changedTouches[0]
      const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY)
      const targetModule = $(elementBelow).closest(".module-item")[0]

      if (targetModule && targetModule !== touchItem) {
        const container = document.getElementById("sortable-modules")
        const allModules = Array.from(container.children)
        const draggedIdx = allModules.indexOf(touchItem)
        const targetIdx = allModules.indexOf(targetModule)

        if (draggedIdx < targetIdx) {
          container.insertBefore(touchItem, targetModule.nextSibling)
        } else {
          container.insertBefore(touchItem, targetModule)
        }

        alert("📱 Module reordered on mobile!\n\nYour roadmap layout has been updated.")
      }

      // Reset styles
      $(touchItem)
        .css({
          position: "",
          left: "",
          top: "",
          zIndex: "",
          pointerEvents: "",
        })
        .removeClass("touch-dragging")

      touchItem = null
    }
  })

  // Newsletter form submission
  $("#newsletterForm").on("submit", function (e) {
    e.preventDefault()

    const email = $(this).find(".newsletter-input").val()
    const submitBtn = $(this).find(".newsletter-btn")

    // Add loading state
    submitBtn.addClass("btn-loading")

    // Simulate API call
    setTimeout(() => {
      submitBtn.removeClass("btn-loading")

      // Show success message
      alert(
        `🎉 Thank you for subscribing!\n\nWe've added ${email} to our newsletter list. You'll receive the latest roadmaps and learning tips soon!`,
      )

      // Reset form
      $(this)[0].reset()
    }, 1500)
  })

  // Footer links interactions
  $(".footer-links a").on("click", function (e) {
    e.preventDefault()
    const linkText = $(this).text()
    alert(`🔗 ${linkText}\n\nThis would redirect you to the ${linkText} page.`)
  })

  // Social links interactions
  $(".social-link").on("click", function (e) {
    e.preventDefault()
    const platform = $(this).attr("aria-label")
    alert(`🌐 Follow us on ${platform}!\n\nThis would open our ${platform} profile.`)
  })

  // Footer bottom links
  $(".footer-bottom-links a").on("click", function (e) {
    e.preventDefault()
    const linkText = $(this).text()
    alert(`📄 ${linkText}\n\nThis would show the ${linkText} page.`)
  })

  // Enhanced newsletter input focus effects
  $(".newsletter-input")
    .on("focus", function () {
      $(this).closest(".input-group").addClass("input-focused")
    })
    .on("blur", function () {
      $(this).closest(".input-group").removeClass("input-focused")
    })

  // Email validation
  $(".newsletter-input").on("input", function () {
    const email = $(this).val()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const submitBtn = $(this).closest("form").find(".newsletter-btn")

    if (emailRegex.test(email)) {
      $(this).removeClass("invalid").addClass("valid")
      submitBtn.prop("disabled", false)
    } else {
      $(this).removeClass("valid").addClass("invalid")
      submitBtn.prop("disabled", email.length > 0)
    }
  })
})

// Additional utility functions
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    start += increment
    element.textContent = Math.floor(start)

    if (start >= target) {
      element.textContent = target
      clearInterval(timer)
    }
  }, 16)
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".feature-card, .step-item, .roadmap-card, .module-item, .feature-item").forEach((el) => {
  observer.observe(el)
})
