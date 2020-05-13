import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  submitted: boolean;
  model: User = new User();

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  onSubmit(registerForm: NgForm) {
    this.submitted = true;

    if (registerForm.invalid) {
      return;
    }
    this.userService.register(registerForm.value).subscribe(
      data => {
        this.router.navigate(['/login']);
      }
    );
  }
}
