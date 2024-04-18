import { UserDetails } from "./auth.model";
import { Expense } from "./expense.model";

export interface ExpenseStore {
    userToken: string;
    userDetails: UserDetails;
    editMode: boolean;
    expenseData: Expense;
    isLoggedIn : boolean;
}