import { Component, OnInit } from '@angular/core';
import { ShortIdService } from './short-id.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private service: ShortIdService, private http: HttpClient) {}
  title = 'app';
  data: any;
  dataPost: any;
  set = true;
  urlObj: any = {
    url: '',
  };
  ngOnInit() {
    this.fetch();
    // this.GenerateShortURL();
  }
  fetch() {
    this.http
      .get('http://localhost:8001/')
      .pipe(
        catchError((err): any => {
          console.log('log the error ', err);
        })
      )
      .subscribe((res: any) => {
        console.log('res ', res);
        this.data = res.Result;
      });
  }
  save() {
    // this.set = false;
    this.http
      .post('http://localhost:8001/', this.urlObj)
      // .pipe(
      //   catchError((err): any => {
      //     console.log('log the error ', err);
      //   })
      // )
      .subscribe((res: any) => {
        this.dataPost = res.Result;
        console.log('res ', res.Result);
      });
    this.urlObj.url = '';
  }
}
