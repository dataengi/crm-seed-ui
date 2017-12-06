import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../../core/auth/auth.service";
import {NotificationsService} from "../../core/notifications/notifications.service";

@Component({
  selector: 'crm-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  resetForm: FormGroup;
  querySubscription: Subscription;
  changeValueSubscription: Subscription;

  email: string;
  hash: string;

  passIsEqual: boolean = false;
  showNotEqual: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private authService: AuthService,
              private notificationsService: NotificationsService,
              private router: Router) {
  }

  onSubmit() {
    const password = this.resetForm.value['pass'];
    this.authService.resetPassword(this.hash, password).subscribe(
      ok => {
        this.notificationsService.success('Password changed');
        this.router.navigate(['/'])
      },
      error => this.notificationsService.error(error.json())
    );
  }

  ngOnInit() {
    this.formInit();
    this.querySubscription = this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.hash = params['hash'];
    });

    this.changeValueSubscription = this.resetForm.valueChanges.subscribe(value => {
      this.passIsEqual = value.pass === value.repeat && value.pass.length > 0;
      this.showNotEqual = !this.passIsEqual && value.repeat.length > 0;
    });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
    this.changeValueSubscription.unsubscribe();
  }

  private formInit() {
    this.resetForm = this.formBuilder.group({
      pass: ['', [Validators.required, Validators.minLength(6)]],
      repeat: ['', Validators.required]
    });
  }

}
