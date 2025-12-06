const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const imgCounter = document.getElementById("imgCounter");
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

document.querySelector(".close").addEventListener("click", () => {
    closeModal();
});

window.addEventListener("click", (e) => {
    if (e.target == modal) {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

function changeImage(n) {
    currentIndex += n;

    if (currentIndex >= currentImages.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = currentImages.length - 1;
    }

    updateModalImage();
}

function updateModalImage() {
    modalImg.src = currentImages[currentIndex];
    imgCounter.innerHTML = ""; 

    if (currentImages.length > 1) {
        document.querySelector('.prev').style.display = 'block';
        document.querySelector('.next').style.display = 'block';

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
        document.querySelector('.prev').style.display = 'none';
        document.querySelector('.next').style.display = 'none';
    }
}