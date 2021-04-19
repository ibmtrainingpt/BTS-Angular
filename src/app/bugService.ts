import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Bug } from './bug/Bug';

const URL = 'http://localhost:8083/bug/';
@Injectable({
  providedIn: 'root'
})
export class BugService {

  constructor(private http: HttpClient) { }
  create (bug: Bug){
    return this.http.post(URL , bug, {
      headers:{"content-type": 'application/json'},
      responseType: "text"
    });
  }

  getAllBugs(){
    return this.http.get(URL);
  }

  getBugsByName(name: String){
    return this.http.get(URL +'name/'+ name);
  }

  getBugsByStatus(status: any){
    return this.http.get(URL + 'status/'+ status);
  }
}
