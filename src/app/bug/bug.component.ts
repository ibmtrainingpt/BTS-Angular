import { Component, OnInit } from '@angular/core';
import { Bug } from '../Bug';
import { BugService } from '../bugService';
import { PRIORITY } from '../PRIORITY';
import { SEVERITY } from '../SEVERITY';
import { STATUS } from '../STATUS';
import { TYPE } from '../TYPE';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css', './style.css'],
})
export class BugComponent implements OnInit {
  bug: Bug = new Bug(); //model
  ImgPath: string = './assets/bughawk.jpeg';

  constructor(private bugService: BugService) {
  }

  bugArray: Bug[] = [];
  maxLengthSynopsis = 50;
  maxLengthDescription = 200;
  maxLengthName = 100;

  create() {
    //method to create bug
    this.validate();
    console.log(this.bug.name);
    const promise = this.bugService.create(this.bug);
    promise.subscribe(
      (response) => {
        console.log(response);
        this.bug.id = response;
        this.bugArray.push(Object.assign({}, this.bug));
        alert('Bug added!');
        this.bug = new Bug();
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

  validate() {
    //method for validation
    let errorText = '';
    if (this.bug.name) {
      if (this.bug.name.trim()) {
        if (this.bug.name.length > 100) {
          errorText += 'Bug name cannot be longer than 100 characters. \n';
        }
      }
    } else {
      errorText += 'Please enter Bug name. \n';
    }

    if (this.bug.module) {
      if (this.bug.module.trim()) {
        if (this.bug.module.length > 50) {
          errorText += 'Module cannot be longer than 50 characters. \n';
        }
      }
    } else {
      errorText += 'Please enter module. \n';
    }

    if (this.bug.projectId) {
      if (this.bug.projectId.trim()) {
        if (this.bug.projectId.length > 20) {
          errorText += 'Project ID cannot be longer than 20 characters. \n';
        }
      }
    } else {
      errorText += 'Please enter Project ID. \n';
    }

    if (errorText != "") {
      alert('Errors are : \n' + errorText);
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

  valueCheckName() {
    const remainingCharactersName = document.getElementById('charName');
    const divTag = document.getElementById('text3');
    remainingCharactersName.style.visibility = 'visible';
    divTag.style.visibility = 'visible';
    length = this.bug.name.length;
    length = this.maxLengthName - length;
    remainingCharactersName.textContent = length.toString();
  }

  hide() {
    const remainingCharactersName = document.getElementById('charName');
    const divTag1 = document.getElementById('text3');
    remainingCharactersName.style.visibility = 'hidden';
    divTag1.style.visibility = 'hidden';
    const remainingCharactersDescription = document.getElementById(
      'charDescription'
    );
    const divTag2 = document.getElementById('text2');
    remainingCharactersDescription.style.visibility = 'hidden';
    divTag2.style.visibility = 'hidden';
    const remainingCharactersSynopsis = document.getElementById('charSynopsis');
    const divTag = document.getElementById('text1');
    remainingCharactersSynopsis.style.visibility = 'hidden';
    divTag.style.visibility = 'hidden';
  }

  ngOnInit(): void {
  }
}
