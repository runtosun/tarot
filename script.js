const cardContainer = document.getElementById('card-container');
const selectedCardsContainer = document.getElementById('selected-cards');

// 카드 배열 생성 부분 수정
const cards = Array.from({ length: 78 }, (_, i) => {
    const cardNumber = i.toString().padStart(2, '0');
    return `images/card_${cardNumber}.jpg`;
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(src, index, total) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const angle = (index - (total - 1) / 2) * 2.25;  // 각도 범위를 중간 값으로 조정
    card.style.setProperty('--angle', `${angle}deg`);
    
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    const img = document.createElement('img');
    img.src = src;
    cardFront.appendChild(img);
    
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    
    return card;
}

function initializeCards() {
    shuffleArray(cards);
    cards.forEach((cardSrc, index) => {
        const card = createCard(cardSrc, index, cards.length);
        card.addEventListener('click', () => selectCard(card));
        cardContainer.appendChild(card);
        
        // 애니메이션 지연 적용
        setTimeout(() => {
            card.style.animation = `fanOut 1.5s ease-out forwards ${index * 22}ms`;  // 지연 시간 약간 조정
        }, 100);
    });
}

function selectCard(card) {
    card.removeEventListener('click', () => selectCard(card));
    cardContainer.removeChild(card);
    card.style.animation = 'none';
    card.style.transform = 'none';  // 선택된 카드의 회전 및 위치 초기화
    card.addEventListener('click', () => flipCard(card));
    selectedCardsContainer.appendChild(card);
}

function flipCard(card) {
    card.classList.toggle('flipped');
}

initializeCards();
