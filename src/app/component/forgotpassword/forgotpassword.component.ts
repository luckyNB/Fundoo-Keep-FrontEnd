import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/service/http-service';
import { MatSnackBar } from '@angular/material';
import { forgotPassword } from "src/app/model/forgotPassword-model";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  forgot: forgotPassword = new forgotPassword()
  emailId: string;
  forgotpasswordForm: FormGroup;
  constructor(private snackBar: MatSnackBar,
    private httpservice: HttpService,
    public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.forgotpasswordForm = this.formBuilder.group(
      {
        // 'emailId':new FormControl(this.emailId,[Validators.required])
        'emailId': new FormControl(this.forgot.emailId, [Validators.required])

      }
    )
  }

  onSubmit() {

    this.httpservice.postRequest("forgotpassword",this.emailId).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          console.log(response);
          this.snackBar.open(
            "Link sent Successfully",
            "undo",
            { duration: 2500 }
          )
        } else {
          console.log(response);
          this.snackBar.open(
            "Password Setting Failed",
            "undo",
            { duration: 2500 }
          )
        }
      }
    )
  }

}