// ============================================
// Re:Pet - 반려동물 추모 앱 JavaScript
// ============================================

// DOM 요소 선택
const photoInput = document.getElementById('photoInput');
const previewContainer = document.getElementById('previewContainer');
const previewImage = document.getElementById('previewImage');
const removePhotoBtn = document.getElementById('removePhotoBtn');
const promptInput = document.getElementById('promptInput');
const generateBtn = document.getElementById('generateBtn');
const inputSection = document.getElementById('inputSection');
const resultSection = document.getElementById('resultSection');
const backBtn = document.getElementById('backBtn');
const generatedImage = document.getElementById('generatedImage');
const resultText = document.getElementById('resultText');
const feedBtn = document.getElementById('feedBtn');
const bathBtn = document.getElementById('bathBtn');
const cheerBtn = document.getElementById('cheerBtn');
const careResponse = document.getElementById('careResponse');
const careMessage = document.getElementById('careMessage');
const messageModal = document.getElementById('messageModal');
const modalClose = document.querySelector('.modal-close');
const cheerInput = document.getElementById('cheerInput');
const submitCheerBtn = document.getElementById('submitCheerBtn');

// 상태 관리
let currentPhoto = null;
let currentPrompt = '';

// ===== 사진 업로드 이벤트 =====
photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            currentPhoto = event.target.result;
            previewImage.src = currentPhoto;
            previewContainer.classList.remove('hidden');
            checkFormCompletion();
        };
        reader.readAsDataURL(file);
    }
});

// ===== 사진 제거 이벤트 =====
removePhotoBtn.addEventListener('click', () => {
    currentPhoto = null;
    photoInput.value = '';
    previewContainer.classList.add('hidden');
    previewImage.src = '';
    checkFormCompletion();
});

// ===== 프롬프트 입력 이벤트 =====
promptInput.addEventListener('input', () => {
    currentPrompt = promptInput.value.trim();
    checkFormCompletion();
});

// ===== 폼 완성도 확인 =====
function checkFormCompletion() {
    const isComplete = currentPhoto && currentPrompt.length > 0;
    generateBtn.disabled = !isComplete;
}

// ===== 생성 버튼 클릭 =====
generateBtn.addEventListener('click', () => {
    generateMemory();
});

// ===== 추억 생성 (데모) =====
function generateMemory() {
    // 입력 섹션 숨기기
    inputSection.classList.remove('active');
    
    // 결과 섹션 표시
    resultSection.classList.add('active');
    
    // 로딩 상태 표시
    const imageLoading = generatedImage.querySelector('.image-loading');
    if (!imageLoading) {
        generatedImage.innerHTML = `
            <div class="image-loading">
                <div class="spinner"></div>
                <p>추억을 재현 중입니다...</p>
            </div>
        `;
    } else {
        imageLoading.classList.remove('hidden');
    }
    
    // 이전 이미지 제거
    const prevImg = generatedImage.querySelector('img');
    if (prevImg) prevImg.remove();
    
    // 2초 후 결과 표시 (데모)
    setTimeout(() => {
        displayDemoImage();
    }, 2000);
}

// ===== 데모 이미지 표시 =====
function displayDemoImage() {
    const imageLoading = generatedImage.querySelector('.image-loading');
    if (imageLoading) {
        imageLoading.classList.add('hidden');
    }
    
    // 카드 생성 (데모 - 업로드된 이미지 사용)
    const card = document.createElement('div');
    card.style.cssText = `
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 15px;
        overflow: hidden;
        background: linear-gradient(135deg, #ffc9c9, #a8d8ea);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    if (currentPhoto) {
        // 업로드된 사진 사용
        const img = document.createElement('img');
        img.src = currentPhoto;
        img.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 15px;
        `;
        card.appendChild(img);
    } else {
        // 대체 콘텐츠
        card.innerHTML = `
            <div style="text-align: center; color: white; padding: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🌈</div>
                <p style="font-size: 1.2rem; font-weight: 600;">추억이 재현되었습니다</p>
            </div>
        `;
    }
    
    generatedImage.innerHTML = '';
    generatedImage.appendChild(card);
    
    // 메시지 생성
    const messages = generateMessages();
    resultText.textContent = messages.main;
    
    // 돌봄 기능 초기화
    careResponse.classList.add('hidden');
}

// ===== 메시지 생성 =====
function generateMessages() {
    const mainMessage = `당신의 사랑하는 반려동물이 ${currentPrompt}를 하고 있는 모습입니다.\n천국에서도 행복하기를 바랍니다. 💕`;
    
    return {
        main: mainMessage,
    };
}

