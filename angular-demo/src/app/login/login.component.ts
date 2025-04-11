import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    
  // message = ''

  // loginId = ''

  // password = ''

  form: any = {
    data: {},
    message: ''
  }


  constructor(private httpservice: HttpServiceService , public router: Router, private route: ActivatedRoute){

  }
  signIn() {

    var self = this
    this.httpservice.post('http://localhost:8080/Auth/login', this.form.data, function (res: any) {

      console.log('res => ', res)

      self.form.message = '';
      self.form.inputerror = {};

      if (res.result.message) {
        self.form.message = res.result.message;
      }

      if (!res.success) {
        self.form.inputerror = res.result.inputerror;
      }

      if (res.success && res.result.data != null) {
        localStorage.setItem('firstName', res.result.data.firstName)
        localStorage.setItem('roleName', res.result.data.roleName)
        localStorage.setItem('id', res.result.data.id)
        self.router.navigateByUrl('welcome');
      }
    })
  }
    // signIn(){
  //   console.log('in sign in method')

  //   if(this.loginId == 'admin' && this.password =='admin'){
  //     console.log('Login ID: ', this.loginId)
  //     console.log('Password: ', this.password)
  //     this.route.navigateByUrl('welcome')
  //   }else{
  //     this.message = 'login & password is invalid'
  //   }

  signUp(){
    this.router.navigateByUrl('signup')
  }
}

  

  
