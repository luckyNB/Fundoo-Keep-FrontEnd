import { Component, OnInit, Inject } from '@angular/core';
import { Label } from 'src/app/model/label-model';
import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { LabelService } from "../../service/label-service";

import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-dialog-label',
  templateUrl: './dialog-label.component.html',
  styleUrls: ['./dialog-label.component.scss']
})
export class DialogLabelComponent implements OnInit {
  //  labelId:number
  //  labelName:string
  labels: Label = new Label();
  message: any;
  constructor(
    private snackBar: MatSnackBar,
    private labelsService: LabelService,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  label: any;

  labelData: Label = new Label();
  ngOnInit() {

    //  this.dataService.currentMessage.subscribe(
    //   (response:any)=>{
    //      this.message=response;


  }
  createlabel() {

    this.labelsService.postRequest('createLabel', this.labelData).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.dataService.changeMessage('app Achive Note')

          this.snackBar.open(
            "Label created Successfully",
            "undo",
            { duration: 2500 }
          )
        } else {
          console.log(response);
          this.snackBar.open(
            "Label creation Failed",
            "undo",
            { duration: 2500 }
          )
        }

      }
    )
  }
  deleteLabel(items) {
    console.log(items.labelId);

  }


}