document.addEventListener("DOMContentLoaded", () => {

    // --- Mobile viewport height fix (accounts for browser chrome / address bar) ---
    function setViewportHeight() {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    }
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    // Global Navigation Function
    function navigateToStage(stageNum) {
        document.querySelectorAll('.stage').forEach(stage => stage.classList.remove('active'));
        document.getElementById(`stage-${stageNum}`).classList.add('active');
    }

    // --- STAGE 1: Welcome Logic ---
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    function dodgeNoBtn() {
        const margin = 20;
        const maxX = window.innerWidth - noBtn.offsetWidth - margin;
        const maxY = window.innerHeight - noBtn.offsetHeight - margin;
        const x = Math.random() * (maxX - margin) + margin;
        const y = Math.random() * (maxY - margin) + margin;

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    }

    // Desktop: dodge on hover. Touch devices: dodge on the first touch instead,
    // since there's no hover event, then let a second tap still miss it naturally.
    noBtn.addEventListener('mouseover', dodgeNoBtn);
    if (isTouchDevice) {
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            dodgeNoBtn();
        }, { passive: false });
    }

    yesBtn.addEventListener('click', () => {
        navigateToStage(2);
    });

    // --- STAGE 2: Balloon Pop Logic ---
    let poppedCount = 0;
    const totalBalloons = 4;
    const balloons = document.querySelectorAll('.balloon');
    const msg = document.getElementById('balloon-message');

    balloons.forEach(balloon => {
        balloon.addEventListener('click', function() {
            if(!this.classList.contains('popped')) {
                this.classList.add('popped');
                this.style.opacity = '0';
                this.style.transform = 'scale(0.1)';
                poppedCount++;
                
                if (poppedCount === 2) {
                    msg.innerText = "You are so...";
                    msg.style.opacity = '0.5';
                }
                if (poppedCount === totalBalloons) {
                    msg.innerText = "You are so special ❤️";
                    msg.style.opacity = '1';
                    setTimeout(() => navigateToStage(3), 1800);
                }
            }
        });
    });

    // --- STAGE 3: Blow Candle Logic ---
    const cake = document.getElementById('cake');
    const flame = document.getElementById('flame');

    cake.addEventListener('click', () => {
        flame.style.display = 'none'; 
        setTimeout(() => {
            navigateToStage(4);
        }, 1200);
    });

    // --- GENERAL STAGE BUTTON HANDLERS ---
    document.querySelectorAll('.next-stage-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const nextTarget = this.getAttribute('data-next');
            navigateToStage(nextTarget);
        });
    });

    // --- STAGE 5: Card Deck Logic ---
    const cards = document.querySelectorAll('.photo-card');
    let swipedCount = 0;
    const galleryNextBtn = document.getElementById('gallery-next-btn');

    cards.forEach(card => {
        card.addEventListener('click', function() {
            if(!this.classList.contains('swiped')) {
                this.classList.add('swiped');
                swipedCount++;
                if(swipedCount === cards.length) {
                    galleryNextBtn.classList.remove('hidden');
                }
            }
        });
    });

    // --- STAGE 6: Letter / Envelope Logic ---
    const envelopeWrapper = document.getElementById('envelope');
    const envelope = envelopeWrapper.querySelector('.envelope');
    const envelopeLetter = envelope.querySelector('.letter');
    const envelopeNextBtn = document.getElementById('envelope-next-btn');

    function setEnvelopeOpen(isOpen) {
        envelope.classList.toggle('open', isOpen);
        envelopeWrapper.classList.toggle('open', isOpen);
    }

    envelopeNextBtn.classList.remove('hidden');
    envelopeNextBtn.style.display = 'inline-block';

    [envelopeWrapper, envelope, envelopeLetter].forEach((element) => {
        element.addEventListener('click', (event) => {
            event.stopPropagation();
            const isOpening = !envelope.classList.contains('open');
            setEnvelopeOpen(isOpening);
        });
    });

    // --- STAGE 7: Gift Box Reveal Logic ---
    const giftBox = document.getElementById('gift-box');
    const finalOutro = document.getElementById('final-outro');

    giftBox.addEventListener('click', function() {
        this.classList.add('hidden');
        finalOutro.classList.remove('hidden');
    });
});