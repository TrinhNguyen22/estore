import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm: NgForm;

  submitted: boolean;
  invalidRegister: boolean;
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

  ngOnInit() {
  }

  onSubmit(registerForm: NgForm) {
    this.submitted = true;

    if (registerForm.invalid) {
      return;
    }
    this.userService.register(registerForm.value)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.invalidRegister = true;
        }
      );
  }
}
