import {AuthHttp} from "../../core/auth/auth-http.service";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MainLayoutService {
  constructor(private http: HttpClient) {
  }

  getVersion() {
    return this.http.get('/api/version').map((res:any) => res);
  }
}
