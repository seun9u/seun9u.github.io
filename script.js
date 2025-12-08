document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const imgCounter = document.getElementById("imgCounter");
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentImages = [];
    let currentIndex = 0;


    const btns = document.querySelectorAll(".open-modal-btn");
    btns.forEach(btn => {
        btn.addEventListener("click", function () {
            const rawImages = this.getAttribute("data-images");
            if (rawImages) {
                
                currentImages = rawImages.split(',').map(img => img.trim());
                currentIndex = 0;
                
                updateModalImage(); 
                
                modal.style.display = "block";
                document.body.style.overflow = "hidden"; 
            }
        });
    });

    document.querySelector(".close").addEventListener("click", closeModal);

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }

    window.changeImage = function(n) {
        currentIndex += n;

        if (currentIndex >= currentImages.length) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = currentImages.length - 1;
        }

        updateModalImage();
    };

    function updateModalImage() {
        if (currentImages.length > 0) {
            modalImg.src = currentImages[currentIndex];
        }

        imgCounter.innerHTML = ""; 

        if (currentImages.length > 1) {
            if(prevBtn) prevBtn.style.display = 'block';
            if(nextBtn) nextBtn.style.display = 'block';

            for (let i = 0; i < currentImages.length; i++) {
                let dot = document.createElement("span");
                dot.className = "dot";

                if (i === currentIndex) {
                    dot.classList.add("active");
                }

                dot.onclick = function() {
                    currentIndex = i;
                    updateModalImage();
                };
                
                imgCounter.appendChild(dot);
            }
        } else {
            if(prevBtn) prevBtn.style.display = 'none';
            if(nextBtn) nextBtn.style.display = 'none';
        }
    }
});