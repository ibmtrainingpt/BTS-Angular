import { Component, OnInit } from '@angular/core';
import { Bug } from '../Bug';
import { BugService } from '../bugService';
import Swal from 'sweetalert2'; //for beautified alert

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

  getBugs(name: String, status: any) {
    if (name && status) {
      this.getBugsByNameAndStatus(name, status); //if both name and status are supplied
    } else if (name) {
      this.getBugsByName(name); //if name is supplied
    } else if (status) {
      this.getBugsByStatus(status); //if status is supplied
    } else {
      this.bugService.getAllBugs();
    }
  }

  getBugsByNameAndStatus(name: String, status: any) {
    //method to retrieve bugs both by name and status
    const observable = this.bugService.getBugsByNameAndStatus(name, status);
    observable.subscribe((response) => {
      this.bugArray = response;
      if (this.bugArray[0] == undefined) {
        alert(
          'No record found with name : ' + name + 'and status : ' + status + '!'
        );
      }
    });
  }

  getBugsByName(name: String) {
    //method to retrieve bugs by name
    if (name.trim()) {
      const observable = this.bugService.getBugsByName(name);
      observable.subscribe(
        (response) => {
          this.bugArray = response;
          if (this.bugArray[0] == undefined) {
            alert('No such record found!');
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

  clear() {
    const divTag = document.getElementById('text');
    divTag.style.visibility = 'hidden';
    const remainingCharacters = <HTMLInputElement>(
      document.getElementById('charName')
    );
    remainingCharacters.style.visibility = 'hidden';
  }

  deleteBug(id: any, index: number) {
    //method for deletion of bug
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        //if Yes is pressed
        const observable = this.bugService.delete(id);
        observable.subscribe((response) => this.bugArray.splice(index, 1));
        Swal.fire('Deleted', 'Bug deleted successfully!', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        //if No is pressed
        Swal.fire('Cancelled', 'Deletion cancelled', 'error');
      }
    });
  }

  showSynopsis(synopsis: string) {
    Swal.fire(synopsis);
  }

  showDescription(description: string) {
    Swal.fire(description);
  }

  ngOnInit(): void {
    //loads the table on load of the page
    const observable = this.bugService.getAllBugs();
    observable.subscribe((response) => (this.bugArray = response));
  }
}
