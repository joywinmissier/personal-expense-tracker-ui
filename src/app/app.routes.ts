import { Routes } from '@angular/router';
import { AuthenticateuserComponent } from './authenticateuser/authenticateuser.component';
import { ExpenseWrapperComponent } from './expense/expense-wrapper/expense-wrapper.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'authenticate',
        pathMatch: 'full'
    },
    {
        path:'authenticate',
        component : AuthenticateuserComponent
    },
    {
        path:'expense',
        component : ExpenseWrapperComponent
    }
];
