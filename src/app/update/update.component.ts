import { Component, OnInit } from '@angular/core';
import { Bug } from '../Bug';
import { BugService } from '../bugService';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css', './style.css'],
})
export class UpdateComponent implements OnInit {
  bug: Bug = new Bug(); //model
  ImgPath: string = './assets/bughawk.jpeg';
  maxLengthSynopsis = 50;
  maxLengthDescription = 200;
  name: String;
  bugArray: any;

  constructor(private bugService: BugService) {}

  getBug() {
    //method to retrieve bug details on button click
    if (this.bug.name) {
      const observable = this.bugService.getBugsByName(this.bug.name);
      observable.subscribe(
        (response) => {
          this.bugArray = response;

          this.bug = this.bugArray[0];
          this.bug.etaString = this.bug.eta.toString().split('T')[0];
          if (this.bugArray[0] == undefined) {
            //if the bug is not found
            alert('No such record found!');
          }
        },
        (error) => {
          console.log(error);
          alert('Error!');
        }
      );
    } else {
      alert('Please enter a bug name.');
    }
  }

  validate() {
    //method for validation
    if (!this.bug.name.trim()) {
      alert('Please enter Bug name.');
    } else if (!this.bug.projectId.trim()) {
      alert('Please enter Project ID.');
    } else if (!this.bug.eta) {
      alert('ETA cannot be left empty!');
    } else if (!this.bug.module.trim()) {
      alert('Please enter Module.');
    } else if (!this.bug.synopsis.trim()) {
      alert('Synopsis cannot be left blank!');
    } else if (!this.bug.description.trim()) {
      alert('Description cannot be left blank!');
    }
  }

  valueCheckSynopsis() {
    const remainingCharactersSynopsis = document.getElementById('charSynopsis');
    const divTag = document.getElementById('text1');
    remainingCharactersSynopsis.style.visibility = 'visible';
    divTag.style.visibility = 'visible';
    length = this.bug.synopsis.length;
    length = this.maxLengthSynopsis - length;
    remainingCharactersSynopsis.textContent = length.toString();
  }

  valueCheckDescription() {
    const remainingCharactersDescription = document.getElementById(
      'charDescription'
    );
    const divTag = document.getElementById('text2');
    remainingCharactersDescription.style.visibility = 'visible';
    divTag.style.visibility = 'visible';
    length = this.bug.description.length;
    length = this.maxLengthDescription - length;
    remainingCharactersDescription.textContent = length.toString();
  }

  update() {
    //method to update the details
    this.bug.eta = new Date(this.bug.etaString);
    this.validate();
    const observable = this.bugService.update(this.bug, this.bug.id);
    observable.subscribe(
      (response) => {
        alert('Bug Updated!');
      },
      (error) => {
        if(error.statusText != 'OK'){
          alert("Error! " + error.headers.get("error"));
        }
        else{
          alert('Error occurred!');
        }
      }
    );
  }
  ngOnInit(): void {}
}
