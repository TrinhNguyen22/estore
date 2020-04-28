import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  submitted: boolean;
  invalidLogin: boolean;
  loginError: string;
  error: {};
  model: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    token: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }
  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (form.invalid) {
      return;
    }

    this.authenticationService.login(form.value.email, form.value.password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          this.loginError = 'Username or password is incorrect.';
          this.invalidLogin = true;
        });
  }

}
