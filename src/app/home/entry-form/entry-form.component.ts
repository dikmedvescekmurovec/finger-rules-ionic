import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss'],
})
export class EntryFormComponent implements OnInit {

  public name: string;
  public meetingName: string;
  public meetingID: string;

  public isEnteringID: boolean;

  public entryForm : FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router:Router) {
    this.entryForm = this.formBuilder.group({
      name: [''],
      meetingName: [''],
      meetingID: ['']
    });
  }

  ngOnInit() {}

  /**
   * Switches from create a meeting to join with ID view.
   */
  switchView(){
    this.isEnteringID = !this.isEnteringID;
  }

  /**
   * TODO: Creates meeting and redirects to meeting page.
   */
  startMeeting() {
    console.log(this.entryForm.value);
    this.router.navigateByUrl('meeting/123');
  }

}
