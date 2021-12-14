import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
// worldgyan.com
  constructor(private http: HttpClient) {
  }
  apiPost(params, apiEnd): Observable<any> {
    return this.http.post(`/${apiEnd}`, JSON.stringify(params));
  }
  apiPut(params, apiEnd): Observable<any> {
    return this.http.put(`/${apiEnd}/`, JSON.stringify(params));
  }
  getAll(apiObject): Observable<any> {
    return this.http.get(`/${apiObject}/`);
  }
  apiPostFile(params, apiObject): Observable<any> {
    return this.http.post(`/${apiObject}/`, params);
  }
}
