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
  maxLength = 20;

  getBugsByName(name: String) {
    //method to retrieve bugs by name
    if (name) {
      if (name.trim()) {
        const observable = this.bugService.getBugsByName(name);
        observable.subscribe(
          (response) => {
            this.bugArray = response;
          },
          (error) => {
            console.log(error);
            alert('Error!');
          }
        );
      } else {
        alert('No such record found!');
      }
    } else {
      alert('Please enter bug name!');
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

  ngOnInit(): void {
    const observable = this.bugService.getAllBugs();
    observable.subscribe((response) => (this.bugArray = response));
  }
}
