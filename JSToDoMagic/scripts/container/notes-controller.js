// Controler i/o + event handlling + talk to services

import {noteOpration} from '../services/note-service.js'
import db from '../services/firebase.js';
window.addEventListener('load', init);

function init() {
   bindEvent();
  showCount();
  disablebtnupdt();
  disabletbn();
}


const enablebtn=()=>document.querySelector('#delete').disabled = false;
const disabletbn=()=>document.querySelector('#delete').disabled = true;

const enablebtnupdt=()=>document.querySelector('#update').disabled = false;
const disablebtnupdt=()=>document.querySelector('#update').disabled = true;

  // const ids = ['delete', 'update'];
  // const enablebtn = () => ids.forEach(id => document.getElementById(id).disabled = false);
  // const dicabletbn = () => ids.forEach(id => document.getElementById(id).disabled = true);


function bindEvent(){
  document.querySelector('#add').addEventListener('click', addNote);
  document.querySelector('#delete').addEventListener('click', deleteMarked);
  document.querySelector('#clearAll').addEventListener('click', clearAll);
  document.querySelector('#saveTask').addEventListener('click', saveTask);
  document.querySelector('#update').addEventListener('click', updateTask);
  // document.querySelector('#byTitle').addEventListener('click', myFunction);
  // document.querySelector('#sort').addEventListener('click', sortTasks);
  document.querySelector('#clicked').addEventListener('clicked', storeData)

}

function showCount(){
  noteOpration.marktotal()>0?enablebtn():disabletbn();
  document.querySelector('#total').innerHTML = noteOpration.total();
  document.querySelector('#marktotal').innerHTML = noteOpration.marktotal();
  document.querySelector('#unmarktotal').innerHTML = noteOpration.unmarktotal();
  noteOpration.total();
}

// function search() {
//   const value = prompt("enter id");
//   if(value == ""){
//     alert("Write Id Or Task Title");
//   }
//   else{
//     alert("");
//   }
// }


function deleteMarked() {
  noteOpration.remove();
  printNotes(noteOpration.getNotes());
}

function addNote() {
  //read id, title, desc, date of completion, importance.
  const Fields = ["ID", "TITLE", "DESC", "CD", "IMP"];
  // const id = document.querySelector('#ID').ariaValueMax;
  // const title = document.querySelector('#TITLE').ariaValueMax;
  // const desc = document.querySelector('#DESC').ariaValueMax;
  const noteObject = {}; //Object Litral
  for (let Field of Fields ) {
  // let- good practice block level scope i.e only for.
    noteObject[Field] = document.querySelector(`#${Field}`).value.trim();
  }
  noteOpration.add(noteObject);
  printNote(noteObject);
  showCount();
}

// for security purpose to make an icon function.
function printIcon(myClassName = 'trash', fn, id){
  // <i class="fa-solid fa-pen-to-square"></i>
  // <i class="fa-solid fa-trash fa-beat-fade" style="color: #1765ee;"></i>
  const iTag = document.createElement('i');
  // create a new attribute...
  iTag.setAttribute('note-id', id);
  iTag.className = `fa-solid fa-${myClassName} me-3 hand`;
  iTag.addEventListener("click", fn)
  return iTag; 
}

function toggleMark() {
  // console.log("toggel mark...", this);
  const icon = this;
  const ID= this.getAttribute('note-id');
  // console.log("mai bhi aya ab bolo");
  noteOpration.toggleMark(ID);
  const tr = icon.parentNode.parentNode;
  // tr.className = 'table-danger';
  tr.classList.toggle('table-danger');
  showCount();
}

function printNotes(notes){
  const tbody = document.querySelector('#notes');
  tbody.innerHTML ='';
  notes.forEach(note => printNote(note));
  showCount();
  disablebtnupdt();
}

function printNote(noteObject) {
  const tbody = document.querySelector('#notes');
  const row = tbody.insertRow();  //<tr>
  for(let key in noteObject){
    if(key == 'isMarked') {
      continue;
    }
    const td = row.insertCell();  //<td>
    td.innerText = noteObject[key];
  }
  const td = row.insertCell();
  // console.log("pahle hi aya "+ noteObject.ID)
  td.appendChild(printIcon('trash', toggleMark, noteObject.ID));
  td.appendChild(printIcon('pen-to-square', editMark, noteObject.ID));
  disablebtnupdt();
}

