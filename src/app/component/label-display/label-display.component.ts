import { Component, OnInit } from '@angular/core';
import { LabelService } from 'src/app/service/label-service';
import { NoteService } from 'src/app/service/note-service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogLabelComponent } from '../dialog-label/dialog-label.component';

@Component({
  selector: 'app-label-display',
  templateUrl: './label-display.component.html',
  styleUrls: ['./label-display.component.scss']
})
export class LabelDisplayComponent implements OnInit {
  label: any[];
  data: any[];
  message: any;
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
          console.log(this.label, "gdfgdsgsd")
      
      }

    )

  }

  opendialogLabel():void{
const dialogRef=this.dialog.open(DialogLabelComponent);
console.log("Dialog is created")
  }



}
