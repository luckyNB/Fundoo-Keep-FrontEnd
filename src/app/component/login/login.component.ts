import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http-service'

import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginModel } from 'src/app/model/login-model';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'util';
//login component
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: LoginModel = new LoginModel();
  loginForm: FormGroup;
  token:string
  emailId:string
  constructor(private snackBar: MatSnackBar, private httpService: HttpService, public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    
    this.loginForm = this.formBuilder.group({
      "emailId": new FormControl(this.login.emailId, Validators.required),
      "password": new FormControl(this.login.password, [Validators.required, Validators.minLength(6)])
    }
    )
    // this.token = this.route.snapshot.paramMap.get('token');
    // this.token=localStorage.setItem('token',this.token);
    // console.log("token  Daata:"+this.token);
  }
  onLogin() {
 
   console.log(+this.token);
    this.httpService.postRequest('login', this.login).subscribe(
    
      (response: any) => {
        if (!error && response.statusCode == 200) {
       
          localStorage.setItem('token',response.token);
          //this.token=localStorage.getItem('token')
        localStorage.setItem('email',this.login.emailId)
        

          this.router.navigate(['/dashboard'])
          this.snackBar.open(
            
            "Login Successfully",
            "undo",
            { duration: 2500 }
            
            
          )
          this.router.navigate(['/dashboard'])
        } else {
          console.log(response);
          this.snackBar.open(
            "Login Failed",
            "undo",
            { duration: 2500 }
          )
        }

      }
    )


  }
}