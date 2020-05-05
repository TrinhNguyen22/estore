import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  submitted: boolean;
  invalidLogin: boolean;
  loginError: string;
  error: {};
  model: User = new User();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  onSubmit() {
    this.submitted = true;

    if (!this.model) {
      return;
    }
    this.authenticationService.login(this.model.email, this.model.password).subscribe(
      data => {
        this.router.navigate(['/']);
      })
  }

}
