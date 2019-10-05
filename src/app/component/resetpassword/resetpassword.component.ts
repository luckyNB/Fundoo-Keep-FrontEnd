import { Component, OnInit } from '@angular/core';
import { PasswordModel } from 'src/app/model/password-model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { HttpService } from 'src/app/service/http-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  password: PasswordModel = new PasswordModel();
  resetpasswordForm: FormGroup;
  token: string;

  constructor(private snackBar: MatSnackBar,
    private httpservice: HttpService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    console.log("onInit()::resetpassword")
    this.resetpasswordForm = this.formBuilder.group(
      {
        'newPassword': new FormControl(this.password.newPassword, [Validators.minLength(6)]),
        'confirmPassword': new FormControl(this.password.confirmPassword, [Validators.minLength(6)])
      }
    )
    //this.token = this.route.snapshot.paramMap.get('token');
    console.log(this.token)
  }
  onReset() {
    if (this.password.newPassword != this.password.confirmPassword) throw "Password and Confirm Password does not match";
    if (this.password.newPassword === '' || this.password.confirmPassword === '') throw "Empty fields";
    this.httpservice.putRequest("resetpassword/" + this.token, this.password).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          console.log(response);
          this.snackBar.open(
            "Password reset Successfully",
            "undo",
            { duration: 2500 }
          )
          // this.router.navigate(['/login'])
        } else {
          console.log(response);
          this.snackBar.open(
            "Password reset Failed",
            "undo",
            { duration: 2500 }
          )
        }
      }
    )

  }

}

