import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataStorageService } from 'app/shared/data-storage.service';
import { AuthService } from 'app/auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
  /**
   * AoT error: Property 'authService' is private and only accessible within class 'HeaderComponent'.
   * so on [ngIf]="!authService.isAuthenticated()", we need to do create a fucntion that
   * this component can call
   */
  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private router: Router) {}
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
  onSaveData() {
    this.dataStorageService.saveData().subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
  onFetchData() {
    this.dataStorageService.fetchData();
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}