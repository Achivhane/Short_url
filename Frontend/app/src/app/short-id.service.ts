import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlI } from '../app/interface';

@Injectable({
  providedIn: 'root',
})
export class ShortIdService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:8001/';
  getData() {
    this.http.get<urlI>('http://localhost:8001/');
  }
  // createData(newShortId:){
  //   this.http.post()
  // }

  postData(url: urlI) {
    this.http.post('http://localhost:8001/', url);
  }
  getDataById(shortId: string) {
    console.log(` ${this.url}${shortId}`);
    return this.http.get(` ${this.url}${shortId}`);
  }
  getById(_id: string, bodyData: urlI) {
    console.log(` ${this.url}${_id}`);
    return this.http.put(` ${this.url}${_id}`, bodyData);
  }
}
