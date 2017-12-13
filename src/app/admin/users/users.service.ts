import {Injectable} from '@angular/core';
import {AuthHttp} from "../../core/auth/auth-http.service";

@Injectable()
export class UsersService {

  constructor(private http: AuthHttp) {
  }

  getCompanyUsers() {
    return this.http.get('auth/api/v1/management/users/company/current/members')
  }

  activateUser(userId: number) {
    return this.http.post('auth/api/v1/management/users/activate/' + userId, {}).map(rs => rs)
  }

  deactivateUser(userId: number) {
    return this.http.post('auth/api/v1/management/users/deactivate/' + userId, {}).map(rs => rs)
  }
}
