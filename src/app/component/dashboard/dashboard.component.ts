import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material';
import { DialogLabelComponent } from "../dialog-label/dialog-label.component";
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import { DataService } from 'src/app/service/data.service';
import { elasticSearch } from "../../model/elasticSearch";
import { ViewService } from '../../service/view.service'
//import { from } from 'rxjs';
import { NoteService } from 'src/app/service/note-service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  email: string;
  token: string;
  firstName: string;
  message: any;
  toggle: boolean = true;
  searchData: elasticSearch = new elasticSearch();

  label:any
  private obtainNotes = new BehaviorSubject([]);
  currentMessage = this.obtainNotes.asObservable();
  
  constructor(private router: Router, private view: ViewService,
    private matDialog: MatDialog,
    private dataService: DataService, private noteService: NoteService,private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token')
    this.email = localStorage.getItem('email')
    this.firstName = localStorage.getItem('firstName');


    this.dataService.currentMessage.subscribe(
      (response: any) => {
        this.message = response;
        this.getLabels();
      }
    );
  }
  getLabels() {
    console.log("Dash bord Labels are got na bro")

    this.noteService.getRequest("label/getlabel").subscribe((response:any)=>{
      this.label=response;
      console.log(this.label)
    })
   }

  openDialog(items: any): void {
    const dialogRef = this.matDialog.open(DialogLabelComponent, {
      data: {
        title: items.title,
        description: items.description,
        noteId: items.id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog result:${result}');
    });

  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }


  profileDialog(): void {
    const dialogRef = this.matDialog.open(ProfileDialogComponent, {
      width: '70%', height: '85%'
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('dialog result:${result}');
    });

  }
  list() {
    this.toggle = false;
    this.view.gridview(this.toggle);
  }
  grid() {
    this.toggle = true;
    this.view.gridview(this.toggle);
  }


  opendialogLabel():void{
    const dialogRef=this.dialog.open(DialogLabelComponent);
    console.log("Dialog is created")
      }
    


  onSearchChange(message: string) {
    console.log("search is message that:" + message)
    this.noteService.getRequest("search?query=" + message).subscribe(
      (response: any) => {
        this.obtainNotes.next(response);
        console.log(response);
        this.router.navigate(['/dashboard/search']);
      }
    );
  }
}













//   gridview(result)
//   {
//   this.toggle=result
//   if(this.toggle==false)
//   {
//   // this.result=false;
//  // this.subject.next({data:"column"});
//   // this.result = false;
//   // console.log(this.result)
//   // return this.subject.asObservable();
//   }
//   else
//   {
//   //this.subject.next({data:"row"});
//   // return this.subject.asObservable();
//   // this.result = true;
//   }
//   }
//   g


