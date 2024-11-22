import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShortIdService } from './short-id.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Pipe } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  @ViewChild('ModelViewChild') modal: ElementRef | undefined;
  editform: FormGroup;
  constructor(
    private service: ShortIdService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.editform = this.fb.group({
      redirectUrl: [''],
      name: [''],
      // city: ['', Validators.minLength(5)],
    });
  }
  title = 'app';
  data: any;
  dataPost: any;
  details: any;
  set = true;
  id: any;
  urlObj: any = {
    url: '',
    name: '',
  };
  redirect: any = {};
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

  onClickUrl(shortId: any) {
    this.service.getDataById(shortId).subscribe((res: any) => {
      console.log('get by id' + res);
      window.open(res.Result.redirectUrl);
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
    location.reload();
    this.urlObj.url = '';
    this.urlObj.name = '';
  }
  OpenModel(shortId: any) {
    // modal.nativeElement.style.display = 'block';
    console.log(shortId);
    if (this.modal) {
      this.modal.nativeElement.style.display = 'block';
      this.service.getDataById(shortId).subscribe((res: any) => {
        this.details = res.Result;
        console.log(this.details._id);
        this.id = this.details._id;
        //this.editform.controls['redirectUrl'].setValue(res.Result.redirectUrl);
        console.log(
          this.editform.controls['redirectUrl'].setValue(res.Result.redirectUrl)
        );
        console.log(this.editform.controls['name'].setValue(res.Result.name));
      });
    }
  }
  closeModal() {
    if (this.modal) {
      this.modal.nativeElement.style.display = 'none';
    }
  }
  editSave(editform: any) {
    console.log(this.id);
    const urls = 'http://localhost:8001/';
    this.http.put(`${urls}${this.id}`, editform.value).subscribe((res) => {
      console.log(editform.value);

      this.editform.controls['redirectUrl'].patchValue(
        editform.value.redirectUrl
      );
      this.editform.controls['name'].patchValue(editform.value.name);
    });
    this.closeModal();
    location.reload();
  }
}
