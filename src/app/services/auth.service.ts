import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/authResponse';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiKey="AIzaSyBcXvpXGGVkzPKD2WZSdC-WBLLW5awrxYM";
  urlRegister= "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+this.apiKey;
  urlLogin = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+this.apiKey;
  user =new BehaviorSubject<User | null>(null);
  constructor(private http : HttpClient) { }

  register(email:String,password:String){
    return this.http.post<AuthResponse>(this.urlRegister,{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(
      tap(response => {
        this.handleUser(response.email,response.localId,response.idToken,response.expiresIn);
      }),
      catchError(this.handleError)
    );
  }

  login(email:String,password:String){
    return this.http.post<AuthResponse>(this.urlLogin,{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(
      tap(response => {
        this.handleUser(response.email,response.localId,response.idToken,response.expiresIn);
      }),
      catchError(this.handleError)
    );
  }
  autoLogin(){
    if(localStorage.getItem("user") == null){
      return;
    }
    const user= JSON.parse(localStorage.getItem("user") || "{}");
    const loadedUser = new User(user.email,user.id,user._token,new Date(user._tokenExpirationDate));
    if(loadedUser.token){
      this.user.next(loadedUser);
    }
  }
  private handleError(err: HttpErrorResponse){
    let message = "Bir hata oluştu";
    if(err.error.error){
      switch(err.error.error.message){
        case "EMAIL_EXISTS":
          message = "Bu email adresi zaten kullanımda";
          break;
        case "EMAIL_NOT_FOUND":
          message = "Bu email adresi kayıtlı değil";
          break;
        case "INVALID_PASSWORD":
          message = "Şifre hatalı";
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          message = "Çok fazla hatalı giriş denemesi yapıldı. Lütfen daha sonra tekrar deneyin";
          break;
      }
  }
    return throwError(() => message);
  }
  private handleUser(email:string, localId:any, idToken: any, expiresIn:String){
    const expirationDate = new Date(new Date().getTime() + (+expiresIn * 1000));//fazldan + işareti number'a çeviriyor
        const user = new User(
          email,
          localId,
          idToken,
          expirationDate
        );
        this.user.next(user);
        localStorage.setItem("user",JSON.stringify(user));
  }
  logOut(){
    this.user.next(null);
    localStorage.removeItem("user");
  }
}
