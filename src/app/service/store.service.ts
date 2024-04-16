import { Injectable, signal, computed } from '@angular/core';
import { ExpenseStore } from '../model/store.model';
import { Expense } from '../model/expense.model';

const initialState: ExpenseStore = {
  userToken: '',
  editMode: false,
  expenseData : {} as Expense
};

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private readonly _store = signal(initialState);
  
  readonly userToken = computed(() => this._store().userToken);
  readonly expenseData = computed(() => this._store().expenseData);
  readonly editMode = computed(() => this._store().editMode);

  setUserToken(userToken: string) {
    this._store.update((s) => ({ ...s, userToken }));
  }

  setEditMode(editMode : boolean){
    this._store.update((s) => ({ ...s, editMode }));
  }

  setExpenseData(expense : Expense){
    this._store.update((s) => ({ ...s, expenseData : expense }));
  }
}
