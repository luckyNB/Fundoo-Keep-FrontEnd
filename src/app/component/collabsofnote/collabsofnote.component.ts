import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/service/note-service';

@Component({
  selector: 'app-collabsofnote',
  templateUrl: './collabsofnote.component.html',
  styleUrls: ['./collabsofnote.component.scss']
})
export class CollabsofnoteComponent implements OnInit {

  collabNote:any;
  @Input() noteLabel: any;
  constructor(private noteService:NoteService) { }

  ngOnInit() {
    console.log("In all Collaborator list of note");
    console.log(this.noteLabel.noteId);
this.noteService.getRequest("getAllCollaboratedNotes").subscribe((response:any)=>{
  this.collabNote=response;
  console.log(this.collabNote)
})
  }

}
