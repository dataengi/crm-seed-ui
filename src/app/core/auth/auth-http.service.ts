import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {ResponseContentType} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {HttpClient, HttpErrorResponse,HttpResponse} from "@angular/common/http";

@Injectable()
export class AuthHttp {

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  public get(url: string, options?:any): Observable<any> {
    return this.http.get(url, options).catch(error => this.processError(error));
  }

  public post(url: string, body: any, options?: any): Observable<any> {
    return this.http.post(url, body, options).catch(error => this.processError(error));
  }

  public put(url: string, body: any, options?: any): Observable<any> {
    return this.http.put(url, body, options).catch(error => this.processError(error));
  }

  public delete(url: string, options?: any): Observable<any> {
    return this.http.delete(url, options).catch(error => this.processError(error));
  }

  public head(url: string, options?: any): Observable<any> {
    return this.head(url, options).catch(error => this.processError(error));
  }

  public options(url: string, options?: any): Observable<any> {
    return this.options(url, options).catch(error => this.processError(error));
  }

  public download(url: string):Observable<any>{
    return this.get(url, {responseType: "blob"})
  }

  private processError(response: HttpErrorResponse) {
    this.authService.processUnauthorized(response);
    return Observable.throw(response);
  }

}
