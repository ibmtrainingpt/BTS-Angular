import { Component, OnInit } from '@angular/core';
import { Bug } from './Bug';
import { BugService } from '../bugService';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css', './style.css'],
})
export class BugComponent implements OnInit {
  bug: Bug = new Bug(); //model
  ImgPath: string = './assets/bughawk.jpeg';
  constructor(private bugService: BugService) {}

  bugArray: Bug[] = [];
  maxLengthSynopsis = 50;
  maxLengthDescription = 200;

  create() {
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
        console.log(error);
        alert('Error occurred!');
      }
    );
  }

  validate() {
    let errorText = '';
    if (this.bug.name) {
      if (this.bug.name.trim()) {
        if (this.bug.name.length > 20) {
          errorText += 'Bug name cannot be longer than 20 characters. \n';
        }
      }
    } else {
      errorText += 'Please enter Bug name. \n';
    }

    if (!this.bug.priority) {
      errorText += 'Please select priority. \n';
    }

    if (this.bug.module) {
      if (this.bug.module.trim()) {
        if (this.bug.module.length > 10) {
          errorText += 'Module cannot be longer than 10 characters. \n';
        }
      }
    } else {
      errorText += 'Please enter module. \n';
    }

    if (!this.bug.type) {
      errorText += 'Please select type. \n';
    }

    if (!this.bug.status) {
      errorText += 'Please select status. \n';
    }

    if (!this.bug.severity) {
      errorText += 'Please select severity. \n';
    }

    if (this.bug.projectId) {
      if (this.bug.projectId.trim()) {
        if (this.bug.projectId.length > 10) {
          errorText += 'Project ID cannot be longer than 10 characters. \n';
        }
      }
    } else {
      errorText += 'Please enter Project ID. \n';
    }
    if (!this.bug.synopsis || this.bug.synopsis.trim()) {
      errorText += 'Please enter severity . \n';
    }

    if (!this.bug.description || this.bug.description.trim()) {
      errorText += 'Please enter description . \n';
    }

    alert('Errors are : \n' + errorText);
  }

  valueCheckSynopsis() {
    const remainingCharactersSynopsis = <HTMLTextAreaElement>(
      document.getElementById('charSynopsis')
    );
    const divTag = document.getElementById("text");
    remainingCharactersSynopsis.style.visibility = "visible";
    divTag.style.visibility = "visible";
    length = this.bug.synopsis.length;
    length = this.maxLengthSynopsis - length;
    remainingCharactersSynopsis.textContent = length.toString();
  }

  valueCheckDescription() {
    const remainingCharactersDescription = <HTMLTextAreaElement>(
      document.getElementById('charDescription')
    );
    const divTag = document.getElementById("text");
    divTag.style.visibility = "visible";
    remainingCharactersDescription.style.visibility = "visible";
    length = this.bug.description.length;
    length = this.maxLengthDescription - length;
    remainingCharactersDescription.textContent = length.toString();
  }

  ngOnInit(): void {}
}
