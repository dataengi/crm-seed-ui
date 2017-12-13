import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {CRMValidators} from "../../shared/validators/CRMValidators";
import {AuthService} from "../../core/auth/auth.service";
import {NotificationsService} from "../../core/notifications/notifications.service";
import {Router} from "@angular/router";

@Component({
  selector: 'crm-start-reset',
  templateUrl: './start-reset.component.html',
  styles: []
})
export class StartResetComponent implements OnInit {

  startResetForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private notificationsService: NotificationsService,
              private router: Router) {
  }

  onSubmit() {
    const email = this.startResetForm.value['email'];
    this.authService.startResetPassword(email).subscribe(
      ()=> {
        this.notificationsService.success('Please, check your email for password reset instructions');
        this.router.navigate(['/auth', 'signIn']).then((res)=>res)
      },
      error => this.notificationsService.error(error)
    );
  }

  ngOnInit() {
    this.formInit();
  }

  private formInit() {
    this.startResetForm = this.formBuilder.group({
      email: ['', [Validators.required, CRMValidators.email]]
    })
  }
}
