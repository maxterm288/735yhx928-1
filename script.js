// Inicializar partículas
document.addEventListener('DOMContentLoaded', function() {
    // Configuración de partículas
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ["#00f3ff", "#7700ff", "#ff00ff"]
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.5,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#7700ff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    }
                }
            },
            retina_detect: true
        });
    }

    // Menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Efecto de escritura para el hero
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        // Resetear animación
        void typewriterElement.offsetWidth; // Trigger reflow
        typewriterElement.style.animation = 'none';
        setTimeout(() => {
            typewriterElement.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
        }, 10);
    }

    // Efecto de scroll suave para enlaces internos
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

    // Efecto hover en tarjetas
    const cards = document.querySelectorAll('.service-card, .plan-card, .contact-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // Efecto de parallax en scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });

    // Validar y crear PDFs si no existen (simulación)
    const planLinks = document.querySelectorAll('a[download]');
    planLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const fileName = this.getAttribute('href');
            
            // Si el archivo no existe, mostrar alerta (en producción, estos archivos deben existir)
            if (!fileName || fileName === '#') {
                e.preventDefault();
                alert('En un entorno real, aquí se descargaría el PDF con los detalles del plan.');
                console.log(`PDF a descargar: ${fileName}`);
            }
        });
    });

    // Efecto de carga inicial
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);

    // Efecto de brillo aleatorio en elementos
    setInterval(() => {
        const neonElements = document.querySelectorAll('.text-neon, .service-icon, .contact-icon');
        neonElements.forEach(el => {
            const randomHue = Math.floor(Math.random() * 360);
            const randomOpacity = 0.7 + Math.random() * 0.3;
            
            if (el.classList.contains('text-neon')) {
                el.style.textShadow = `0 0 10px hsla(${randomHue}, 100%, 50%, ${randomOpacity}), 
                                      0 0 20px hsla(${randomHue}, 100%, 50%, ${randomOpacity * 0.7})`;
            } else {
                el.style.filter = `drop-shadow(0 0 8px hsla(${randomHue}, 100%, 50%, ${randomOpacity}))`;
            }
            
            // Resetear después de un tiempo
            setTimeout(() => {
                if (el.classList.contains('text-neon')) {
                    el.style.textShadow = '0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan)';
                } else {
                    el.style.filter = 'none';
                }
            }, 300);
        });
    }, 3000);

    // Mostrar año actual en footer
    const yearSpan = document.querySelector('#current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Efecto de sonido para botones (opcional)
    const buttons = document.querySelectorAll('.btn, .contact-card, .social-link');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Crear efecto visual de "energía"
            const rect = this.getBoundingClientRect();
            const spark = document.createElement('div');
            spark.style.position = 'absolute';
            spark.style.left = `${Math.random() * rect.width}px`;
            spark.style.top = `${Math.random() * rect.height}px`;
            spark.style.width = '2px';
            spark.style.height = '2px';
            spark.style.background = 'var(--neon-cyan)';
            spark.style.borderRadius = '50%';
            spark.style.boxShadow = '0 0 5px var(--neon-cyan)';
            spark.style.pointerEvents = 'none';
            spark.style.zIndex = '100';
            this.appendChild(spark);
            
            // Animación de la chispa
            spark.animate([
                { transform: 'scale(1)', opacity: 1 },
                { transform: 'scale(5)', opacity: 0 }
            ], {
                duration: 300,
                easing: 'ease-out'
            });
            
            // Eliminar después de la animación
            setTimeout(() => spark.remove(), 300);
        });
    });

    // Detectar scroll para cambiar estilo del header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(5, 5, 16, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(5, 5, 16, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
});

// Función para descargar archivos (simulación)
function simulateDownload(filename) {
    console.log(`Descargando: ${filename}`);
    // En producción, aquí iría la lógica real de descarga
    alert(`En un entorno real, se descargaría el archivo: ${filename}`);
}

// Función para redirigir a WhatsApp con mensaje predefinido
function redirectToWhatsApp() {
    const message = encodeURIComponent("Hola Maxterm, vi tu página web y me interesa conocer más sobre tus servicios.");
    window.open(`https://wa.me/50372034081?text=${message}`, '_blank');
}

// Función para copiar email al portapapeles
function copyEmail() {
    const email = 'maxterm288@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        alert('Email copiado al portapapeles: ' + email);
    });
}

// Exportar funciones para uso global
window.simulateDownload = simulateDownload;
window.redirectToWhatsApp = redirectToWhatsApp;
window.copyEmail = copyEmail;
