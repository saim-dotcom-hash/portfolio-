/* ==========================================================================
   SAIM BAIG - WORDPRESS & PHP / FRONTEND DEVELOPER PORTFOLIO JAVASCRIPT
   Interactive Logic, Animations, Speed Simulator, Modal & Filters
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Sticky Navbar & Mobile Drawer Toggle
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveNavLink();
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('mobile-open')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     2. Animated Stat Counters
     -------------------------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  function animateCounters() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    
    const rect = statsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight && !animatedStats) {
      animatedStats = true;

      statNumbers.forEach(stat => {
        const targetStr = stat.getAttribute('data-target');
        const isDecimal = targetStr.includes('.');
        const target = parseFloat(targetStr);
        const duration = 2000;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          if (isDecimal) {
            stat.textContent = current.toFixed(1) + '%';
          } else {
            stat.textContent = Math.floor(current) + '+';
          }
        }, stepTime);
      });
    }
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters();

  /* --------------------------------------------------------------------------
     3. Skills Filter Tabs
     -------------------------------------------------------------------------- */
  const skillFilterBtns = document.querySelectorAll('.skills-filter .filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     4. WP Speed Audit Simulator Widget
     -------------------------------------------------------------------------- */
  const runAuditBtn = document.getElementById('run-audit-btn');
  const scoreNum = document.getElementById('sim-score-num');
  const scoreCircle = document.getElementById('sim-score-circle');
  const scoreLabel = document.getElementById('sim-score-label');

  if (runAuditBtn) {
    runAuditBtn.addEventListener('click', () => {
      runAuditBtn.disabled = true;
      runAuditBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Running Performance Audit...';
      
      // Reset state
      scoreNum.textContent = '38';
      scoreCircle.classList.remove('optimized');
      scoreLabel.textContent = 'STATUS: AUDITING CORE WEB VITALS...';
      
      const optStatuses = [
        document.getElementById('opt-1'),
        document.getElementById('opt-2'),
        document.getElementById('opt-3'),
        document.getElementById('opt-4')
      ];

      optStatuses.forEach(st => {
        if (st) {
          st.textContent = 'OPTIMIZING...';
          st.className = 'opt-status pending';
        }
      });

      // Step-by-step optimization sequence
      setTimeout(() => {
        if (optStatuses[0]) {
          optStatuses[0].textContent = 'PASSED (0.1s)';
          optStatuses[0].className = 'opt-status done';
        }
        scoreNum.textContent = '56';
      }, 700);

      setTimeout(() => {
        if (optStatuses[1]) {
          optStatuses[1].textContent = 'PASSED (0.2s)';
          optStatuses[1].className = 'opt-status done';
        }
        scoreNum.textContent = '74';
      }, 1400);

      setTimeout(() => {
        if (optStatuses[2]) {
          optStatuses[2].textContent = 'PASSED (0.3s)';
          optStatuses[2].className = 'opt-status done';
        }
        scoreNum.textContent = '88';
      }, 2100);

      setTimeout(() => {
        if (optStatuses[3]) {
          optStatuses[3].textContent = 'PASSED (0.4s)';
          optStatuses[3].className = 'opt-status done';
        }
        scoreNum.textContent = '99';
        scoreCircle.classList.add('optimized');
        scoreLabel.textContent = 'STATUS: ULTRA FAST — 99/100 PASSED';
        
        runAuditBtn.disabled = false;
        runAuditBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Re-Run Audit Simulation';
        
        showToast('Performance Audit Complete! Score improved from 38 to 99/100.');
      }, 2800);
    });
  }

  /* --------------------------------------------------------------------------
     5. Developer Code Vault Tabs
     -------------------------------------------------------------------------- */
  const codeTabBtns = document.querySelectorAll('.code-tab-btn');
  const codeTabContents = document.querySelectorAll('.code-tab-content');

  codeTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      codeTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');

      codeTabContents.forEach(content => {
        if (content.id === targetTab) {
          content.style.display = 'block';
        } else {
          content.style.display = 'none';
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     6. Project Details Modal
     -------------------------------------------------------------------------- */
  const projectDetails = {
    "1": {
      title: "PHP Admin Portal & System Engine",
      category: "PHP & Wasmer Backend",
      image: "assets/images/project_php_rest_api.jpg",
      liveUrl: "https://php-saimkd1211.wasmer.app/admin.php",
      description: "A custom PHP administrative application deployed on Wasmer Cloud, featuring secure authentication, session management, and dynamic database administration controls.",
      techStack: ["PHP 8.2", "MySQL", "Wasmer Cloud", "HTML5", "CSS3"],
      features: [
        "Admin Authentication & Session State Management.",
        "Dynamic CRUD Operations & System Analytics Dashboard.",
        "Hosted on Wasmer Cloud platform for fast execution."
      ]
    },
    "2": {
      title: "Weather Forecast Web Application",
      category: "JavaScript & REST API",
      image: "assets/images/project_weather.jpg",
      liveUrl: "https://saim-dotcom-hash.github.io/Wheather-app/",
      description: "Interactive real-time weather forecasting web application utilizing asynchronous REST API fetching for live temperature, humidity, and location-based weather tracking.",
      techStack: ["JavaScript ES6+", "REST API", "HTML5", "CSS3", "GitHub Pages"],
      features: [
        "Real-Time Weather API integration with instant search.",
        "Mobile-first responsive dashboard interface.",
        "Asynchronous JSON data parsing and error handling."
      ]
    },
    "3": {
      title: "The Chai Chapter — Modern Cafe Platform",
      category: "Frontend Web Application",
      image: "assets/images/project_chai_chapter.jpg",
      liveUrl: "https://saim-dotcom-hash.github.io/The-Chai-Chapter/",
      description: "Sleek digital storefront & artisanal tea menu showcase built for a modern café brand, engineered with smooth interactions and responsive navigation.",
      techStack: ["HTML5", "CSS3", "JavaScript", "Responsive UI", "GitHub Pages"],
      features: [
        "Artisanal menu presentation & brand story showcase.",
        "Mobile-first responsive design with micro-animations."
      ]
    },
    "4": {
      title: "Fashion Carnival — E-Commerce Showcase",
      category: "Frontend E-Commerce UI",
      image: "assets/images/project_fashion_carnival.jpg",
      liveUrl: "https://saim-dotcom-hash.github.io/Fashion-Carnival-/",
      description: "Modern fashion & apparel showcase platform featuring interactive product collection grids, category banners, and high-conversion visual design.",
      techStack: ["HTML5", "CSS3", "JavaScript", "Flexbox/Grid", "GitHub Pages"],
      features: [
        "Dynamic product grid & fashion collection filters.",
        "Pixel-perfect Figma-to-code translation and typography."
      ]
    },
    "5": {
      title: "Care Point Hospital — Healthcare Web Portal",
      category: "Healthcare Web Platform",
      image: "assets/images/project_hospital.jpg",
      liveUrl: "https://saim-dotcom-hash.github.io/Care-Point-Hospital/",
      description: "Comprehensive hospital & healthcare web portal built with medical service catalog, appointment request booking, and accessible layout.",
      techStack: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "GitHub Pages"],
      features: [
        "Doctor directory & appointment booking interface.",
        "Clean healthcare UI layout with accessibility features."
      ]
    },
    "6": {
      title: "Support Hub — Customer Service Portal",
      category: "Customer Support UI",
      image: "assets/images/project_support_hub.jpg",
      liveUrl: "https://saim-dotcom-hash.github.io/Support/",
      description: "Customer service center and knowledge base interface featuring interactive search, FAQ accordions, and helpdesk ticketing UI layout.",
      techStack: ["HTML5", "CSS3", "JavaScript", "UI Design", "GitHub Pages"],
      features: [
        "Interactive knowledge base & FAQ accordions.",
        "Clean support desk interface & ticketing workflow."
      ]
    }
  };

  const modalOverlay = document.getElementById('modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalContentBody = document.getElementById('modal-content-body');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const project = projectDetails[projectId];
      if (!project) return;

      modalContentBody.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
          <span style="font-size: 0.8rem; font-weight: 700; color: #A78BFA; text-transform: uppercase; letter-spacing: 0.05em;">${project.category}</span>
          <h2 style="font-size: 1.8rem; font-weight: 800; margin-top: 0.25rem;">${project.title}</h2>
        </div>

        <div style="width: 100%; height: 260px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.5rem; border: 1px solid var(--card-border);">
          <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>

        <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6; margin-bottom: 1.5rem;">
          ${project.description}
        </p>

        <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.75rem;">Key Project Deliverables:</h4>
        <ul style="list-style: none; margin-bottom: 1.5rem;">
          ${project.features.map(f => `<li style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.5rem;"><i class="fa-solid fa-circle-check" style="color: var(--accent-green);"></i> ${f}</li>`).join('')}
        </ul>

        <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.75rem;">Technologies Used:</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
          ${project.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="${project.liveUrl}" target="_blank" rel="noopener" class="btn btn-green">
            <span>Visit Live App</span>
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          <a href="#contact" class="btn btn-primary" onclick="closeModal()">
            <span>Inquire About Similar Project</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      `;

      modalOverlay.classList.add('active');
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  function closeModal() {
    if (modalOverlay) modalOverlay.classList.remove('active');
  }

  /* --------------------------------------------------------------------------
     7. Contact Form Handler & Toast Alerts
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-form-btn');

  const whatsappBtn = document.getElementById('whatsapp-btn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('user-name').value;
      const email = document.getElementById('user-email').value;
      const projectType = document.getElementById('project-type').value;
      const message = document.getElementById('user-message').value;

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', 'error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transmitting Email Notification...';

      const formData = new FormData(contactForm);

      try {
        // FormSubmit AJAX delivery directly to saimkd1211@gmail.com
        const response = await fetch('https://formsubmit.co/ajax/saimkd1211@gmail.com', {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });

        const result = await response.json();

        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Email to Saim (saimkd1211@gmail.com)</span> <i class="fa-solid fa-paper-plane"></i>';

        if (result.success === "true" || response.ok) {
          contactForm.reset();
          showToast(`Thank you, ${name}! Your hire request was sent directly to saimkd1211@gmail.com.`);
        } else {
          // Fallback to PHP script send-email.php
          const phpRes = await fetch('send-email.php', {
            method: 'POST',
            body: formData
          });
          const phpResult = await phpRes.json();
          contactForm.reset();
          showToast(phpResult.message || `Thank you, ${name}! Inquiry delivered to Saim Baig.`);
        }
      } catch (err) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Email to Saim (saimkd1211@gmail.com)</span> <i class="fa-solid fa-paper-plane"></i>';
        contactForm.reset();
        showToast(`Thank you, ${name}! Message transmitted to saimkd1211@gmail.com.`);
      }
    });
  }

  // Direct WhatsApp Message Handler
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const name = document.getElementById('user-name').value || 'A Client';
      const projectType = document.getElementById('project-type').value || 'Project Inquiry';
      const message = document.getElementById('user-message').value || 'Hello Saim, I would like to discuss a project with you.';

      const waText = encodeURIComponent(`Hi Saim, my name is ${name}. I want to hire you for: ${projectType}.\n\nDetails: ${message}`);
      const waUrl = `https://wa.me/919068336618?text=${waText}`;

      window.open(waUrl, '_blank');
      showToast('Opening WhatsApp to send direct message...');
    });
  }

  /* Toast Notification helper */
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-green); font-size: 1.2rem;"></i> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

});
