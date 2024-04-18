import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService } from '../service/authentication.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, catchError, EMPTY, of } from 'rxjs'
import { Auth, User } from '../model/auth.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StoreService } from '../service/store.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-authenticateuser',
  standalone: true,
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatCardModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './authenticateuser.component.html',
  styleUrl: './authenticateuser.component.scss'
})
export class AuthenticateuserComponent {

  emailId: string = '';
  loginMessage: string = '';
  userLogin$: Observable<Auth | string> = of('EMPTY');
  signUpUser$: Observable<User | string> = EMPTY;
  signUpForm: FormGroup = this.formBuilder.group({
    name: [''],
    age: [''],
    country: [''],
    email: [''],
    gender: ['']
  });

  gender = [{ value: 'M', viewValue: 'Male' },
  { value: 'F', viewValue: 'Female' },
  { value: 'other', viewValue: 'Other' }]

  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder, private _storeService: StoreService, private router: Router) { }

  loginUser() {
    this.userLogin$ = this.authService.loginUser(this.emailId).pipe(
      map((user) => {
        this._storeService.setUserToken(user.authToken)
        const [userDetails] = user.userDetails;
        this._storeService.setUserDetails(userDetails);
        localStorage.setItem('token', user.authToken)
        localStorage.setItem('username', userDetails.name)
        localStorage.setItem('userid', userDetails._id)
        this.loginMessage = `Welcome`;
        if (this._storeService.userToken() !== '') {
          this.router.navigate(['/expense']);
        }

        return user;
      }),
      catchError((error: Error) => {
        this.loginMessage = `User not found`;
        return error.message;
      })
    )
  }

  registerUser(){
    this.signUpUser$ = this.authService.addUser(this.signUpForm.value).pipe(
      map((user) => {
        this.userLogin$ = of('EMPTY');
        return user;
      })
    );
  }

  redirectLoginRegister(pageType : boolean){
    if(!pageType){
      this.userLogin$ = of('EMPTY');
    }
    else {
      this.userLogin$ = of('REGISTER');
    }
   
  }
}
