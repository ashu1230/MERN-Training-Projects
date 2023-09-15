// ES 6
class Note {

  constructor(noteObject){
    for(let key in noteObject) {
      this[key] = noteObject[key];
    }
    this.isMarked = false;
  }

  toggleMark(){
    console.log("marks");
    this.isMarked = !this.isMarked;
  }

  editMark() {
    this.isMarked = !this.isMarked;
  }


}
export default Note;