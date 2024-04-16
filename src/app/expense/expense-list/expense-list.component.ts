import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Observable, EMPTY } from 'rxjs'
import { Expense } from '../../model/expense.model';
import { ExpenseService } from '../../service/expense.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { StoreService } from '../../service/store.service';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent implements OnInit {
  expensesList$ : Observable<Expense[]> = EMPTY;
  displayedColumns: string[] = ['title', 'description', 'amount', 'date', 'category', 'actions'];
  constructor(private _expenseService : ExpenseService, private _storeService : StoreService){}

  ngOnInit(): void {
      this.expensesList$ = this._expenseService.getAllExpense();
  }

  editExpense(expense: Expense) {
    this._storeService.setExpenseData(expense)
    this._storeService.setEditMode(true);
  }
}
