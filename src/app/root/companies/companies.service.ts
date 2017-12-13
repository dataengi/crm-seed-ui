import { Injectable } from '@angular/core';
import {AuthHttp} from "../../core/auth/auth-http.service";
import {Observable} from "rxjs";
import {Company} from "../../core/models/auth/company.model";

@Injectable()
export class CompaniesService {

  constructor(private http: AuthHttp) { }

  getCompaniesList(): Observable<Company[]> {
    return this.http.get('auth/api/v1/companies/all').map(rs => rs)
  }
}
