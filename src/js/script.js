document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const menuMobile = document.querySelector('.menu-mobile');
    const nav = document.querySelector('.nav ul');
    
    menuMobile.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('menu-mobile')) return;
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile após clicar em um link
                if (nav.classList.contains('active')) {
                    menuMobile.classList.remove('active');
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animação ao rolar a página
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Verificar na carga inicial
    checkScroll();
    
    // Verificar durante o scroll
    window.addEventListener('scroll', checkScroll);
    
    // Efeito de abertura suave para projetos
    const projectLinks = document.querySelectorAll('.project-link');
    const projectOverlay = document.getElementById('projectOverlay');
    const closeOverlay = document.querySelector('.close-overlay');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Posicionar o overlay exatamente sobre o projeto clicado
            const projectItem = this.closest('.project-item');
            const projectRect = projectItem.getBoundingClientRect();
            
            projectOverlay.style.position = 'absolute';
            projectOverlay.style.top = `${projectRect.top}px`;
            projectOverlay.style.left = `${projectRect.left}px`;
            projectOverlay.style.width = `${projectRect.width}px`;
            projectOverlay.style.height = `${projectRect.height}px`;
            projectOverlay.style.borderRadius = '4px';
            projectOverlay.style.overflow = 'hidden';
            
            // Mostrar o overlay
            projectOverlay.classList.add('active');
            
            // Animação para expandir o overlay para tela cheia
            setTimeout(() => {
                projectOverlay.style.position = 'fixed';
                projectOverlay.style.top = '0';
                projectOverlay.style.left = '0';
                projectOverlay.style.width = '100%';
                projectOverlay.style.height = '100%';
                projectOverlay.style.borderRadius = '0';
            }, 10);
            
            // Redirecionar para a página do projeto após um breve delay
            setTimeout(() => {
                window.location.href = this.getAttribute('href');
            }, 10);
        });
    });
    
    // Fechar overlay (se o usuário clicar antes do redirecionamento)
    closeOverlay.addEventListener('click', function() {
        projectOverlay.classList.remove('active');
    });
    
    // Preloader (opcional)
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});