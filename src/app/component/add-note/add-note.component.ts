import { Component, OnInit } from '@angular/core';
import { Note } from "src/app/model/note-model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { NoteService } from "../../service/note-service";
import { ActivatedRoute, Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataService } from 'src/app/service/data.service';
//App comp
//App comp

@Component({

  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent  {
  private popup: boolean;
  message:string;
  constructor(private noteServie: NoteService,
     private mattooltip: MatTooltipModule,
      private router: Router,
       private formBuilder: FormBuilder, 
       private snackbar: MatSnackBar,
      private dataService:DataService) { }

  private flag = false;
  colors: String = "white";
  title: any = "";
  description: any = "";

  note: Note = new Note();


  ngOnInit() {
    this.dataService.currentMessage.subscribe(
      (response:any)=>{
        this.message=response;
      
        
      }
    )
    


  }
  onPopup() {  
    this.popup = true
  }

  close() {
    console.log("onClose():: executed");
    console.log(this.note.title);
    this.noteServie.postRequest("createNote", this.note).subscribe(
      (respose: any) => {
        if (respose.statusCode === 100) {
          this.dataService.changeMessage('app Note')
          console.log(respose);
          this.snackbar.open(
            "Note is created Successfully",
            "undo",
            { duration: 2500 }
          )
          this.note.title=null;
          this.note.description=null;
          this.popup = false;
        }
        else {
          console.log(respose);

          this.snackbar.open(
            "Note creation Failed",
            "undo",
            { duration: 2500 }
          )
        }

      }

    )
    // this.note.title==null;
    // this.note.description==null;
    // this.popup = false;

  }

  deleteNote(){

    console.log("onDeleted():: executed");
    console.log(this.note.title);
    this.noteServie.postRequest("noteTrashed", this.note).subscribe(
      (respose: any) => {
        if (respose.statusCode === 200) {
          this.dataService.changeMessage('app Note')
          console.log(respose);
          this.snackbar.open(
            "Note is deleted Successfully",
            "undo",
            { duration: 2500 }
          )
        }
        else {
          console.log(respose);

          this.snackbar.open(
            "Note deletion Failed",
            "undo",
            { duration: 2500 }
          )
        }

      }

    )

  }
}


