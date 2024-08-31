let myLeads = []

const inputEl = document.getElementById("input-el")
const inputListener = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderElements(myLeads)
}

const tabs = [
    { url: "https://www.linkedin.com/in/per-harald-borgen/" }
]

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderElements(myLeads)
    })
})

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    myLeads = []
    renderElements(myLeads)
})

inputListener.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderElements(myLeads)
})

function renderElements(links) {
    let listItems = ""

    for (let i = 0; i < links.length; i++) {
        listItems += `<li><a href='${links[i]}' target="_blank">${links[i]}</a></li>`
    }
    ulEl.innerHTML = listItems
}
