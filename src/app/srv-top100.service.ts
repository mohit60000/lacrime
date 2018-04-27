import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Top100 } from './models/top100.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SrvTop100Service {
  private serviceUrl="http://cb4b879d.ngrok.io/test";

  constructor(private http: HttpClient) { }

  getData(dataSql){
    const body = {sql: dataSql};
    return this.http.post<any>(this.serviceUrl,body);
  }
}
