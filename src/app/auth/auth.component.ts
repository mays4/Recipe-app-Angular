import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isloginMode = true;
  isLoading=false;

  error:string |null= null;
  constructor(private authService:AuthService,private router:Router) { }

  onSwtchingMode(){
    this.isloginMode =!this.isloginMode
  }

  ngOnInit(): void {

  }
  onSubmit(form:NgForm){

    if(!form.valid){
      return
    }
     const email=form.value.email;
     const password = form.value.password;
     let authObs:Observable<AuthResponseData>
     this.isLoading=true;
     if(this.isloginMode){
       authObs = this.authService.login(email,password)

     }else{
       authObs = this.authService.signup(email,password)
     }
     authObs.subscribe(data=>{
      console.log(data)
      this.isLoading=false;
      this.router.navigate(['/recipes'])
     },errorMessage=>{
      console.log(errorMessage);
      this.error=errorMessage
      this.isLoading=false;
     })

    form.reset()
  }

}