function clearAll() {
  document.querySelectorAll("td").forEach(function (data) {
    data.parentNode.remove();
  });
}

function saveTask() {
  if (window.localStorage) {
    localStorage.notes = JSON.stringify(noteOpration.getNotes());
    alert("Saved...");
  } else {
    alert("Ur Browser is Outdated not support localStorage...");
  }
}

// Edit the note...
let noteObject;
function editMark() {
  //click on button of edit..
  enablebtnupdt();
  let ID = this.getAttribute("note-id");
  const icon = this;
  const tr = icon.parentNode.parentNode;
  tr.classList.toggle('table-success');
  console.log(ID);
  noteObject = noteOpration.searchById(ID);
  for (let key in noteObject) {
    console.log(key);
    if (key == "isMarked") {
      continue;
    }
    document.querySelector(`#${key}`).value = noteObject[key];
  }
  enablebtnupdt();
  console.log("I am edit");
  showCount();
}
// Update The Note..
function updateTask() {
  console.log("I am updateTask");
  for (let key in noteObject) {
    console.log("I am updateTask1");
    if (key == "isMarked") {
      continue;
    }
    console.log("I am updateTask2");
    noteObject[key] = document.querySelector(`#${key}`).value;
  }
  console.log("I am updateTask3");
  // ham kya pass karaye yaha
  printNotes(notes);
  enablebtnupdt();
}



// // ID sort
// function sortList() {
//   var list, i, switching, b, shouldSwitch;
//   list = document.getElementById("id01");
//   switching = true;
//   /* Make a loop that will continue until
//   no switching has been done: */
//   while (switching) {
//     // start by saying: no switching is done:
//     switching = false;
//     b = list.getElementsByTagName("LI");
//     // Loop through all list-items:
//     for (i = 0; i < (b.length - 1); i++) {
//       // start by saying there should be no switching:
//       shouldSwitch = false;
//       /* check if the next item should
//       switch place with the current item: */
      
//       if (Number(b[i].innerHTML) > Number(b[i + 1].innerHTML)) {
//         /* if next item is numerically
//         lower than current item, mark as a switch
//         and break the loop: */
//         shouldSwitch = true;
//         break;
//       }
//     }
//     if (shouldSwitch) {
//       /* If a switch has been marked, make the switch
//       and mark the switch as done: */
//       b[i].parentNode.insertBefore(b[i + 1], b[i]);
//       switching = true;
//     }
//   }
// }

// // TITLE sort
// function sortListDir() {
//   var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
//   list = document.getElementById("id01");
//   switching = true;
//   dir = "asc"; 
//   while (switching) {
//     switching = false;
//     b = list.getElementsByTagName("LI");
//     for (i = 0; i < (b.length - 1); i++) {
//       shouldSwitch = false;
//       if (dir == "asc") {
//         if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
//           shouldSwitch = true;
//           break;
//         }
//       } else if (dir == "desc") {
//         if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
//           shouldSwitch= true;
//           break;
//         }
//       }
//     }
//     if (shouldSwitch) {
//       b[i].parentNode.insertBefore(b[i + 1], b[i]);
//       switching = true;
//       switchcount ++;
//     } else {
//       if (switchcount == 0 && dir == "asc") {
//         dir = "desc";
//         switching = true;
//       }
//     }
//   }
// }

// // search 
// function myFunction() {
//   var input, filter, td, tr, a, i, txtValue;
//   input = document.getElementById('myInput');
//   filter = input.value.toUpperCase();
//   td = document.getElementById("tr");
//   tr = td.getElementsByTagName('tr');
//   for (i = 0; i < tr.length; i++) {
//     a = tr[i].getElementsByTagName("a")[0];
//     txtValue = a.textContent || a.innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       tr[i].style.display = "";
//     } else {
//       tr[i].style.display = "none";
//     }
//   }
// }

// // sort not working..
// function sortTasks() {
//   noteOpration.sort();
//   printNotes();

// // ham kya pass karaye yaha
// }



// Save on server.
function storeData () {
  console.log("Saved");
  db.collection("notes").add({'01':noteOpration.getNotes()}).than((docRef) => {
    console.log("Data saved Successfully with ID: ", docRef.id);
  })
  .catch((error) => {
    console.log("Error Saving Data: ", error);
  });
}

