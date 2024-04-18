import { Component, OnInit } from '@angular/core';
import { ExpenseListComponent } from '../expense-list/expense-list.component';
import { AddUpdateExpenseComponent } from '../add-update-expense/add-update-expense.component';
import { StoreService } from '../../service/store.service';
import { Router } from '@angular/router';
import { PieChartComponent } from '../pie-chart/pie-chart.component';

@Component({
  selector: 'app-expense-wrapper',
  standalone: true,
  imports: [ExpenseListComponent, AddUpdateExpenseComponent, PieChartComponent],
  templateUrl: './expense-wrapper.component.html',
  styleUrl: './expense-wrapper.component.scss'
})
export class ExpenseWrapperComponent implements OnInit {
  constructor(private _storeService: StoreService, private _router: Router) { }

  ngOnInit(): void {
    if (this._storeService.userToken() === '' && !localStorage.getItem('token')) {
      this._router.navigate(['/authenticate']);
    }
    else {
      this._storeService.setLoggedIn(true)
    }
  }
}
