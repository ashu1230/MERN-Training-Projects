// // CRUD Operation.. + logic
// import Task from "../services/Fierbase.js";
import Note from '../models/note.js'
export const noteOpration = {
  notes:[],
  isAsc: true,
  add(noteObject) {
    const note = new Note(noteObject);
    this.notes.push(note);
    
  },

  searchById(id) {
    // console.log("search id mili "+id);
    return this.notes.find(note => note.ID == id);
  },

  toggleMark(id){
    // console.log("this.toggleMark "+id);
    this.searchById(id).toggleMark();
    // const noteObject = this.searchById(id);
    // noteObject.isMarked = !noteObject.isMarked;
  },

  getNotes() {
    return this.notes;
  },

  remove () {
    this.notes = this.notes.filter(note => !note.isMarked);
  },

  total(){
    return this.notes.length;
  },

  marktotal(){
    return this.notes.filter(note=>note.isMarked).length;
  },

  unmarktotal(){
    return this.total() - this.marktotal();
  },

  search() {

  },

  sort() {
    if (this.isAsc) {
      this.isAsc = !this.isAsc;
      return this.notes.sort((first, second) =>
        first.TITLE.localeCompare(second.TITLE)
      );
    } else {
      this.isAsc = !this.isAsc;
      return this.notes.sort((first, second) =>
        second.TITLE.localeCompare(first.TITLE)
      );
    }
  },



}