let myLeads = []

const inputEl = document.querySelector("#input-el")
const ulEl = document.querySelector("#ul-el")
const inputBtn = document.querySelector("#input-btn")
const deleteBtn = document.querySelector("#delete-btn")
const tabBtn = document.querySelector("#tab-btn")

// Can be of two values ["lead1", "lead2"...] or null
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))  // Returns a JavaScript Object (Array in this case)

// Runs regardless and displays leads if there is any
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads) // Display the leads already in storage
}

inputBtn.addEventListener("click", function() { 
    myLeads.push(inputEl.value)
    inputEl.value = ""

    localStorage.setItem("myLeads", JSON.stringify(myLeads)) // Sets myLeads to a JSON string and stores it in localStorage

    render(myLeads)

    console.log(localStorage.getItem("myLeads"))
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads) //Since the myLeads is empty it will loop 0 times
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { // query returns the result of tabs matching the criteria specified
        
        myLeads.push(tabs[0].url) 
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) { 
        listItems += `
            <li>
                <a href='${leads[i]}' target='_blank'>
                    ${leads[i]}
                </a>
            </li>`
    }   
    ulEl.innerHTML = listItems
}