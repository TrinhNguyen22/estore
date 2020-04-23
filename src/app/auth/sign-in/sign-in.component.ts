import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @ViewChild('form') form: NgForm;

  submitted: boolean;
  invalidLogin: boolean;
  model: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: ''
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
    .subscribe(
      data => {
          this.router.navigate(['/']);
      },
      error => {
          this.invalidLogin = true;
      }
    );
  }

}
