import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoteService } from 'src/app/service/note-service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-imagedialog',
  templateUrl: './imagedialog.component.html',
  styleUrls: ['./imagedialog.component.scss']
})
export class ImagedialogComponent implements OnInit {
  uploadForm: FormGroup;
  message:string;
  imageChangedEvent: any ;
  croppedImage: any = '';
  constructor(public dialogRef: MatDialogRef<ImagedialogComponent>,
    private noteService:NoteService,private formBuilder:FormBuilder,
    private dataService:DataService, @Inject(MAT_DIALOG_DATA) public data: any ) { }

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
  


  // this.noteService.uploadImage('uploadprofilepic', this.uploadForm.get('profile').value).subscribe(
  //   (res) => console.log(res),
  //   (err) => console.log(err)
  //   );
  //   this.dialogRef.close( ' profile dialog closed ' );
  //   this.dataService.changeMessage('app Note')






    onSubmit() {
      console.log("Image uploaded to note successfully")
           console.log(this.data)

          //  storage/uploadFile?noteId=34
      }
    

  close(){
    this.dialogRef.close();
  }

}
