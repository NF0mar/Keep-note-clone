document.addEventListener("DOMContentLoaded", () => {

let noteArea = document.querySelector(".note-area");
let wrapper = document.querySelector(".wrapper");
let noteTitle = document.querySelector(".note-title");
let textArea = document.querySelector(".text-area");
let notes = document.querySelector(".notes");
let note = document.querySelector(".note");



const showTextArea = () => {
    textArea.style = "display: block"
    noteArea.classList.add('note-now');
}

const hideTextArea = () => {
    textArea.style = 'display: none';
    noteArea.classList.remove('note-now');
}


const addNoteToLocalStorage = (note) => {
    if(note.length === '') {
        return;
    }

    let oldNote;
    if(localStorage.getItem('notes') === null){
        oldNote = [];
    }
    else {
        oldNote = JSON.parse(localStorage.getItem('notes'));
    }

    oldNote.push(note);

    localStorage.setItem('notes',JSON.stringify(oldNote))
}

const getNotesFromLocalStorage = () => {
    let oldNote;
    if(localStorage.getItem('notes') === null){
        oldNote = [];
    }
    else {
        oldNote = JSON.parse(localStorage.getItem('notes'));
    }

    oldNote.forEach(note => {
        notes.innerHTML += `
        <div class="note">
            <h3 class="title-text">${note[0]}</h3>
            <p class="note-blog">${note[1]}</p>
            <i class="fa fa-trash"></i>
        </div>
        `;
    });
}

const deleteFromLocalStorage = (deletedNote) => {
    let oldNote;
    if(localStorage.getItem('notes') === null){
        oldNote = [];
    }
    else {
        oldNote = JSON.parse(localStorage.getItem('notes'));
    }

    oldNote.map( (note, index) => {

        if(note[0] == deletedNote.children[0].textContent && note[1] == deletedNote.children[1].textContent){
            oldNote.splice(index, 1);
            return oldNote;
        }
    });
    localStorage.setItem('notes', JSON.stringify(oldNote));
}

const addNote = (ciwaan, xog) => {
    notes.innerHTML += `
    <div class="note">
      <h3 class="title-text">${ciwaan}</h3>
      <p class="note-blog">${xog}</p>
      <i class="fa fa-trash"></i>
      
    </div>
    `;
}

getNotesFromLocalStorage();
noteArea.addEventListener('click', showTextArea);
document.addEventListener('click', (event) => {
    
    let isclicked = noteArea.contains(event.target);

    if(!isclicked){
        hideTextArea();

        /* doesn't add white space to note */
        if(noteTitle.value.trim() !== '' && textArea.value.trim() !== '') {
            addNote(noteTitle.value, textArea.value);
            addNoteToLocalStorage([noteTitle.value, textArea.value]);
            noteTitle.value = '';
            textArea.value = '';
        }

        /* Adds white space to note */

        // if(noteTitle.value.length === 0 && textArea.value.length === 0){
        //     return;
        // }
        // else {
        //     addNote(noteTitle.value, textArea.value);
        //     noteTitle.value="";
        //     textArea.value="";
        // }
    }
});

document.addEventListener('mouseover', (event) => {
    if(event.target.classList.contains('note')){
        event.target.querySelector('i').classList.add('show');
    }
})

document.addEventListener('mouseout', (event) => {
    if(event.target.classList.contains('note')){
        event.target.querySelector('i').classList.remove('show');
    }
})

document.addEventListener('click', (event) => {
    if(event.target.classList.contains('fa-trash')){
        event.target.parentElement.remove();
        deleteFromLocalStorage(event.target.parentElement);
    }
})




























})
