  import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http-service'

import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserModel } from 'src/app/model/user-model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: UserModel = new UserModel();
  registerForm: FormGroup;
  message:any;
  constructor(private snackBar: MatSnackBar, 
    private httpservice: HttpService,
     public formBuilder: FormBuilder,
     private dataService:DataService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        'firstName': new FormControl(this.user.firstName, [Validators.required]),
        'lastName': new FormControl(this.user.lastName, [Validators.required]),
        'emailId': new FormControl(this.user.emailId, Validators.required),
        'password': new FormControl(this.user.password, [Validators.required, Validators.minLength(6)]),
        'mobileNumber': new FormControl(this.user.mobileNumber, [Validators.required])
      },
      

      this.dataService.currentMessage.subscribe(
        (response:any)=>{
          this.message=response;
        
        }
      )


    )

  }

  onRegister() {
    console.log(this.user);
    console.log("Registration");
    this.httpservice.postRequest('register', this.user).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          console.log(response);
          this.snackBar.open(
            "Registered Successfully",
            "undo",
            { duration: 2500 }
          )
        } else {
          console.log(response); 
          this.snackBar.open(
            "Registration Failed",
            "undo",
            { duration: 2500 }
          )
        }

      }
    )
  }
}