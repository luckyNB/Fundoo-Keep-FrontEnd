import { Component, OnInit } from '@angular/core';
import { NoteService } from "../../service/note-service";
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-trash-note',
  templateUrl: './trash-note.component.html',
  styleUrls: ['./trash-note.component.scss']
})
export class TrashNoteComponent implements OnInit {
  note: any[];
  message:string;

  constructor(private noteService: NoteService, 
    private matDialog: MatDialog,
     private snackBar: MatSnackBar,
     private dataService:DataService) { }

  ngOnInit() {
    console.log("get all trashed notes");
    
// this.noteService.getRequest("getTrashedNotes").subscribe((response: any) => {
    //   console.log(response);
    //   this.note = response;
    // })
    // this.dataService.changeMessage

    this.dataService.currentMessage.subscribe(
      (response:any)=>{
        this.message=response;
        this.getAllTrashedNotes();
        
      }
    )

  }
  deleteNote(id) {
    console.log("note delete permanently");
    console.log("Note ID" + id);

    this.noteService.deleteRequest("noteDeleted?noteId=" + id).subscribe(

      (response: any) => {
        if (response.statusCode === 200) {
          this.dataService.changeMessage('Trash Note')
          console.log()
          this.snackBar.open(
            "Note deleted Successfully",
            "undo",
            { duration: 2500 }
          )

        } else {
          this.snackBar.open(
            "Notes deletion  failed",
            "undo",
          )
        }

      }
    )

    //this.dataService.changeMessage('');

  }


  getAllTrashedNotes(){
    this.noteService.getRequest("getTrashedNotes").subscribe((response: any) => {
     // this.dataService.changeMessage('Trash Note')
        console.log(response);
       this.note = response;
   } )
  }

  onRestore(id){
    console.log("note delete permanently");
    console.log("Note ID" + id);

    this.noteService.putRequest("noteTrashed?noteId=" + id,'').subscribe(

      (response: any) => {
        if (response.statusCode === 200) {
          console.log()
          this.snackBar.open(
            "Note untrashed Successfully",
            "undo",
            { duration: 2500 }
          )

        } else {
          this.snackBar.open(
            "Notes untrashed  failed",
            "undo",
          )
        }

      }
    )
    //this.dataService.changeMessage('');
  }

}
