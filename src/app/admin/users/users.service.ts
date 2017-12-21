import {Injectable} from '@angular/core';
import {AuthHttp} from "../../core/auth/auth-http.service";

@Injectable()
export class UsersService {

  constructor(private http: AuthHttp) {
  }

  activateUser(userId: number) {
    return this.http.post('auth/api/v1/management/users/activate/' + userId, {})
  }

  deactivateUser(userId: number) {
    return this.http.post('auth/api/v1/management/users/deactivate/' + userId, {})
  }
}
