let modal = document.querySelector("#modal");
let openModalBtn = document.querySelector("#open-modal-btn");
let closeModalBtn = document.querySelector("#close-modal-btn");
let overlay = document.querySelector("#overlay");


openModalBtn.addEventListener("click", ()=>{
    modal.classList.add("open");
    overlay.classList.add("open")
})

closeModalBtn.addEventListener("click",closeModal)

overlay.addEventListener("click",closeModal)

function closeModal(){
    modal.classList.remove("open")
    overlay.classList.remove("open")
}