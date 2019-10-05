import { Component, OnInit, Input, Inject } from '@angular/core';

import { MatSnackBar, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NoteService } from "../../service/note-service";
import { error } from 'util';
import { TrashNoteComponent } from '../trash-note/trash-note.component';
import { DialogBoxComponent } from "../dialog-box/dialog-box.component";
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { DialogLabelComponent } from '../dialog-label/dialog-label.component';
import { HttpHeaders } from '@angular/common/http';
import { LabelService } from 'src/app/service/label-service';
import { splitNsName } from '@angular/compiler';
import { CollabDialogComponent } from '../collab-dialog/collab-dialog.component';
import { RemainderComponent } from '../remainder/remainder.component';
import { DateValueComp } from "../../model/DateValueComp";
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import { ImagedialogComponent } from '../imagedialog/imagedialog.component';

const httpOptions: any = {
  headers: new HttpHeaders({
    //'Content-Type':  'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'all',
    'Access-Control-Allow-Origin': '*'
  })
};


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  dateValue: DateValueComp = new DateValueComp();
  @Input() noteData: any;
  message: string;
  alllabel: any[];
  date: Date = new Date();


  constructor(private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private noteService: NoteService,
    private dataService: DataService,
    private labelService: LabelService) { }



  note: any;
  collabNotes: any

  ngOnInit() {

    this.dataService.currentMessage.subscribe(
      (response: any) => {

        this.message = response;
        this.allnotes();
        this.getAllLabels();
        this.getAllCollaboratedNotes();

      }
    )


  }

  getAllCollaboratedNotes() {
    console.log("collab notes got")
    this.noteService.getRequest("getAllCollaboratedNotes").subscribe((response: any) => {
      
      this.collabNotes = response;
      console.log(this.collabNotes)
      console.log("upside notes are collab notes got")

    })
  }
  setPickedDate(dataval) {
    console.log("picked Date is set" + this.dateValue.CalendarDate)
    this.noteService.putRequest("notes/addreminder?noteId=" + dataval.noteId + "&reminder=" + this.dateValue.CalendarDate, '').subscribe((response: any) => {
      this.dataService.changeMessage('app Note')

      console.log("Pick of date is success")
    })




  }




  noteImageDialog(items) {
    console.log(items.noteId)
    const dialogRef = this.matDialog.open(ImagedialogComponent, {
      data: {
        title: items.title,
        description: items.description,
        noteId: items.noteId

      }
    });

  }






  profileDialog(noteValues) {
    const dialogRef = this.matDialog.open(ImagedialogComponent, {
      width: '70%', height: '85%'
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('dialog result:${result}');
    });
  }

  setToday(dataval) {

    console.log(dataval.noteId);
    console.log("Todays date is been set ")
    const date = new Date().toDateString();
    console.log("Date added:" + date)
    //this.dateValue=date;

    let reminderDate = date + ', 8:00 ';

    console.log('in reminder1==>', reminderDate);

    this.noteService.putRequest("notes/addreminder?noteId=" + dataval.noteId + "&reminder=" + reminderDate, '').subscribe(
      (response: any) => {

        console.log("Note is remaindered successfully")
      })


  }

  setTomorrow(dataval) {
    console.log(dataval.noteId);
    console.log("Tomorrow date is been set ")
    var dte = new Date();
    dte.setDate(dte.getDate() + 2);
    console.log(dte.toString());
    this.noteService.putRequest("notes/addreminder?noteId=" + dataval.noteId + "&reminder=" + dte, '').
      subscribe((response: any) => {
        this.dataService.changeMessage('app Note')

        console.log("Note is remindered tommororr");
        console.log(response)

      })


  }


  setWeekly(dataval) {
    console.log(dataval.noteId);
    console.log("After week date is been set ")
    const date = new Date().toDateString();
  }





  removeReminder(noteReminder) {
    console.log("Note Reminder removed success" + noteReminder.noteId)
    this.noteService.putRequest("notes/removereminder?noteId=" + noteReminder.noteId, "").subscribe((response: any) => {
if(response.statusResponse===200){
  this.snackBar.open("Note deremindered Successfully");
}
    })

  }














  allnotes() {
    console.log("notes get all")
    this.noteService.getRequest("getAllNotes").subscribe(

      (response: any) => {


        console.log(response);


        this.note = response
        console.log("***************");
        console.log(this.note);
        // console.log(this.note.image )
      }
    )
  }
  getAllLabels() {

    this.noteService.getRequest("label/getlabel").subscribe((response: any) => {
      console.log("get All Label API is hitted")
      // this.dataService.changeMessage('app Note')

      //console.log(response);
      this.alllabel = response;
      console.log("Labels are got:" + response.labelId)
    })
  }

  trashNote(items) {
    console.log("Note Trashed" + items.noteId);
    console.log("note trash");
    console.log("Note ID");

    this.noteService.putRequest("noteTrashed?noteId=" + items.noteId, '').subscribe(

      (response: any) => {
        if (response.statusCode === 200) {
          this.dataService.changeMessage('app Note')
          console.log()
          this.snackBar.open(
            "Note moved to trash",
            "undo",
            { duration: 2500 }
          )

        } else {
          this.snackBar.open(
            "Notes trash  failed",
            "undo",
          )
        }

      }

    )
    // this.dataService.changeMessage('');

  }
  onArchive(items) {
    console.log("Note is archived");
    console.log("Note ID:" + items.noteId);
    this.noteService.putRequest("noteArchived?noteId=" + items.noteId, '').subscribe(

      (response: any) => {
        if (response.statusCode === 200) {
          this.dataService.changeMessage('app Achive Note')

          console.log()
          this.snackBar.open(
            "Note archived successfully",
            "undo",
            { duration: 2500 }
          )

        } else {
          this.snackBar.open(
            "Notes archive  failed",
            "undo",
          )
        }

      }
    )

    // this.dataService.changeMessage('');
  }

  pinNote(items) {

    console.log("Note is pinned Successfully" + items.noteId)
    this.noteService.putRequest("notePinned?noteId=" + items.noteId, "").subscribe((response) => {
      this.dataService.changeMessage('app Note')
      this.snackBar.open(


        response.statusMessage,
        "undo",

      )

    })
  }









  openDialog(items: any): void {
    console.log("NoteDialog" + items.noteId)
    const dialogRef = this.matDialog.open(DialogBoxComponent, {
      data: {
        title: items.title,
        description: items.description,
        noteId: items.noteId

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog result:${result}');
    });

  }
  openRemainderDialog(items: any): void {
    console.log("Remainder done")
    const dialogRef = this.matDialog.open(RemainderComponent, {
      width: '60%', minHeight: '20%',
      data: {
        title: items.title,
        description: items.description,
        noteId: items.noteId

      }
    });
  }










  openCollabsDialog(items: any): void {
    console.log("Collab Dialog" + items.noteId)

    const dialogRef = this.matDialog.open(CollabDialogComponent, {
      width: '60%', minHeight: '20%',

      data: {
        title: items.title,
        description: items.description,
        noteId: items.noteId
      }
    });

  }





  addLabelToNote(labels, items) {
    console.log("Add Label to Note");
    console.log("NoteId" + items.noteId);
    console.log("labelId" + labels.labelId);


    this.labelService.putRequest("addlebeltonote?labelId=" + labels.labelId + "&noteId=" + items.noteId, "").subscribe((response: any) => {
      if (response.statusCode === 100) {
        this.dataService.changeMessage('app LabelOfNote')
        console.log("label is added to note");
        this.snackBar.open(
          "label is added to note successfully",
          "undo",
          { duration: 2500 }
        )
      }
      else {
        console.log("label add failed");
        this.snackBar.open(
          "label addtion failed",
          "undo",
          { duration: 2500 }
        )
      }

    })
    // this.dataService.changeMessage('');
  }


  setcolors(colorName, noteId) {
    console.log("color is set" + colorName + "NOte ID  " + noteId);
    this.noteService.putRequest("notes/setcolor?color=" + colorName + "&noteid=" + noteId, "").subscribe((response: any) => {
      this.dataService.changeMessage('app Achive Note')

      console.log("color is successfully");
    })
  }






  openLabelDialog(items) {
    let dialogRef = this.matDialog.open(DialogLabelComponent, {
      width: '250px', height: '200',
      data: {
        title: items.title,
        description: items.description,
        noteId: items.id
      }

    });


  }



}

