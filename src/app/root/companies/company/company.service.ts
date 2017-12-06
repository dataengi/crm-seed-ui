import {Injectable} from "@angular/core";
import {AuthHttp} from "../../../core/auth/auth-http.service";
import {Profile} from "../../../core/models/profile/profile.model";

@Injectable()
export class CompanyService {

  constructor(private http: AuthHttp) { }

  getCompanyUsers(companyId: number) {
    return this.http.get('auth/api/v1/management/users/company/members/' + companyId)
      .flatMap(res => {
        let users = res.json();
        return this.http.post('/api/v1/profile/get/users', JSON.stringify({userIds: users.map(user => user.id)}))
          .map(rs => rs.json())
          .map((profiles: Profile[]) => {
            profiles.forEach(profile => profile.user = users.find(user => user.id === profile.userId));
            return profiles
          })
      })
  }

  activateUser(userId: number) {
    return this.http.post('auth/api/v1/management/users/activate/' + userId, {}).map(rs => rs.json())
  }

  deactivateUser(userId: number) {
    return this.http.post('auth/api/v1/management/users/deactivate/' + userId, {}).map(rs => rs.json())
  }


}
