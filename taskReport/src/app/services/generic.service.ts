import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(private http: HttpClient) {
  }
  apiPost(params, apiObject): Observable<any> {
    return this.http.post(`/${apiObject}`, JSON.stringify(params));
  }
  apiPut(params, apiObject): Observable<any> {
    return this.http.put(`/${apiObject}/`, JSON.stringify(params));
  }
  getAll(apiObject): Observable<any> {
    return this.http.get(`/${apiObject}/`);
  }
  apiPostFile(params, apiObject): Observable<any> {
    return this.http.post(`/${apiObject}/`, params);
  }
}
