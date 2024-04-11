import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsListComponent } from './products-list/products-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path:'home',
        component : HomeComponent
    },
    {
        path:'products',
        component : ProductsListComponent
    }
];
