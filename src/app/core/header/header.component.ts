import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { DataStorageService } from 'app/shared/data-storage.service';
import { AuthService } from 'app/auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('menuicon') menuicon: ElementRef;
  @ViewChild('menucontent') menucontent: ElementRef;
  isOpen = false;
  /**
   * AoT error: Property 'authService' is private and only accessible within class 'HeaderComponent'.
   * so on [ngIf]="!authService.isAuthenticated()", we need to do create a fucntion that
   * this component can call
   */
  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private router: Router,
              private renderer: Renderer2) {}
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
  onToggle() {
    /* this is for the toggling the hamburger menu */
    if (!this.isOpen) {
      this.isOpen = true;
      this.renderer.addClass(this.menucontent.nativeElement, 'show');
      this.renderer.addClass(this.menuicon.nativeElement, 'site-header__menu-icon--close-x');
    } else {
      this.isOpen = false;
      this.renderer.removeClass(this.menucontent.nativeElement, 'show');
      this.renderer.removeClass(this.menuicon.nativeElement, 'site-header__menu-icon--close-x');
    }
  }
}