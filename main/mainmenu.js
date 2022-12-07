function menuToggle() {
    const toggleMenu = document.querySelector(".menu");
    toggleMenu.classList.toggle("active");
}
function createPopup() {
    var popupNode = document.querySelector(".popup");
    var overlay = document.querySelector(".overlay");
    var closeBtn = document.querySelector(".close-btn");
    function openPopup(){
        popupNode.classList.add("active");
    }
    function closePopup(){
        popupNode.classList.remove("active");
    }
    closeBtn.addEventListener("click", closePopup);
    overlay.addEventListener("click", closePopup);
    return openPopup();
    let popup = createPopup("#popup");
    document.querySelector("#open-popup").addEventListener("click", popup);
}


