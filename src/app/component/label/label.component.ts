import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { LabelService } from 'src/app/service/label-service';
import { MatDialog } from "@angular/material";
import { DialogLabelComponent } from "./../dialog-label/dialog-label.component";
import { NoteService } from 'src/app/service/note-service';
import { Label } from 'src/app/model/label-model';


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {
  label: any[];
  data: any[];
  message: any;
  editLabel:Label=new Label();
  constructor(private labelsService: LabelService, private noteService: NoteService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit() {
    //
    console.log("got labels")

    this.noteService.getRequest("label/getlabel").subscribe(
      (response: any) => {
        console.log("got labels")
        this.label = response,
          console.log(this.label)
        // this.dataService.changeMessage('label')
      }

    )

  }

  opendialogLabel(): void {
    const dialogRef = this.dialog.open(DialogLabelComponent,
      {
        width: '350px',
        height: '800px'
      });
    console.log("Dialog is created")
  }

  onEditLabel(labels) {
    console.log("Label is id" + labels.labelId)
    console.log("Label is updated" + labels.labelName)
    console.log("Label is deleted" + labels.labelId)
    this.noteService.putRequest("updateLabel?labelId="+labels.labelId,labels).subscribe(response => {
      if (response.statusCode === 100) {
        console.log(response);
        this.snackBar.open(
          "Note is updated Successfully",
          "undo",
          { duration: 2500 }
        )
      }
      else{
        this.snackBar.open(
          "Note is updation Failed",
          "undo",
          { duration: 2500 }
        )
      }

    })
    
  }
  onDeleteLabel(labels) {

    console.log("Label is deleted" + labels.labelId)
    this.noteService.deleteRequest("deleteLabel?labelId="+labels.labelId).subscribe(response => {
      if (response.statusCode === 100) {
        console.log(response);
        this.snackBar.open(
          "Note is deleted Successfully",
          "undo",
          { duration: 2500 }
        )
      }
      else{
        this.snackBar.open(
          "Note is delettion Failed",
          "undo",
          { duration: 2500 }
        )
      }

    })

  }



}












