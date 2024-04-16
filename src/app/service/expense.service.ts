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
  // httpHeaders: HttpHeaders = new HttpHeaders({
  //   Authorization: this._storeService.userToken()
  // });
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

  updateExpense(expense : Expense, id : string): Observable<Expense>{
    return this.http.put<Expense>(`${this.baseUrl}/expense/${id}`, expense);
  }
}
