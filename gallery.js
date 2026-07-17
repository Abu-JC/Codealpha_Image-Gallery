const filterBtn = document.querySelectorAll(".filter-btn");
const galleryItem = document.querySelectorAll(".gallery-item");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const navigation = document.querySelector(".navigation");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");

let galleryImages = [];
let currentImgIndex = 0;

function setupImageClickListeners() {
    galleryImages = document.querySelectorAll(".gallery-item:not([style*='display: none']) img");
    
    galleryImages.forEach((img, index) => {
        img.style.cursor = "zoom-in";
        // Remove existing listener if any, then add new one
        img.onclick = null; 
        img.addEventListener("click", () => {
            currentImgIndex = index;
            openLightbox(img);
        });
    });
}

setupImageClickListeners();

filterBtn.forEach(button => {
    button.addEventListener("click", () => {
        filterBtn.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        navigation.classList.remove("active");
        hamburgerMenu.textContent = "menu";
        
        const filterCategory = button.getAttribute("data-filter");
        galleryItem.forEach(item => {
            const itemCategory = item.getAttribute("data-category");
            if (filterCategory === "All" || filterCategory === itemCategory) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });

        // Refresh the lightbox list to only include visible items
        setupImageClickListeners();
    });
});

hamburgerMenu.addEventListener("click", () => {
    navigation.classList.toggle("active");
    hamburgerMenu.textContent = navigation.classList.contains("active") ? "close" : "menu";
});

function openLightbox(imgElement) {
    lightbox.classList.add("active");
    lightboxImg.src = imgElement.src;
    lightboxImg.alt = imgElement.alt;
    document.body.style.overflow = "hidden";
}

function showImage(index) {
    if (index >= galleryImages.length) {
        currentImgIndex = 0;
    } else if (index < 0) {
        currentImgIndex = galleryImages.length - 1;
    } else {
        currentImgIndex = index;
    }
    
    const targetImg = galleryImages[currentImgIndex];
    lightboxImg.src = targetImg.src;
    lightboxImg.alt = targetImg.alt;
}

// Lightbox Listeners
lightboxPrev.addEventListener("click", () => showImage(currentImgIndex - 1));
lightboxNext.addEventListener("click", () => showImage(currentImgIndex + 1));

lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
});

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});

document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("active")) return;
    
    if (event.key === "ArrowLeft") {
        showImage(currentImgIndex - 1);
    } else if (event.key === "ArrowRight") {
        showImage(currentImgIndex + 1);
    } else if (event.key === "Escape") {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});