// ===== 돌아가기 버튼 =====
backBtn.addEventListener('click', () => {
    resultSection.classList.remove('active');
    inputSection.classList.add('active');
    careResponse.classList.add('hidden');
    
    // 폼 초기화
    photoInput.value = '';
    promptInput.value = '';
    currentPhoto = null;
    currentPrompt = '';
    previewContainer.classList.add('hidden');
    generateBtn.disabled = true;
});

// ===== 돌봄 기능 메시지 =====
const careMessages = {
    feed: [
        '냠냠! 맛있네요. 🐾',
        '좋아하는 음식이네요! 😋',
        '정성껏 준 음식이 맛있어요! 💕',
        '또 먹여주세요! 🍖',
        '당신의 손으로 받는 음식이 가장 맛있어요.',
    ],
    bath: [
        '아, 시원한데요! 💦',
        '깨끗해졌어요! ✨',
        '목욕 정말 좋아해요! 🛁',
        '부드러운 손길이 좋아요.',
        '이렇게 돌봐줘서 고마워요! 🐾',
    ],
    cheer: [
        '응원해 주셔서 감사합니다.',
        '당신의 목소리가 가장 따뜻해요.',
        '항상 응원해 주는 당신이 정말 고마워요. 💕',
        '당신의 사랑이 저를 행복하게 했어요.',
        '천국에서도 당신의 응원이 들려요.',
    ],
};

// ===== 돌봄 버튼 이벤트 =====
feedBtn.addEventListener('click', () => {
    showCareResponse('feed', '🍖');
});

bathBtn.addEventListener('click', () => {
    showCareResponse('bath', '🛁');
});

cheerBtn.addEventListener('click', () => {
    openCheerModal();
});

// ===== 돌봄 반응 표시 =====
function showCareResponse(type, emoji) {
    const messages = careMessages[type];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    careMessage.textContent = `${emoji} ${randomMessage}`;
    careResponse.classList.remove('hidden');
    
    // 애니메이션 효과
    careResponse.style.animation = 'none';
    setTimeout(() => {
        careResponse.style.animation = 'slideIn 0.3s ease-out';
    }, 10);
    
    // 3초 후 자동 사라짐
    setTimeout(() => {
        careResponse.classList.add('hidden');
    }, 3000);
}

// ===== 응원 메시지 모달 열기 =====
function openCheerModal() {
    cheerInput.value = '';
    messageModal.classList.remove('hidden');
    cheerInput.focus();
}

// ===== 모달 닫기 =====
modalClose.addEventListener('click', () => {
    messageModal.classList.add('hidden');
});

messageModal.addEventListener('click', (e) => {
    if (e.target === messageModal) {
        messageModal.classList.add('hidden');
    }
});

// ===== 응원 메시지 전송 =====
submitCheerBtn.addEventListener('click', () => {
    const message = cheerInput.value.trim();
    if (message) {
        messageModal.classList.add('hidden');
        
        const cheerMessages = careMessages.cheer;
        const randomResponse = cheerMessages[Math.floor(Math.random() * cheerMessages.length)];
        
        careMessage.textContent = `💬 ${randomResponse}`;
        careResponse.classList.remove('hidden');
        
        careResponse.style.animation = 'none';
        setTimeout(() => {
            careResponse.style.animation = 'slideIn 0.3s ease-out';
        }, 10);
        
        setTimeout(() => {
            careResponse.classList.add('hidden');
        }, 4000);
        
        // 메시지 저장
        saveMessage(message);
    }
});

// ===== 엔터 키로 메시지 전송 =====
cheerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        submitCheerBtn.click();
    }
});

// ===== 초기 상태 설정 =====
window.addEventListener('DOMContentLoaded', () => {
    checkFormCompletion();
    loadPreviousMessages();
});

// ===== LocalStorage에서 메시지 로드 =====
function loadPreviousMessages() {
    const savedMessages = localStorage.getItem('repet_messages');
    if (savedMessages) {
        try {
            const messages = JSON.parse(savedMessages);
            console.log('이전 메시지 로드:', messages);
        } catch (e) {
            console.error('메시지 로드 실패:', e);
        }
    }
}

// ===== 메시지 저장 =====
function saveMessage(message) {
    const savedMessages = localStorage.getItem('repet_messages');
    let messages = [];
    
    if (savedMessages) {
        try {
            messages = JSON.parse(savedMessages);
        } catch (e) {
            messages = [];
        }
    }
    
    messages.push({
        message: message,
        timestamp: new Date().toISOString(),
    });
    
    localStorage.setItem('repet_messages', JSON.stringify(messages));
}

// ===== 콘솔 로그 =====
console.log('🌈 Re:Pet 앱이 로드되었습니다.');
console.log('세상을 떠난 반려동물을 추모하며 시작합니다.');
