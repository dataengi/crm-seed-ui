import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {Http, RequestOptionsArgs, Response, ResponseContentType} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthHttp {

  constructor(private authService: AuthService, private http: Http) {
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.get(url, options).catch(error => this.processError(error));
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.post(url, body, options).catch(error => this.processError(error));
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.put(url, body, options).catch(error => this.processError(error));
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.delete(url, options).catch(error => this.processError(error));
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.patch(url, body, options).catch(error => this.processError(error));
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.head(url, options).catch(error => this.processError(error));
  }

  public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.options(url, options).catch(error => this.processError(error));
  }

  public download(url: string) {
    return this.get(url, {responseType: ResponseContentType.Blob})
  }

  public downloadPost(url: string, body: any) {
    return this.post(url, body, {responseType: ResponseContentType.Blob})
  }

  private processError(response: Response) {
    this.authService.processUnauthorized(response);
    return Observable.throw(response);
  }

}
