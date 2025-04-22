const form = document.querySelector("#quiz-form")
const answers = Array.from(document.querySelectorAll(".answer"))
const alert = document.querySelector("#alert")




form.addEventListener("submit", e =>{
    e.preventDefault()

    const questionItems = document.querySelectorAll(".question-item")
    questionItems.forEach( q =>{
        q.classList.add("incorrect")
        q.classList.remove("correct")
    })

    const checkedAnswers = answers.filter( ans => ans.checked)

    checkedAnswers.forEach( ans =>{
        const correct = ans.value === "true"
        
        const questionItem = ans.closest(".question-item")

        if(correct){
            questionItem.classList.add("correct")
            questionItem.classList.remove("incorrect")
        }else{
            questionItem.classList.remove("correct")
            questionItem.classList.add("incorrect")
        }
        
    })


    const allTrue = checkedAnswers.every( ans => ans.value === "true")
    const allAnswered = checkedAnswers.length == questionItems.length

    if(allTrue && allAnswered){
        alert.classList.add("active")

        setTimeout(()=>{
            alert.classList.remove("active")
        },1000)
    }


})