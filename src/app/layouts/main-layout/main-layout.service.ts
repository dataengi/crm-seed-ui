import {AuthHttp} from "../../core/auth/auth-http.service";
import {Injectable} from "@angular/core";

@Injectable()
export class MainLayoutService {
  constructor(private http: AuthHttp) {
  }

  getVersion() {
    return this.http.get('/api/version').map(res => res.json());
  }
}
