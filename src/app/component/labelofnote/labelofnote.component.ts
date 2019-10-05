import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/service/note-service';
import { DataService } from 'src/app/service/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-labelofnote',
  templateUrl: './labelofnote.component.html',
  styleUrls: ['./labelofnote.component.scss']
})
export class LabelofnoteComponent implements OnInit {
  noteArr: any[];
  @Input() noteLabel: any;
  constructor(private noteService: NoteService, private dataService: DataService,private snackBar:MatSnackBar) { }

  ngOnInit() {
    console.log(this.noteLabel)
    this.noteService.getRequest("getlebelofnote?noteId=" + this.noteLabel.noteId).subscribe((response: any) => {
      this.noteArr = response;
      console.log(response);

    })


   // this.dataService.changeMessage('');
  }

  removeLabel(label){
console.log("label is removed"+label.labelName);
console.log("Note id"+this.noteLabel.noteId)
console.log("label ID:"+label.labelId)

//console.log("Label id"+label.labelId)
//removefromnote?labelId=15&noteId=14
this.noteService.putRequest("removefromnote?labelId="+label.labelId+"&noteId="+this.noteLabel.noteId,"").subscribe((response:any)=>{
if(response.statusCode===100)
 {
  this.dataService.changeMessage('app Achive Note')

  this.snackBar.open(
    
    "Label is removed Successfully",
    "undo",
    { duration: 2500 }
  )
  
 }
 else{
  this.snackBar.open(
    
    "Label is removed failed",
    "undo",
    { duration: 2500 }
  )
 }
})
  }

}
