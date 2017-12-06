import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../../core/auth/auth.service";
import {NotificationsService} from "../../core/notifications/notifications.service";

@Component({
  selector: 'crm-sign-up',
  templateUrl: './sign-up.component.html',
  styles: []
})
export class SignUpComponent implements OnInit, OnDestroy {

  signUpForm: FormGroup;
  subscription: Subscription;
  changeValueSubscription: Subscription;
  signUpSubscription: Subscription;

  passIsEqual: boolean = false;
  showNotEqual: boolean = false;

  email: string;
  hash: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private authService: AuthService,
              private ns: NotificationsService,
              private router: Router) {
  }

  onSubmit() {
    this.signUpSubscription = this.authService.signUp(this.signUpForm.value.pass, this.hash).subscribe(
      ok => this.router.navigate(['/profile']),
      error => this.ns.error(error.json().message)
    );
  }

  ngOnInit() {
    this.formInit();
    this.subscription = this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      if (params.hasOwnProperty('hash')) {
        this.hash = params['hash'];
      } else {
        //todo maybe redirect to some error page
        this.ns.error('Invited hash not found. Please go to link in email again');
      }
    });

    //todo rewrite using validator
    this.changeValueSubscription = this.signUpForm.valueChanges.subscribe(value => {
      this.passIsEqual = value.pass === value.repeat && value.pass.length > 0;
      this.showNotEqual = !this.passIsEqual && value.repeat.length > 0;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.changeValueSubscription.unsubscribe();
    if (this.signUpSubscription) {
      this.signUpSubscription.unsubscribe();
    }
  }

  private formInit() {
    this.signUpForm = this.formBuilder.group({
      pass: ['', [Validators.required, Validators.minLength(6)]],
      repeat: ['', Validators.required]
    });
  }

}
