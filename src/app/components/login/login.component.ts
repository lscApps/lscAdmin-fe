import { AuthService } from './../../services/login/auth.service';
import { Component, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  user?: User;
  loginForm: FormGroup;
  loginFailed: boolean = false;

  constructor(private authService: AuthService, private router: Router,private fb: FormBuilder){
     this.loginForm = this.startForm()
    }

  startForm(){
    return this.fb.group({
          username: ['', [Validators.required]],
          password: ['', [Validators.required]]
    
        })
  }

  async login(){
    this.user = new User(this.getUsername(), this.getPassword());
    let loginSuccess: boolean = await this.authService.login(this.user);
    
    if(loginSuccess){
        console.log('Login success')
        this.router.navigate(['/records'])
    }else{
      console.log('Login failed')
      this.showAlert();
    }

  }

  ngOnInit(): void {
    
  }

  getUsername(): string{
    return this.loginForm.get('username')?.value;
  }

  getPassword(): string{
    return this.loginForm.get('password')?.value;
  }

  showAlert(){
    this.loginFailed = true;
    setTimeout(() => {
      this.loginFailed = false;
    }, 10000);
  }

}
