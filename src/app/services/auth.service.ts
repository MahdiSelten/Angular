import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  login(uname:String, pword:String)
  {
    if (uname==="Mahdi" && pword==="azerty")
    {
      return 200;
    }
    else
    {
      return 403;
    }
  }
  LogOut()
  {
    this.router.navigate(["Login"])
  }
}
