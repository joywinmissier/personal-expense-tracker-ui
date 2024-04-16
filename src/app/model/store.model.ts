import { Expense } from "./expense.model";

export interface ExpenseStore{
    userToken : string;
    editMode : boolean;
    expenseData: Expense;
}