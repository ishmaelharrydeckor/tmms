/**
 * The Mission Magnificat School - Frontend Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinksMenu = document.getElementById('nav-links-menu');

  if (mobileMenuBtn && navLinksMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinksMenu.classList.toggle('active');
      mobileMenuBtn.classList.toggle('open');
      
      // Animate the hamburger button
      const bars = mobileMenuBtn.querySelectorAll('.bar');
      if (mobileMenuBtn.classList.contains('open')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });

    // Close menu when a link is clicked
    const links = navLinksMenu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinksMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('open');
        const bars = mobileMenuBtn.querySelectorAll('.bar');
        bars.forEach(bar => {
          bar.style.transform = 'none';
          bar.style.opacity = '1';
        });
      });
    });
  }

  // Active Link Highlighter on Scroll
  const sections = document.querySelectorAll('section, header');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id') || '';
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      // Handle home special case
      if (current === '' && item.getAttribute('href') === '#') {
        item.classList.add('active');
      } else if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });

    // Shrink navbar on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.height = '70px';
      navbar.style.background = 'rgba(255, 255, 255, 0.96)';
    } else {
      navbar.style.height = '80px';
      navbar.style.background = 'rgba(255, 255, 255, 0.92)';
    }
  });

  // Contact Form Submission Handler
  const contactForm = document.getElementById('school-contact-form');
  const alertContainer = document.getElementById('contact-alert');

  if (contactForm && alertContainer) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const submitBtnText = submitBtn.querySelector('span');
      
      // Set Loading State
      submitBtn.disabled = true;
      const originalText = submitBtnText.textContent;
      submitBtnText.textContent = 'Sending...';

      // Capture inputs
      const name = document.getElementById('c-name').value.trim();
      const phone = document.getElementById('c-phone').value.trim();
      const message = document.getElementById('c-message').value.trim();

      // Simulate network request
      setTimeout(() => {
        // Reset button state
        submitBtn.disabled = false;
        submitBtnText.textContent = originalText;

        // Display success response
        alertContainer.className = 'alert alert-success';
        alertContainer.textContent = `Thank you, ${name}! Your inquiry has been sent. We will contact you at ${phone} soon.`;
        alertContainer.classList.remove('hidden');

        // Reset form
        contactForm.reset();

        // Hide alert after 8 seconds
        setTimeout(() => {
          alertContainer.classList.add('hidden');
        }, 8000);
      }, 1500);
    });
  }
});
