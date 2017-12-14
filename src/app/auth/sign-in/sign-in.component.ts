import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../core/auth/auth.service";
import {Subscription} from "rxjs";
import {NotificationsService} from "../../core/notifications/notifications.service";
import {Router} from "@angular/router";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'crm-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  signInForm: FormGroup;
  private subscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private notificationsService: NotificationsService,
              private router: Router) {}

  onSubmit() {
    this.subscription = this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password, this.signInForm.value.rememberMe)
      .subscribe(
        () => this.router.navigate(["/"]),
        error => this.notificationsService.error(error.error)
      );
  }

  ngOnInit() {
    this.formInit();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private formInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    })
  }

}
