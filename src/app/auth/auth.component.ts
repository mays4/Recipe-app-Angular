import { Component, ComponentFactoryResolver, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isloginMode = true;
  isLoading=false;
 @ViewChild(PlaceHolderDirective) alertHost!:PlaceHolderDirective;
  error:string |null= null;
  private closeSub!: Subscription
  constructor(private authService:AuthService,private router:Router,private componentFactoryResolver:ComponentFactoryResolver) { }

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
      this.showErrorAlert(errorMessage)
      this.isLoading=false;
     })

    form.reset()
  }
  onCloseEvent(){
    this.error=null;
  }
  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
  private showErrorAlert(message:string){
    const alertCampFactory=this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    const hostAlertContainerRef = this.alertHost.viewContainerView;
    hostAlertContainerRef.clear();
    const componentRef = hostAlertContainerRef.createComponent(AlertComponent);
    componentRef.instance.message=message;
    this.closeSub = componentRef.instance.close.subscribe(()=>{
       this.closeSub.unsubscribe();
       hostAlertContainerRef.clear();

    });
  }

}
