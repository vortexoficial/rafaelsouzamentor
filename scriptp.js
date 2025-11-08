window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                if (loader) loader.remove();
            }, 400);
        }
    }, 2500); 
});


// --- SCRIPT CONTADOR ---

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function startCountdown(deadline) {
    const countdownElement = document.querySelector('.countdown');
    if (!countdownElement) return;

    const targetDate = new Date(deadline).getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(interval);
            const timerContainer = document.querySelector('.countdown-timer');
            if (timerContainer) {
                timerContainer.innerHTML = "<p style='font-size: 1.2rem; color: var(--gold);'>OFERTA ENCERRADA</p>";
            }
            const countdownText = countdownElement.querySelector('p');
            if (countdownText) {
                countdownText.style.display = 'none';
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerHTML = formatTime(days);
        hoursEl.innerHTML = formatTime(hours);
        minutesEl.innerHTML = formatTime(minutes);
        secondsEl.innerHTML = formatTime(seconds);

    }, 1000);
}

// --- SCRIPT PRINCIPAL (DOM LOADED) ---

document.addEventListener('DOMContentLoaded', () => {
    
    // Bloco do contador
    const countdownElement = document.querySelector('.countdown');
    if (countdownElement) {
        const deadline = countdownElement.getAttribute('data-deadline');
        if (deadline) {
            startCountdown(deadline);
        }
    }

    // --- SCRIPT FAQ ACCORDION ---
    const allFaqQuestions = document.querySelectorAll('.faq-question');
    
    allFaqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = question.nextElementSibling;
            const isAlreadyActive = item.classList.contains('active');

            document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                activeItem.classList.remove('active');
                activeItem.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            if (!isAlreadyActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
    // --- FIM FAQ ---


    // --- DECLARAR VARIÁVEIS DO SWIPER PRIMEIRO ---
    let testimonialSwiper = null;
    let videoSwiper = null;

    // --- SCRIPT PLAYER DE VÍDEO CUSTOMIZADO ---
    document.querySelectorAll('.video-slide-container').forEach(container => {
        const video = container.querySelector('video');
        const overlay = container.querySelector('.video-play-overlay');

        if (overlay) {
            overlay.addEventListener('click', (e) => {
                e.stopPropagation(); 
                video.play();
                container.classList.add('playing'); 
                
                if (videoSwiper && videoSwiper.autoplay) {
                    videoSwiper.autoplay.stop();
                }
            });
        }

        video.addEventListener('click', (e) => {
            e.stopPropagation();
            video.pause();
            container.classList.remove('playing');
        });
        
        video.addEventListener('ended', () => {
            container.classList.remove('playing');
        });
    });
    // --- FIM SCRIPT PLAYER ---


    // --- SCRIPT SWIPER CARROSSEL ---
            
    function pauseAndShowOverlays() {
        document.querySelectorAll('.video-slide-container').forEach(container => {
            const video = container.querySelector('video');
            if (video) {
                video.pause();
            }
            container.classList.remove('playing');
        });
    }

    // Inicializa o carrossel de DEPOIMENTOS (Imagens)
    testimonialSwiper = new Swiper('.testimonial-slider', {
        loop: true,
        spaceBetween: 30,
        grabCursor: true,
        
        // [ATUALIZADO] Autoplay (skip) LIGADO por padrão (mobile)
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        pagination: {
            el: '.testimonial-slider .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.testimonial-slider .swiper-button-next',
            prevEl: '.testimonial-slider .swiper-button-prev',
        },
        breakpoints: {
            640: { 
                slidesPerView: 1
                // Autoplay continua LIGADO
            },
            // [ATUALIZADO] a partir de 768px...
            768: { 
                slidesPerView: 2,
                autoplay: false // Autoplay DESLIGADO
            },
            // [ATUALIZADO] a partir de 1024px...
            1024: { 
                slidesPerView: 3,
                autoplay: false // Autoplay DESLIGADO
            },
        }
    });

    // Inicializa o carrossel de VÍDEOS
    videoSwiper = new Swiper('.video-slider', {
        loop: true,
        spaceBetween: 30,
        grabCursor: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        pagination: {
            el: '.video-slider .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.video-slider .swiper-button-next',
            prevEl: '.video-slider .swiper-button-prev',
        },
        breakpoints: {
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
        on: {
            slideChange: () => {
                pauseAndShowOverlays();
            },
        }
    });
    // --- FIM SWIPER ---

});