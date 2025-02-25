import { Component } from '@angular/core';
import { AuthService } from './services/login/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title: string = 'lscAdmin';
  isAuthenticated: boolean = true;

  constructor(private auth: AuthService, private router: Router){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAuthenticated = event.url !== '/login';
      }
    });
  }
 

  ngDoCheck(){
    this.isAuthenticated = this.auth.isAuthenticated()
  }

  logout(){
    this.auth.logout();
  }

}
