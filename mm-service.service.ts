import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MmServiceService {

  //API_URL = 'http://localhost:3000';
  API_URL = 'http://2d7e3526.ngrok.io';

  constructor(private httpClient: HttpClient) { }

  run_mm(mode: string, dataset: string, train_iter: string, test_iter: string){
    return this.httpClient.get(`${this.API_URL}/get_train_token/`+mode+'/'+dataset+'/'+train_iter+'/'+test_iter);
  }

  get_train_log(token: string){
    return this.httpClient.get(`${this.API_URL}/get_train_log/`+token);
  }

  get_test_log(token: string){
    return this. httpClient.get(`${this.API_URL}/get_test_log/`+token)
  }

  get_train_log_1(date: string, time: string){
    //return this.httpClient.get(`${this.API_URL}/sign_up/`+date+'/'+time);
  }

}
