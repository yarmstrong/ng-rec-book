import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('el') el: ElementRef;

  constructor(private authServive: AuthService) {}

  ngOnInit() {
    this.el.nativeElement.focus();
  }

  onSignup(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;
    this.authServive.signupUser(email, password);
  }
}
