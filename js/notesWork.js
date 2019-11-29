console.log('This is my first project');
showNotes();
// If user adds a notes show it in the local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTitle = document.getElementById('addTitle');
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        notes: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = '';
    addTitle.value = '';
    //  console.log(notesObj);
    showNotes();
});
// Function to show Notes
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    notesObj.forEach(function (element, index) {
        html += `
        <div class="notecard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.notes}</p>
            <button id="${index}" onclick=deleteNotes(this.id) class="btn btn-primary">Delete Note</button>
        </div>
    </div>  
        `
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `YOU HAVE NO NOTES INSIDE THE MAGIC NOTES. USE "ADD NOTES" TO ADD..`
    }
}

//Function To Delete Notes

function deleteNotes(index) {
    // console.log('i am deleteing', index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

// To make Search button function

let searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener('input', function () {
    let inputVal = searchTxt.value;
    let noteCard = document.getElementsByClassName('notecard');
    Array.from(noteCard).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    })
    // console.log('i am fired', inputVal);
});