import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss'],
})
export class EntryFormComponent implements OnInit {
  public isEnteringID: boolean;

  public entryForm : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private activatedRoute: ActivatedRoute
    ) {
    this.entryForm = this.formBuilder.group({
      name: [''],
      meetingName: [''],
      meetingID: ['']
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(
      params => {
        if(params.get('meetingID')){
          this.entryForm.patchValue(
            {
              meetingID: params.get('meetingID')
            }
          );
          this.isEnteringID = true;
        }
      }
    );
  }

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
