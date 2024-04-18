import { Injectable, signal, computed } from '@angular/core';
import { ExpenseStore } from '../model/store.model';
import { Expense } from '../model/expense.model';
import { UserDetails } from '../model/auth.model';

const initialState: ExpenseStore = {
  userToken: '',
  userDetails : {} as UserDetails,
  editMode: false,
  expenseData : {} as Expense,
  isLoggedIn: false
};

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private readonly _store = signal(initialState);
  
  readonly userToken = computed(() => this._store().userToken);
  readonly userDetails = computed(() => this._store().userDetails);
  readonly expenseData = computed(() => this._store().expenseData);
  readonly editMode = computed(() => this._store().editMode);
  readonly isLoggedIn = computed(() => this._store().isLoggedIn);

  setUserToken(userToken: string) {
    this._store.update((s) => ({ ...s, userToken, isLoggedIn : true }));
  }

  setEditMode(editMode : boolean){
    this._store.update((s) => ({ ...s, editMode }));
  }

  setExpenseData(expense : Expense){
    this._store.update((s) => ({ ...s, expenseData : expense }));
  }

  setUserDetails(userDetails : UserDetails){
    this._store.update((s) => ({ ...s, userDetails }));
  }

  setLoggedIn(isLoggedIn : boolean){
    this._store.update((s) => ({ ...s, isLoggedIn }));
  
  }

  logout(){
    this._store.update((s) => ({ ...s, userToken : '', isLoggedIn : false }));
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
}
