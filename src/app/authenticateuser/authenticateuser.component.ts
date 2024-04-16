import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService } from '../service/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, catchError, EMPTY } from 'rxjs'
import { Auth } from '../model/auth.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StoreService } from '../service/store.service';

@Component({
  selector: 'app-authenticateuser',
  standalone: true,
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './authenticateuser.component.html',
  styleUrl: './authenticateuser.component.scss'
})
export class AuthenticateuserComponent {

  emailId: string = '';
  loginMessage: string = '';
  userLogin$: Observable<Auth | string> = EMPTY;
  constructor(private authService: AuthenticationService, private _storeService : StoreService, private router: Router) { }

  loginUser() {

    this.userLogin$ = this.authService.loginUser(this.emailId).pipe(
      map((user) => {
        console.log('users',user)
        this._storeService.setUserToken(user.authToken)
        this.loginMessage = `Welcome`;
        if(this._storeService.userToken() !== ''){
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
}
