import { Component, OnInit } from '@angular/core';
import { Bug } from '../Bug';
import { BugService } from '../bugService';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css','./style.css']
})
export class UpdateComponent implements OnInit {

  bug: Bug = new Bug(); //model
  ImgPath: string = './assets/bughawk.jpeg';
  maxLengthSynopsis = 50;
  maxLengthDescription = 200;

  constructor(private bugService: BugService) {}

  valueCheckSynopsis() {
    const remainingCharactersSynopsis = <HTMLTextAreaElement>(
      document.getElementById('charSynopsis')
    );
    const divTag = document.getElementById('text1');
    remainingCharactersSynopsis.style.visibility = 'visible';
    divTag.style.visibility = 'visible';
    length = this.bug.synopsis.length;
    length = this.maxLengthSynopsis - length;
    remainingCharactersSynopsis.textContent = length.toString();
  }

  valueCheckDescription() {
    const remainingCharactersDescription = <HTMLTextAreaElement>(
      document.getElementById('charDescription')
    );
    const divTag = document.getElementById('text2');
    remainingCharactersDescription.style.visibility = 'visible';
    divTag.style.visibility = 'visible';
    length = this.bug.description.length;
    length = this.maxLengthDescription - length;
    remainingCharactersDescription.textContent = length.toString();
  }


  ngOnInit(): void {
  }

}
