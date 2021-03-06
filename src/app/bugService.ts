import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bug } from './Bug';
import * as _ from 'lodash';

const URL = 'http://localhost:8083/bug/';
@Injectable({
  providedIn: 'root',
})
export class BugService {
  constructor(private http: HttpClient) {}
  create(bug: Bug) {
    return this.http.post(URL, bug, {
      headers: { 'content-type': 'application/json' },
      responseType: 'text',
    });
  }

  getAllBugs() {
    return this.http.get(URL);
  }

  getBugsByName(name: String) {
    return this.http.get(URL + 'name/' + name);
  }

  getBugsByStatus(status: any) {
    return this.http.get(URL + 'status/' + status);
  }

  getBugsByNameAndStatus(name: String, status: any) {
    return this.http.get(URL + 'search?name=' + name + '&status=' + status);
  }

  update(bug: Bug, id: any) {
    return this.http.put(URL + id, bug, {
      headers: { 'content-type': 'application/json' },
    });
  }

  delete(id: String) {
    return this.http.delete(URL + id);
  }
}
