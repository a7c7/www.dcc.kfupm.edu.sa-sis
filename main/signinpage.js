function eye () {
    var x = document.getElementById("password");
    var y = document.getElementById("hide1");
    var z = document.getElementById("hide2");
    if(x.type === "password") {
        x.type = "text";
        y.style.display = "block";
        z.style.display = "none";
    }
    else {
        x.type = "password";
        y.style.display = "none";
        z.style.display = "block";
    }
}

function btnloading () {
    var btn = document.querySelector(".signin-btn");
    btn.classList.toggle('btn-loading');
}
function onBtnClickHandle(){
    setTimeout(function(){ 
    window.location="mainmenu.html"
 }, 2000);
}