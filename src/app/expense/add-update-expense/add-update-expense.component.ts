import { Component, effect } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ExpenseService } from '../../service/expense.service';
import { Observable, map, catchError, EMPTY } from 'rxjs'
import { Expense } from '../../model/expense.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { StoreService } from '../../service/store.service';
@Component({
  selector: 'app-add-update-expense',
  standalone: true,
  imports: [CommonModule, MatButtonModule,MatCardModule, MatSelectModule, MatDatepickerModule, ReactiveFormsModule, MatNativeDateModule,MatFormFieldModule, MatInputModule],
  templateUrl: './add-update-expense.component.html',
  styleUrl: './add-update-expense.component.scss'
})
export class AddUpdateExpenseComponent {
  expenseForm: FormGroup = this.formBuilder.group({
    title: [''],
    amount: [''],
    date: [''],
    category: [''],
    description: ['']
  });
 
  category = [
    {value: 'Food', viewValue: 'Food'},
    {value: 'Transport', viewValue: 'Transport'},
    {value: 'Health', viewValue: 'Health'},
    {value: 'Entertainment', viewValue: 'Entertainment'},
    {value: 'Others', viewValue: 'Others'},
  ];

  expense$ : Observable<Expense | string> = EMPTY;
  expenseStatus : string = '';
  editStatus  = this._storeService.editMode();

  constructor(private formBuilder: FormBuilder, private expenseService : ExpenseService, private _storeService : StoreService) {
    effect(() => {
      this.editStatus = this._storeService.editMode();
      if(this._storeService.editMode()){
        const expense = {
          title: this._storeService.expenseData().title,
          amount: this._storeService.expenseData().amount,
          date: this._storeService.expenseData().date,
          category: this._storeService.expenseData().category,
          description: this._storeService.expenseData().description
        }
        this.expenseForm.setValue(expense)
      }
    });
   
   
   }
  onSubmit() {
   this.expense$ = this.expenseService.addExpense(this.expenseForm.value).pipe(
      map((expense) => {
        this.expenseStatus = `Expense added successfully`;
        return expense;
      }),
      catchError((error: Error) => {
        this.expenseStatus = `Some error while adding expense...`;
        return error.message;
      })
    );
  }

  updateExpense(){
    this.expense$ = this.expenseService.updateExpense(this.expenseForm.value, this._storeService.expenseData()._id).pipe(
      map((expense) => {
        this.expenseStatus = `Expense updated successfully`;
        this._storeService.setEditMode(false);
        return expense;
      }),
      catchError((error: Error) => {
        this.expenseStatus = `Some error while updating expense...`;
        return error.message;
      })
    );
  }
}
