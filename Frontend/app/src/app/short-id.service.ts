import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlI } from '../app/interface';

@Injectable({
  providedIn: 'root',
})
export class ShortIdService {
  constructor(private http: HttpClient) {}

  getData() {
    this.http.get<urlI>('http://localhost:8001/');
  }
  // createData(newShortId:){
  //   this.http.post()
  // }

  postData(url: urlI) {
    this.http.post('http://localhost:8001/', url);
  }
}
