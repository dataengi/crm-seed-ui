import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from "@angular/core";
import {CropperSettings, ImageCropperComponent} from "ng2-img-cropper";
import {AuthService} from "../../../core/auth/auth.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'crm-img-crope-upload',
  templateUrl: './img-crope-upload.component.html',
  styleUrls: ['./img-crope-upload.component.scss']
})
export class ImgCropeUploadComponent implements OnInit {

  @Input() currentImgUrl: string = '';
  @Output() imageChange = new EventEmitter<string>();


  data: any;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  cropperSettings: CropperSettings;

  constructor(private http: HttpClient,
              private authService: AuthService,
              public activeModal: NgbActiveModal) {

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 300;
    this.cropperSettings.height = 300;
    this.cropperSettings.croppedWidth = 300;
    this.cropperSettings.croppedHeight = 300;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 400;
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.allowedFilesRegex = /\.(jpg|jpeg|png)$/i;

    this.data = {};

  }

  ngOnInit() {
    let img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      this.cropper.setImage(img)
    };
    img.src = this.currentImgUrl;
  }

  onSave() {
    let formData = new FormData();
    formData.append('file', this.base64ToFile(this.data.image));
    this.http.post('/api/v1/files/avatar', formData).subscribe(
      (res:any) => {
        this.imageChange.emit('/api/v1/avatar/' + res.uuid);
        this.activeModal.close();
      },
      error => console.log(error)
    )
  }


  fileChangeListener($event) {
    let image: any = new Image();
    let file: File = $event.target.files[0];
    let fileReader: FileReader = new FileReader();
    fileReader.onloadend = (loadEvent: any) => {
      image.src = loadEvent.target.result;
      this.cropper.setImage(image);
    };
    fileReader.readAsDataURL(file);
  }


  private base64ToFile(dataURI) {

    let contentType = dataURI.split(',')[0].split(':')[1].split(';')[0];
    let binaryImg = atob(dataURI.split(',')[1]);

    let length = binaryImg.length;
    let ab = new ArrayBuffer(length);
    let ua = new Uint8Array(ab);
    for (let i = 0; i < length; i++) {
      ua[i] = binaryImg.charCodeAt(i);
    }
    let blob = new Blob([ab], {type: contentType});
    return new File([blob], 'avatar.png');
  }

}
