import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/service/note-service';
import { DataService } from "../../service/data.service";
@Component({
  selector: 'app-remainder',
  templateUrl: './remainder.component.html',
  styleUrls: ['./remainder.component.scss']
})
export class RemainderComponent implements OnInit {



  notes : any[];
  message: any;
  constructor(private noteService: NoteService , private dataService: DataService) { }

  ngOnInit() {
console.log("Reminder Notes got bro");
    this.dataService.currentMessage.subscribe(
      (response: any) => {
       this.getnotes();
      }
    );
  }
    getnotes() {
      this.noteService.getRequest("notes/getremindernotes").subscribe(
        (response : any) =>{
          this.notes = response;
          console.log("Remindered Notes")
          
          console.log(this.notes)
        }
      );
    }
}
