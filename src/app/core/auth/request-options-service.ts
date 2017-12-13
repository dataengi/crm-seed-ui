import {Injectable} from "@angular/core";
import {BaseRequestOptions, RequestOptionsArgs, RequestOptions} from "@angular/http";
//TODO Remove this file after migration
@Injectable()
export class RequestOptionsService extends BaseRequestOptions {

  private authTokenKey = 'xZaSwqS';

  constructor() {
    super();
    this.headers.set('Content-Type', 'application/json');
  }

  merge(options?: RequestOptionsArgs): RequestOptions {
    let newOptions = super.merge(options);
    let token = localStorage.getItem(this.authTokenKey);
    newOptions.headers.set("X-Auth-Token", token);
    return newOptions
  }

}
