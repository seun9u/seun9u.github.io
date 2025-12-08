document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const imgCounter = document.getElementById("imgCounter");
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentImages = [];
    let currentIndex = 0;

    // 모달 열기 버튼 이벤트 연결
    const btns = document.querySelectorAll(".open-modal-btn");
    btns.forEach(btn => {
        btn.addEventListener("click", function () {
            const rawImages = this.getAttribute("data-images");
            if (rawImages) {
                // 이미지 경로 파싱 및 공백 제거
                currentImages = rawImages.split(',').map(img => img.trim());
                currentIndex = 0;
                
                updateModalImage(); // 이미지 및 점 업데이트
                
                modal.style.display = "block";
                document.body.style.overflow = "hidden"; // 스크롤 방지
            }
        });
    });

    // 닫기 버튼 이벤트
    document.querySelector(".close").addEventListener("click", closeModal);

    // 모달 바깥 영역 클릭 시 닫기
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }

    // HTML의 onclick="changeImage()"에서 호출할 수 있도록 window 객체에 등록
    window.changeImage = function(n) {
        currentIndex += n;

        if (currentIndex >= currentImages.length) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = currentImages.length - 1;
        }

        updateModalImage();
    };

    // 이미지 및 점(Dot) 업데이트 핵심 로직
    function updateModalImage() {
        if (currentImages.length > 0) {
            modalImg.src = currentImages[currentIndex];
        }
        
        // 점(Dot) 영역 초기화
        imgCounter.innerHTML = ""; 

        // 이미지가 1장보다 많을 때만 네비게이션(화살표, 점) 표시
        if (currentImages.length > 1) {
            if(prevBtn) prevBtn.style.display = 'block';
            if(nextBtn) nextBtn.style.display = 'block';

            // 점 생성 반복문
            for (let i = 0; i < currentImages.length; i++) {
                let dot = document.createElement("span");
                dot.className = "dot";
                
                // 현재 보고 있는 이미지 순서면 active 클래스 추가
                if (i === currentIndex) {
                    dot.classList.add("active");
                }
                
                // 점을 클릭하면 해당 이미지로 이동
                dot.onclick = function() {
                    currentIndex = i;
                    updateModalImage();
                };
                
                imgCounter.appendChild(dot);
            }
        } else {
            // 이미지가 1장일 때는 화살표 숨김
            if(prevBtn) prevBtn.style.display = 'none';
            if(nextBtn) nextBtn.style.display = 'none';
        }
    }
});