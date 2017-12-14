import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy} from "@angular/core";
import {FileUploader, ParsedResponseHeaders} from "ng2-file-upload";
import {FileData} from "./file-data";
import {AuthService} from "../../../core/auth/auth.service";
import {AuthHttp} from "../../../core/auth/auth-http.service";
import {Subscription} from "rxjs";
import * as FileSaver from "file-saver";

@Component({
  selector: 'crm-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, OnChanges, OnDestroy {

  constructor(private authService: AuthService, private http: AuthHttp) {
  }

  @Input() tag: string;
  @Input() id: string;
  @Input() uploadedFilesIds: string[] = [];
  @Input() readonly: boolean = false;
  @Output() uploadResponse = new EventEmitter<string>();
  @Output() removeFile = new EventEmitter<string>();
  @Input() limit: number = 20;
  @Input() byOne: boolean = false;
  @Input() maxFileSize: number = 20000000; //in bytes

  uploadedFiles: FileData[] = [];

  componentId: string;
  fileUploader: FileUploader;
  hasBaseDropZoneOver: boolean = false;

  private fileDataSubscription: Subscription;

  fileOverBase(e) {
    this.hasBaseDropZoneOver = e;
  }

  progressValue() {
    if (!this.fileUploader.progress) {
      return 0;
    } else {
      return this.fileUploader.progress;
    }
  }

  onDownload(fileData: FileData) {
    this.http.download<any>('/api/v1/files/' + fileData.uuid).subscribe(
      response => {
        let contentType: string = response.headers.get('content-type');
        let blob = new Blob([response.blob()], {type: contentType});
        FileSaver.saveAs(blob, fileData.name);
      },
      error => console.error("Can't load file", error)
    )
  }

  onRemoveUploaded(fileData: FileData) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(fileData), 1);
    this.removeFile.emit(fileData.uuid);
  }

  isMoreThenLimit() {
    return this.limit && this.limit <= (this.uploadedFiles.length + this.fileUploader.queue.length)
  }

  private getFileData() {
    if (this.uploadedFilesIds && this.uploadedFilesIds.filter(Boolean).length > 0) {
      this.fileDataSubscription = this.http.post('/api/v1/files', JSON.stringify(this.uploadedFilesIds.filter(Boolean)))

        .subscribe(
          (filesData:FileData[]) => this.uploadedFiles = filesData,
          error => console.log(error)
        )
    }
  }

  showUploadButton() {
    return this.fileUploader.queue.length > 0;
  }

  ngOnInit() {
    this.componentId = 'file-upload-' + this.id;
    const options = {
      url: '/api/v1/files/' + this.tag,
      maxFileSize: this.maxFileSize,
      queueLimit: this.limit,
      headers: [{name: this.authService.getHeaderName(), value: this.authService.getToken()}]
    };
    this.fileUploader = new FileUploader(options);
    this.fileUploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      const responseJson = JSON.parse(response);
      this.uploadedFiles.push(responseJson);
      item.remove();
      this.uploadResponse.emit(responseJson.uuid);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['uploadedFilesIds']) {
      this.getFileData();
    }
  }

  ngOnDestroy() {
    if (this.fileDataSubscription) {
      this.fileDataSubscription.unsubscribe()
    }
  }
}
