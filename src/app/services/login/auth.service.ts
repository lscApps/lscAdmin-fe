import { firstValueFrom } from 'rxjs';
import { Injectable} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/user`;
  private loggedUser?: User;

  private authenticator = false;
  private isLoginPage = false;

  constructor(private http: HttpClient, private router: Router) {}


  async login(user: User){
    let url = `${this.apiUrl}/login`;
    await firstValueFrom(this.http.post<User>(url, user)).then(
     response =>{ 
      this.authenticator = true;
      this.loggedUser = response!;
    }, e =>{
      if(e.status == HttpStatusCode.Forbidden){
        console.error("Wrong Credentials ", e.error.message)
      }else{
        console.error("Login Failed: ", e)
      }
    });
    return this.authenticator;    
  }; 


  logout() {
    this.authenticator = false;
    this.router.navigate(['/login']);
  }

  getLoggedUser(){
    return this.loggedUser;
  }

  getToken(){
    return this.loggedUser ? this.loggedUser.token : undefined;
  }

  getAuthorizationHeader(){
    const httpHeaders = new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`          
        });

    return {
      headers: httpHeaders,
      withCredentials: true
    }
  }

  isAuthenticated(): boolean {
    this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            this.isLoginPage = event.url == '/login'; // Esconde o header na página de login
          }
        })


    if(!this.authenticator &&  !this.isLoginPage){
      this.router.navigate(['/login']);
    }
    return this.authenticator;
  }
}
