const myLeads = []

const inputEl = document.createElement('input-el')
const inputLestener = document.getElementById("input-btn")

inputLestener.addEventListener("click",function(){
    myLeads.push(inputEl.value);
})




for (let i = 0; i < myLeads.length; i++) {
    console.log(myLeads[i])
}