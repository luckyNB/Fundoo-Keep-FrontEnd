import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NoteService } from 'src/app/service/note-service';

import { ImageCropperModule, ImageCroppedEvent } from 'ngx-image-cropper';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {
  uploadForm: FormGroup;
  message:string;
  imageChangedEvent: any ;
  croppedImage: any = '';
  constructor(public dialogRef: MatDialogRef<ProfileDialogComponent>,
    private noteService:NoteService,private formBuilder:FormBuilder,
    private dataService:DataService ) { }

  ngOnInit() {

    this.dataService.currentMessage.subscribe(
      (response:any)=>{
        this.message=response;
        //this.getArchivedNotes();
        
      }
    )


    this.uploadForm = this.formBuilder.group({
      profile: ['']
      });
  }

  
  

    fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
      if (this.imageChangedEvent.target.files.length > 0) {
      const file = this.imageChangedEvent.target.files[0];
      this.uploadForm.get('profile').setValue(file);
      }
      }

      imageCropped(event) {
      this.croppedImage = event;
      
  }
  

  onSubmit() {
    this.dataService.changeMessage('app Note')


    this.noteService.uploadImage('uploadprofilepic', this.uploadForm.get('profile').value).subscribe(
    (res) => console.log(res),
    (err) => console.log(err)
    );
    this.dialogRef.close( ' profile dialog closed ' );
    this.dataService.changeMessage('app Note')

    }
  

  close(){
    this.dialogRef.close();
  }

}
