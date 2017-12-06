import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {ProfileComponent} from "./profile/profile.component";
import {ProfileRoutingModule} from "./profile.routing";
import {ImgCropeUploadComponent} from "../shared/components/img-crope-upload/img-crope-upload.component";

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileComponent
  ],
  entryComponents: [
    ImgCropeUploadComponent
  ]
})
export class ProfileModule { }
