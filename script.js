document.addEventListener('DOMContentLoaded', function() {
    // Mettre à jour l'année du copyright
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Navigation mobile
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    // Toggle du menu mobile
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        // Animation des liens
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Animation du burger
        burger.classList.toggle('toggle');
    });
    
    // Fermer le menu mobile après avoir cliqué sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });
    
    // Animation de la barre de compétences au défilement
    const skills = document.querySelectorAll('.skill');
    const skillSection = document.querySelector('.skills');
    
    const animateSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skills.forEach(skill => {
                    const level = skill.getAttribute('data-level');
                    const skillLevel = skill.querySelector('.skill-level');
                    skillLevel.style.width = level + '%';
                });
                observer.unobserve(entry.target);
            }
        });
    };
    
    const skillObserver = new IntersectionObserver(animateSkills, {
        threshold: 0.5
    });
    
    if (skillSection) {
        skillObserver.observe(skillSection);
    }
    
    // Animation au défilement
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    const fadeInOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const fadeObserver = new IntersectionObserver(fadeInOnScroll, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
    
    // Gestion de la soumission du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs du formulaire
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Ici, vous pouvez ajouter le code pour envoyer les données à un serveur
            console.log('Formulaire soumis :', formObject);
            
            // Réinitialisation du formulaire
            contactForm.reset();
            
            // Message de confirmation
            alert('Merci pour votre message ! Je vous répondrai dès que possible.');
        });
    }
    
    // Navigation fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Changement de style de la navigation au défilement
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = 'none';
        }
    });
    
    // Mise en surbrillance de la section active dans la navigation
    const sections = document.querySelectorAll('section');
    
    const highlightNav = () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav);
    
    // Fonction pour le mode sombre (optionnel)
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.classList.add('dark-mode-toggle');
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Sauvegarder la préférence de l'utilisateur
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // Vérifier la préférence de l'utilisateur au chargement
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Style pour le bouton de mode sombre
    const darkModeStyle = document.createElement('style');
    darkModeStyle.textContent = `
        .dark-mode-toggle {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 999;
            transition: all 0.3s ease;
        }
        
        .dark-mode-toggle:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
    `;
    document.head.appendChild(darkModeStyle);
    
    // Animation des titres de section
    const sectionTitles = document.querySelectorAll('h2');
    
    sectionTitles.forEach(title => {
        const text = title.textContent;
        title.innerHTML = '';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.display = 'inline-block';
            span.style.transition = `all 0.3s ease ${i * 0.05}s`;
            title.appendChild(span);
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(title);
    });
});
