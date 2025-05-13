document.addEventListener('DOMContentLoaded', () => {
    // Управление темами
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    let isNightTheme = false;

    themeToggle.addEventListener('click', () => {
        isNightTheme = !isNightTheme;
        if (isNightTheme) {
            body.classList.remove('day-theme');
            body.classList.add('night-theme');
            themeToggle.textContent = '☀️';
        } else {
            body.classList.remove('night-theme');
            body.classList.add('day-theme');
            themeToggle.textContent = '🌙';
        }
    });

    // Анимация печатающегося текста
    const messages = [
        "Ты - моё вдохновение ❤️",
        "Каждый день с тобой - это счастье 💕",
        "Ты делаешь мой мир ярче ✨",
        "Я люблю тебя больше, чем вчера, но меньше, чем завтра 💝"
    ];
    
    let currentMessageIndex = 0;
    const typingText = document.querySelector('.typing-text');
    
    function typeMessage(message, element, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < message.length) {
                element.textContent += message.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                setTimeout(() => {
                    element.textContent = '';
                    currentMessageIndex = (currentMessageIndex + 1) % messages.length;
                    typeMessage(messages[currentMessageIndex], element);
                }, 2000);
            }
        }
        
        type();
    }
    
    typeMessage(messages[0], typingText);
    
    // Управление музыкой
    const music = document.getElementById('backgroundMusic');
    const musicBtn = document.getElementById('musicToggle');
    let isMusicPlaying = false;
    
    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            music.pause();
            musicBtn.textContent = '🎵';
        } else {
            music.play();
            musicBtn.textContent = '🔇';
        }
        isMusicPlaying = !isMusicPlaying;
    });
    
    // Создание плавающих сердечек
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        heart.style.animation = `float ${Math.random() * 3 + 2}s linear`;
        document.querySelector('.floating-hearts').appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
    
    setInterval(createFloatingHeart, 300);
    
    // Эффект разбивающегося сердца
    function createHeartPiece(x, y, angle, distance) {
        const piece = document.createElement('div');
        piece.className = 'heart-piece';
        piece.style.left = x + 'px';
        piece.style.top = y + 'px';
        piece.style.transform = `rotate(${angle}deg)`;
        piece.style.animation = `heartBreak 1s forwards`;
        document.body.appendChild(piece);
        
        setTimeout(() => {
            piece.remove();
        }, 1000);
    }
    
    // Создание звёзд при движении мыши
    function createStar(x, y) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        document.body.appendChild(star);
        
        setTimeout(() => {
            star.remove();
        }, 1000);
    }
    
    let lastStarTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastStarTime > 50) {
            createStar(e.clientX, e.clientY);
            lastStarTime = now;
        }
    });
    
    // Обработчик клика по сердцу
    const heart = document.querySelector('.heart');
    let clickCount = 0;
    
    heart.addEventListener('click', (e) => {
        const rect = heart.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Создаем частицы сердца
        for (let i = 0; i < 12; i++) {
            const angle = (i * 30) + Math.random() * 20;
            createHeartPiece(centerX, centerY, angle, 100);
        }
        
        // Анимация пульсации при клике
        heart.style.transform = 'scale(1.2)';
        setTimeout(() => {
            heart.style.transform = 'scale(1)';
        }, 200);
        
        clickCount++;
        if (clickCount === 7) {
            const specialMessage = document.createElement('div');
            specialMessage.style.position = 'fixed';
            specialMessage.style.top = '50%';
            specialMessage.style.left = '50%';
            specialMessage.style.transform = 'translate(-50%, -50%)';
            specialMessage.style.background = 'rgba(255, 255, 255, 0.9)';
            specialMessage.style.padding = '20px';
            specialMessage.style.borderRadius = '10px';
            specialMessage.style.zIndex = '1000';
            specialMessage.innerHTML = `
                <h2>Ты нашла секретное послание! 💝</h2>
                <p>Ты - самое дорогое, что у меня есть!</p>
                <button onclick="this.parentElement.remove()">Закрыть</button>
            `;
            document.body.appendChild(specialMessage);
            clickCount = 0;
        }
    });
    
    // Пасхальные яйца
    const secretMessages = [
        { 
            text: "Ты нашла первое пасхальное яйцо! 🥚", 
            x: 5, 
            y: 5,
            effect: () => {
                for(let i = 0; i < 3; i++) {
                    setTimeout(() => createFloatingHeart(), i * 200);
                }
            }
        },
        { 
            text: "Ты самая красивая! 🌹", 
            x: 95, 
            y: 5,
            effect: () => {
                const body = document.body;
                body.style.animation = 'rainbow 2s infinite';
                setTimeout(() => {
                    body.style.animation = '';
                }, 2000);
            }
        },
        { 
            text: "Ты - моя любовь! 💑", 
            x: 50, 
            y: 50,
            effect: () => {
                const stars = document.createElement('div');
                stars.className = 'stars-burst';
                document.body.appendChild(stars);
                setTimeout(() => {
                    if(stars.parentNode) {
                        stars.parentNode.removeChild(stars);
                    }
                }, 2000);
            }
        },
        { 
            text: "Ты - моё солнышко! ☀️", 
            x: 5, 
            y: 95,
            effect: () => {
                const sun = document.createElement('div');
                sun.className = 'mini-sun';
                document.body.appendChild(sun);
                setTimeout(() => {
                    if(sun.parentNode) {
                        sun.parentNode.removeChild(sun);
                    }
                }, 2000);
            }
        },
        { 
            text: "Ты - моя звёздочка! ⭐", 
            x: 95, 
            y: 95,
            effect: () => {
                for(let i = 0; i < 10; i++) {
                    setTimeout(() => {
                        const x = Math.random() * window.innerWidth;
                        const y = Math.random() * window.innerHeight;
                        createStar(x, y);
                    }, i * 100);
                }
            }
        },
        { 
            text: "Ты - моя радость! 😊", 
            x: 50, 
            y: 5,
            effect: () => {
                const emoji = document.createElement('div');
                emoji.className = 'floating-emoji';
                emoji.textContent = '😊';
                document.body.appendChild(emoji);
                setTimeout(() => {
                    if(emoji.parentNode) {
                        emoji.parentNode.removeChild(emoji);
                    }
                }, 2000);
            }
        }
    ];
    
    secretMessages.forEach((msg, index) => {
        const secret = document.createElement('div');
        secret.className = 'secret-message';
        secret.textContent = msg.text;
        secret.style.left = msg.x + 'vw';
        secret.style.top = msg.y + 'vh';
        
        secret.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Пасхалка кликнута:', msg.text);
            msg.effect();
            secret.style.transform = 'scale(1.2)';
            secret.style.opacity = '1';
            setTimeout(() => {
                secret.style.transform = 'scale(1)';
                secret.style.opacity = '0';
            }, 1000);
        });
        
        document.body.appendChild(secret);
    });

    // Обработка входа в комнату
    const houseDoor = document.querySelector('.house-door');
    const room = document.querySelector('.room');
    const roomExit = document.querySelector('.room-exit');
    const container = document.querySelector('.container');

    if (houseDoor) {
        houseDoor.addEventListener('click', (e) => {
            console.log('Дверь кликнута');
            e.stopPropagation();
            
            houseDoor.classList.add('open');
            container.classList.add('enter-animation');
            
            setTimeout(() => {
                room.classList.add('active');
                container.style.display = 'none';
            }, 1000);
        });
    }

    if (roomExit) {
        roomExit.addEventListener('click', (e) => {
            console.log('Выход кликнут');
            e.stopPropagation();
            
            room.classList.remove('active');
            container.style.display = 'flex';
            container.classList.remove('enter-animation');
            houseDoor.classList.remove('open');
        });
    }
}); 