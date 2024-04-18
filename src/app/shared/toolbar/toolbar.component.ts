import { Component, effect } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StoreService } from '../../service/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  userName: string = ''
  isLoggedIn: boolean = false;
  constructor(private _storeService: StoreService, private _router : Router) {
    effect(() => {
      this.userName = this._storeService.userDetails().name ?? localStorage.getItem('username');
      this.isLoggedIn = this._storeService.isLoggedIn();
    })
  }

  logout() {
    this._storeService.logout();
    this._router.navigate(['/authenticate']);
  }
}
