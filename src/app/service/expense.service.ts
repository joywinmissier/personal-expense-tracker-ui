import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../model/expense.model';
import { StoreService } from './store.service';
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  baseUrl = 'http://localhost:3000/api/v1/tracker';

  constructor(private http: HttpClient, private _storeService : StoreService) { }

  getExpense(id: string): Observable<Expense> {
    return this.http.get<Expense>(`${this.baseUrl}/expense/${id}`);
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.baseUrl}/expense`, expense);
  }

  getAllExpense() : Observable<Expense[]>{
    return this.http.get<Expense[]>(`${this.baseUrl}/expense`);
  }

  getAllExpenseForUser(userId : string) : Observable<Expense[]>{
    return this.http.get<Expense[]>(`${this.baseUrl}/expense/user/${userId}`);
  }

  updateExpense(expense : Expense, id : string): Observable<Expense>{
    return this.http.put<Expense>(`${this.baseUrl}/expense/${id}`, expense);
  }

  deleteExpense(id : string): Observable<string>{
    return this.http.delete(`${this.baseUrl}/expense/${id}`,{responseType: 'text'});

  }
}
