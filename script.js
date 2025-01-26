// Seletores principais
const video = document.querySelector('.video-section video');
const track = document.querySelector('.carousel-track');
const slides = Array.from(track?.children || []); // Garante que slides existam

// Ajusta o tamanho do vídeo conforme o tamanho da tela
const ajustarTamanhoVideo = () => {
    if (!video) return;
    video.style.width = `${window.innerWidth}px`;
    video.style.height = `${window.innerHeight}px`;
};

// Debounce para otimizar eventos
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

// Controle de slides
let currentIndex = 0; // Sempre começa na primeira imagem
const slideWidth = slides.length > 0 ? slides[0].getBoundingClientRect().width + 8 : 0; // Inclui o gap de 8px

// Função para posicionar slides lado a lado
const posicionarSlides = () => {
    if (slides.length > 0) {
        slides.forEach((slide, index) => {
            slide.style.left = `${slideWidth * index}px`;
        });
    }
};

// Função para mover para um slide específico
const moveToSlide = (index) => {
    if (!track) return;
    track.style.transform = `translateX(-${slideWidth * index}px)`;
    currentIndex = index;
};

// Alternância automática de slides
const iniciarCarrossel = () => {
    if (slides.length > 0) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length; // Avança e reinicia no primeiro slide ao final
            moveToSlide(currentIndex);
        }, 3000); // A cada 3 segundos
    }
};

// Evento para redimensionamento da tela
const ajustarCarrossel = () => {
    if (slides.length > 0) {
        slides.forEach((slide, index) => {
            slide.style.left = `${slideWidth * index}px`;
        });
        moveToSlide(currentIndex); // Reposiciona para o slide atual
    }
};

// Inicializa o carrossel
const inicializarCarrossel = () => {
    posicionarSlides(); // Posiciona as imagens inicialmente
    moveToSlide(0); // Começa na primeira imagem
    iniciarCarrossel(); // Inicia a alternância automática
};

// Eventos globais
window.addEventListener('load', inicializarCarrossel);
window.addEventListener('resize', ajustarCarrossel);
