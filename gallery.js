const filterBtn = document.querySelectorAll(".filter-btn");
const galleryItem = document.querySelectorAll(".gallery-item");
filterBtn.forEach(button=>{
    button.addEventListener("click",()=>{
        filterBtn.forEach(btn=>btn.classList.remove("active"))
        button.classList.add("active");
        const filterCategory = button.getAttribute("data-filter");
    galleryItem.forEach(item=>{
        const itemCategory = item.getAttribute("data-category");
        if(filterCategory === "All" || filterCategory===itemCategory){
            item.style.display = "block"
        }
        else{
            item.style.display = "none"
        }
    })
    })
}
)
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");
const galleryImages = document.querySelectorAll(".gallery-item img");
galleryImages.forEach(img => {
    img.style.cursor = "zoom-in"; 
    img.addEventListener("click", () => {
        lightbox.classList.add("active");
        lightboxImg.src = img.src; 
        lightboxImg.alt = img.alt;
        document.body.style.overflow = "hidden"; 
    });
});
lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto"; 
});
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});