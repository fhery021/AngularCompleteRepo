import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];

  signupForm: FormGroup;

  forbiddenUsernames = ['Chris', 'Anna'];

  emailLeftEmpty = true;
  emailInvalidReasons = [];


  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
    });

    // this.signupForm.valueChanges.subscribe(
    //   (value) => {
    //     console.log(value);
    //   }
    // );

    // set or patch value
    // this.signupForm.setValue({
    //   userData: {
    //     username: 'Max',
    //     email: 'max@test.com'
    //   },
    //   gender: 'male',
    //   hobbies: []
    // });

    // this.signupForm.patchValue({
    //   userData: {
    //     username: 'Ana'
    //   }
    // });

    const emailControl = this.signupForm.get('userData.email');
    emailControl.statusChanges.subscribe(
      () => {
        this.emailLeftEmpty = false;
        if (emailControl.invalid && emailControl.touched) {
          const errors: ValidationErrors = emailControl.errors;
          this.emailInvalidReasons = [];
          Object.keys(errors).forEach(keyError => {
            switch (keyError) {
              case 'email': {
                this.emailInvalidReasons.push('Email address is invalid');
                break;
              }
              case 'required' : {
                this.emailInvalidReasons.push('Email address is required');
                break;
              }
              case 'emailIsForbidden': {
                this.emailInvalidReasons.push('Email address is forbidden');
                break;
              }
              default: {
                this.emailInvalidReasons.push('Email address error');
                break;
              }
            }
          });
        }
      }
    );

  }

  onSubmit() {
    console.log('onSubmit() pressed ');
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signupForm.get('hobbies') as FormArray).push(control);
  }

  // custom form validator
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
