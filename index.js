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
    if(inputEl.value) {
        myLeads.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderElements(myLeads)
    }

})

function renderElements(links) {
    let listItems = ""

    for (let i = 0; i < links.length; i++) {
        listItems += `
            <li >
                <a href='${links[i]}' target="_blank">
                    ${links[i]}
                </a>
                <i id="link-${i}" class="fa-solid fa-x"></i>
            </li>`
    }
    ulEl.innerHTML = listItems

    // Add event listeners to each list item
    for (let i = 0; i < links.length; i++) {
        const listItem = document.getElementById(`link-${i}`)
        listItem.addEventListener("click", function(event) {
            // Check if the click is not on the <a> tag
            if (event.target.tagName === "I") {
                removeLinkByIndex(i)
            }
        })
    }
}

function removeLinkByIndex(index) {
    if (index >= 0 && index < myLeads.length) {
        myLeads.splice(index, 1)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderElements(myLeads)
    }
}
