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

  public get<T>(url: string, options?:any): Observable<T> {
    return this.http.get<T>(url, options).catch(error => this.processError(error));
  }

  public post<T>(url: string, body: any, options?: any): Observable<T> {
    return this.http.post<T>(url, body, options).catch(error => this.processError(error));
  }

  public put<T>(url: string, body: any, options?: any): Observable<T>{
    return this.http.put<T>(url, body, options).catch(error => this.processError(error));
  }

  public delete<T>(url: string, options?: any): Observable<T>{
    return this.http.delete<T>(url, options).catch(error => this.processError(error));
  }

  public head<T>(url: string, options?: any): Observable<T> {
    return this.head<T>(url, options).catch(error => this.processError(error));
  }

  public options<T>(url: string, options?: any): Observable<T>{
    return this.options<T>(url, options).catch(error => this.processError(error));
  }

  public download<T>(url: string):Observable<T>{
    return this.get<T>(url, {responseType: "blob"})
  }

  private processError(response: HttpErrorResponse) {
    this.authService.processUnauthorized(response);
    return Observable.throw(response);
  }

}
