import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { NoteService } from 'src/app/service/note-service';
import { FormControl } from '@angular/forms';
import {  Collaborator} from "../../model/collaborator";
import { DataService } from "../../service/data.service";
@Component({
  selector: 'app-collab-dialog',
  templateUrl: './collab-dialog.component.html',
  styleUrls: ['./collab-dialog.component.scss']
})
export class CollabDialogComponent implements OnInit {
collaboratedUser:any[];
message:any
  constructor(private snackBar: MatSnackBar,
    private noteservice: NoteService,
   private dataService:DataService, @Inject(MAT_DIALOG_DATA) public data: any) { }

emailId:any;
  //emailId=localStorage.getItem("email");
    title = new FormControl(this.data.title);
    description = new FormControl(this.data.description);
    id = this.data.noteId;
collaborator:Collaborator=new Collaborator();


  ngOnInit() {
    this.emailId=localStorage.getItem("email");
    console.log(this.emailId)
    console.log(this.data.noteId);

    this.dataService.currentMessage.subscribe(
      (response:any)=>{
        this.message=response;
        
      
        
      }

    )
    


this.noteservice.getRequest("getAllCollaboratedUser?noteId="+this.data.noteId).subscribe((response:any)=>{
  this.collaboratedUser=response;
  console.log(this.collaboratedUser)
})




  }
  addCollab(){
    console.log("Collaborator is added "+this.id);
    console.log("Collaborator is"+this.collaborator.emailId)

this.noteservice.postRequest("notes/addcollaborator?emailId="+this.collaborator.emailId+"&noteId="+this.id,"").

subscribe((response:any)=>{
  console.log("api hitted")
  if (response.statusCode === 200) {
    
    console.log(response);
    this.snackBar.open(
      "Note is collaborated Successfully",
      "undo",
      { duration: 2500 }
    )
  }
})
}
}
