import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
// import { AuthResponseData, AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isloginMode = true;
  isLoading = false;
  error:string|null = null;
  storeSub!: Subscription;
  private closeSub!: Subscription;
  @ViewChild(PlaceHolderDirective, { static: false })
  alertHost!: PlaceHolderDirective;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }
  onSwtchingMode() {
    this.isloginMode = !this.isloginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    // let authObs: Observable<AuthResponseData>;

    if (this.isloginMode) {
      this.store.dispatch(new AuthActions.LoginStart({ email, password }));
      // authObs = this.authService.login(email, password);
    } else {
      this.store.dispatch(new AuthActions.SignUp({ email, password }));
      // authObs = this.authService.signup(email, password);
    }
    // authObs.subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   (errorMessage) => {
    //     console.log(errorMessage);
    //     this.error = errorMessage;
    //     this.showErrorAlert(errorMessage);
    //     this.isLoading = false;
    //   }
    // );

    form.reset();
  }
  onCloseEvent() {
    this.store.dispatch(new AuthActions.ClearError());
  }
  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
  private showErrorAlert(message: string) {
    const alertCampFactory =this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostAlertContainerRef = this.alertHost.viewContainerView;
    hostAlertContainerRef.clear();
    const componentRef = hostAlertContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostAlertContainerRef.clear();
    });
  }
}
