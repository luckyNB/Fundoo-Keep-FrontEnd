import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NoteService } from "../../service/note-service";
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
  @Input() noteData: any;

  constructor(private dataService:DataService,  private snackBar: MatSnackBar,
    private noteservice: NoteService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  note: any;
  title = new FormControl(this.data.title);
  description = new FormControl(this.data.description);
  id = this.data.noteId;
  
  ngOnInit() {

  }


  onClose() {
    console.log("note Udapted");
    console.log(this.note);
    console.log("Note IDDD"+this.id);
    this.note = {
      'title': this.title.value,
      'description': this.description.value
    }

    this.noteservice.putRequest("updateNote?noteId=" + this.id, this.note).subscribe(
      (response: any) => {
        if (response.statusCode === 10) {
          this.dataService.changeMessage('app Achive Note')

          console.log(response);
          this.snackBar.open(
            "Notes Created",
            "undo",
            { duration: 2500 }

          )

        } else {
          console.log(response);
          this.dataService.changeMessage('app Achive Note')

          this.snackBar.open(
            "Notes not created",
            "undo",
            { duration: 2500 }
          )
        }
      }
    )
    this.note.title = null;
    this.note.description = null;



  }

}
