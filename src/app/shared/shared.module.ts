import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DropdownDirective} from "./directives/dropdown.directive";
import {FileUploadComponent} from "./components/file-upload/file-upload.component";
import {FileUploadModule} from "ng2-file-upload";
import {PeriodDatePickerComponent} from "./components/period-date-picker/period-date-picker.component";
import {TagInputComponent} from "./components/tag-input/tag-input.component";
import {TagInputItemComponent} from "./components/tag-input/tag-input-item/tag-input-item.component";
import {FormErrorComponent} from "./components/form-error/form-error.component";
import {SelectModule} from "ng2-select";
import {ImageCropperModule} from "ng2-img-cropper";
import {ImgCropeUploadComponent} from "./components/img-crope-upload/img-crope-upload.component";
import {TimeDurationPipe} from "./pipes/time-duration.pipe";
import {SelectDropdownComponent} from "./components/select-dropdown/select-dropdown.component";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {DblClickCopyDirective} from "./directives/dbl-click-copy.directive";
import {LinkComponent} from "./components/link/link.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FileUploadModule,
    SelectModule,
    ImageCropperModule,
    BsDropdownModule,
    TooltipModule
  ],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SelectModule,
    BsDropdownModule,
    TooltipModule,
    //components
    FileUploadComponent,
    PeriodDatePickerComponent,
    TagInputComponent,
    FormErrorComponent,
    ImgCropeUploadComponent,
    SelectDropdownComponent,
    LinkComponent,

    //directives
    DropdownDirective,
    DblClickCopyDirective,
    //pipes
    TimeDurationPipe
  ],
  declarations: [
    FileUploadComponent,
    DropdownDirective,
    TimeDurationPipe,
    PeriodDatePickerComponent,
    TagInputComponent,
    TagInputItemComponent,
    FormErrorComponent,
    ImgCropeUploadComponent,
    SelectDropdownComponent,
    DblClickCopyDirective,
    LinkComponent
  ]
})
export class SharedModule {
}
