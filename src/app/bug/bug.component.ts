import { Component, OnInit } from '@angular/core';
import { Bug } from './Bug';
import { BugService } from '../bugService';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css','./style.css']
})
export class BugComponent implements OnInit {
  bug:Bug = new Bug();  //model
  ImgPath:string="./assets/bughawk.jpeg";
  constructor(private bugService: BugService) { }

  bugArray: Bug[] = [];

  create(){
    console.log(this.bug.name);
    const promise = this.bugService.create(this.bug);
    promise.subscribe(response => {
      console.log(response);
      this.bug.id = response;
      this.bugArray.push(Object.assign({},this.bug));
      alert("Bug added!");
      this.bug = new Bug();
    },
    error => {
    console.log(error);
    alert("Error occurred!")
    })
  }

  ngOnInit(): void {
  }

}
