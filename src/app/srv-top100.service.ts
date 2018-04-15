import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Top100 } from './models/top100.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SrvTop100Service {
  private serviceUrl="http://2759c4d1.ngrok.io/test";

  constructor(private http: HttpClient) { }

  getData(){
    const body = {sql: "select * from (select * from crime order by date_occured desc) where rownum<=25"};
  }
    return this.http.post<Top100[]>(this.serviceUrl,body);
