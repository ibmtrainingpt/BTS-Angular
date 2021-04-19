import { Component, OnInit } from '@angular/core';
import { Bug } from '../bug/Bug';
import { BugService } from '../bugService';

@Component({
  selector: 'app-searchbug',
  templateUrl: './searchbug.component.html',
  styleUrls: ['./searchbug.component.css','./style.css']
})
export class SearchbugComponent implements OnInit {
  bug: Bug = new Bug();
  ImgPath:string="./assets/bughawk.jpeg";
  constructor(private bugService: BugService) {}

  bugArray: any;

  getBugsByName(name: String){
    const observable = this.bugService.getBugsByName(name);
    observable.subscribe(response => this.bugArray = response);
  }

  getBugsByStatus(status:any){
    const observable = this.bugService.getBugsByStatus(status);
    observable.subscribe(response => this.bugArray = response);
  }

  ngOnInit(): void {
    const observable = this.bugService.getAllBugs();
    observable.subscribe(response => this.bugArray = response);
  }

}
