import { Component, OnInit, effect } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable, EMPTY, Subscription } from 'rxjs';
import { Expense } from '../../model/expense.model';
import { ExpenseService } from '../../service/expense.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '../../service/store.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss',
})
export class ExpenseListComponent implements OnInit {
  expensesList$: Observable<Expense[]> = EMPTY;
  subscription!: Subscription;
  displayedColumns: string[] = [
    'title',
    'description',
    'amount',
    'date',
    'category',
    'paymentmode',
    'actions',
  ];
  constructor(
    private _expenseService: ExpenseService,
    private _storeService: StoreService,
    public dialog: MatDialog
  ) {
    effect(() => {
      if (
        !this._storeService.editMode() &&
        !this._storeService.expenseData()._id
      ) {
        this.getAllExpense();
      }
    });
  }

  deleteExpense(expense: Expense) {
    this._storeService.setExpenseData(expense);
    const deleteRef = this.dialog.open(ModalComponent, {
      data: { id: expense._id, title: expense.title },
    });

    deleteRef.afterClosed().subscribe((result) => {
      if (result == false) {
        this.subscription = this._expenseService
          .deleteExpense(this._storeService.expenseData()._id)
          .subscribe(() => this.getAllExpense());
      } else {
        this._storeService.setExpenseData({} as Expense);
      }
    });
  }

  getAllExpense() {
    if (this._storeService.userDetails()._id || localStorage.getItem('userid')) {
      this.expensesList$ = this._expenseService.getAllExpenseForUser(
        this._storeService.userDetails()._id ?? localStorage.getItem('userid')
      );
    }
  }
  ngOnInit(): void {
    this.getAllExpense();
  }

  editExpense(expense: Expense) {
    this._storeService.setExpenseData(expense);
    this._storeService.setEditMode(true);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
