# SkillMapr

SkillMapr is a modern, visual learning assistant that helps users build custom skill development roadmaps with ease. Whether you're diving into Web Development, Digital Art, or even Pashto Calligraphy, SkillMapr adapts to your goals with intuitive design and clear structure.

> This repository currently includes the frontend-only prototype: landing page, login, signup, and forgot password pages.

---

## Live Preview

View the live demo on GitHub Pages:  
[https://hamnaasiif.github.io/SkillMapr](https://hamnaasiif.github.io/SkillMapr)

---

## Features

- Visual learning structure for skill progression  
- Modular design built for future dashboard integration  
- Clean and responsive layout using Bootstrap  
- Separate authentication pages for login, signup, and password recovery  

---

## UI Overview

### Landing Page (`index.html`)

- **Navbar**: A fixed-top dark navbar with links to "About", "Explore Skills", and GitHub. A "Start Roadmap" button leads users to the signup page.
- **Hero Section**: Split layout with a bold headline on the left and an animated strip interface on the right showcasing trending skills like Graphic Design and Branding.
- **Features Section**: Three highlighted cards displaying Skill Search, Drag & Drop Roadmap, and Export options.
- **How It Works**: A visual 3-step guide – Choose a skill → Arrange modules → Track progress.
- **Popular Roadmaps**: Cards for trending paths like Frontend Developer, Digital Illustrator, and AI Fundamentals.
- **Customization Section**: Interactive demo area where users can drag modules, switch theme colors, and simulate customization.
- **Newsletter Section**: Email signup form for staying updated.
- **Footer**: Includes brand description, quick links, resources, legal info, and social icons.

### Authentication Pages

- **Signup Page**: Clean form with fields for user name, email, and password.
- **Login Page**: Standard email/password form with a link to reset password.
- **Forgot Password Page**: Simple email input to initiate password reset.

Each page is responsive, mobile-friendly, and styled consistently using Bootstrap 5.

---

## Folder Structure

skillmapr/
├── index.html # Landing Page
├── signup.html # User Signup Page
├── login.html # User Login Page
├── forgot-password.html # Reset Password Page
├── style.css # General Styles
├── script.js # Landing Page JavaScript
├── auth-scripts.js # JS for auth forms
├── auth-styles.css # Auth page specific styles
├── images/
│ └── take-what-you-need.png
└── README.md

---

## Tech Stack

- HTML5, CSS3, JavaScript  
- Bootstrap 5 for responsive design  

---

## Getting Started

1. Clone this repository:

git clone https://github.com/hamnaasiif/SkillMapr.git
cd SkillMapr

2. Open index.html in your browser to view the landing page.

No build steps are required since this is a static frontend.

---

## Roadmap

- Implement user dashboard and roadmap editor
- Add drag-and-drop module placement
- Integrate progress tracking system
- Connect to backend for user data persistence
- Add AI-powered learning suggestions

---

## License

This project is for demonstration and educational purposes only.
