import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/service/note-service';
import { MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-reminderofnote',
  templateUrl: './reminderofnote.component.html',
  styleUrls: ['./reminderofnote.component.scss']
})
export class ReminderofnoteComponent implements OnInit {
  @Input() noteLabel: any;
  constructor(private noteService:NoteService,private snackBar:MatSnackBar,private dataService:DataService) { }

  ngOnInit() {
    console.log("Reminder of note "+this.noteLabel)
  }

  removeReminder(noteReminder) {
    console.log("Note Reminder removed success" + noteReminder.noteId)
    this.noteService.putRequest("notes/removereminder?noteId=" + noteReminder.noteId, "").subscribe((response: any) => {
if(response.statusResponse===200){
  this.dataService.changeMessage('app Note')

  this.snackBar.open("Note deremindered Successfully");
}
    })

  }

}
