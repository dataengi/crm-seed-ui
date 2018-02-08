import {Component, OnInit, OnDestroy} from '@angular/core';
import {ProfileService} from "../../core/profile/profile.service";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {CRMValidators} from "../../shared/validators/CRMValidators";
import {Subscription, Observable} from "rxjs";
import {NotificationsService} from "../../core/notifications/notifications.service";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {ImgCropeUploadComponent} from "../../shared/components/img-crope-upload/img-crope-upload.component";
import {Profile} from "../../core/models/profile/profile.model";
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";
@Component({
  selector: 'crm-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileForm: FormGroup;
  profileStateSubscription: Subscription;
  changeAvatarSubscription: Subscription;
  profile: KeycloakProfile;

  constructor(private profileService: ProfileService,
              private formBuilder: FormBuilder,
              private notificationsService: NotificationsService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.profile = this.profileService.ksp;
    this.initForm(this.profile);
  }

  ngOnDestroy() {
    this.profileStateSubscription.unsubscribe();
    if (this.changeAvatarSubscription) {
      this.changeAvatarSubscription.unsubscribe();
    }
  }

  saveProfile() {
    this.profileService.updateProfile(this.profileForm.value).subscribe(
      ok => this.notificationsService.success("Changes saved"),
      error => console.error(error)
    )
  }

  private initForm(profile: KeycloakProfile) {
    this.profileForm = this.formBuilder.group({
      userName: [this.fillNick(profile.username), [Validators.required, CRMValidators.leterOrDigitsOnly], [this.nicknameValidator.bind(this)]],
      firstName: [profile.firstName, [Validators.maxLength(40)]],
      lastName: [profile.lastName, [Validators.maxLength(40)]],
      avatarUrl: ['/assets/img/avatars/no-avatar.png']
    })

  }

  private nicknameValidator(control: FormControl): Observable<any> {
    if (control.value === this.profileService.ksp.username) {
      return Observable.of(null)
    } else {
      return this.profileService.checkNickname(control.value)
        .map(rs => null)
        .catch(error => Observable.of({alreadyExist: true}))
    }
  }

  onChangeAvatar() {
    const options: NgbModalOptions = {size: 'lg'};
    const modalRef = this.modalService.open(ImgCropeUploadComponent, options);
    modalRef.componentInstance.currentImgUrl = this.profileForm.value.avatarUrl;
    this.changeAvatarSubscription = modalRef.componentInstance.imageChange.subscribe(url => this.profileForm.patchValue({avatarUrl: url}));
  }

  private fillNick(nick: string) {
    return nick.replace('@', '_').replace('.', '')
  }


}
