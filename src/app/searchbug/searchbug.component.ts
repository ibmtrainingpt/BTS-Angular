import { Component, OnInit } from '@angular/core';
import { Bug } from '../Bug';
import { BugService } from '../bugService';

@Component({
  selector: 'app-searchbug',
  templateUrl: './searchbug.component.html',
  styleUrls: ['./searchbug.component.css', './style.css'],
})
export class SearchbugComponent implements OnInit {
  bug: Bug = new Bug();
  ImgPath: string = './assets/bughawk.jpeg';
  constructor(private bugService: BugService) {}

  bugArray: any;
  maxLength = 100;

  getBugs(name:String, status:any){
    if(name != null){
      this.getBugsByName(name);
    }
    else if (status != null){
      this.getBugsByStatus(status);
    }
    else{
      this.bugService.getAllBugs();
    }
  }

  getBugsByName(name: String) {
    //method to retrieve bugs by name
      if (name.trim()) {
        const observable = this.bugService.getBugsByName(name);
        observable.subscribe(
          (response) => {
            this.bugArray = response;
            if(this.bugArray[0] == undefined){
              alert("No such record found!")
            }
          },
          (error) => {
            console.log(error);
            alert('Error!');
          }
        );
      } else {
        alert('Please enter bug name.');
      }
  }

  getBugsByStatus(status: any) {
    //method to retrieve bugs by status
    if (status) {
      const observable = this.bugService.getBugsByStatus(status);
      observable.subscribe(
        (response) => {
          this.bugArray = response;
        },
        (error) => {
          console.log(error);
          alert('No such record found!');
        }
      );
    } else {
      alert('Please select status!');
    }
  }

  valueCheck() {
    //method to keep check on characters remaining
    const remainingCharacters = <HTMLInputElement>(
      document.getElementById('charName')
    );
    const divTag = document.getElementById('text');
    divTag.style.visibility = 'visible';
    remainingCharacters.style.visibility = 'visible';
    length = this.bug.name.length;
    length = this.maxLength - length;
    remainingCharacters.textContent = length.toString();
  }

  clearName(){
    this.bug = new Bug();
    const divTag = document.getElementById('text');
    divTag.style.visibility = 'hidden';
    const remainingCharacters = <HTMLInputElement>(
      document.getElementById('charName')
    );
    remainingCharacters.style.visibility = 'hidden';
    const name = <HTMLInputElement>(document.getElementById("name"));
    name.value = null;
  }

  clearStatus(){
    const status = <HTMLInputElement>(document.getElementById("status"));
    status.value = null;
  }

  deleteBug(id:any, index:number){
    if (confirm("Do you want to delete?")) {
      const observable = this.bugService.delete(id);
      observable.subscribe((response) => (this.bugArray.splice(index,1)));
    }
    else {
        alert("Deletion cancelled");
    }
  }

  ngOnInit(): void {
    const observable = this.bugService.getAllBugs();
    observable.subscribe((response) => (this.bugArray = response));
  }
}
