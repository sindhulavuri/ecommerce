import { Component } from '@angular/core';
import { UserModel } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userDetail = new UserModel();
  constructor(private Auth: AuthService, private toastr: ToastrService, private router: Router) {

  }
  login() {
    this.Auth.validate(this.userDetail.email, this.userDetail.password)
      .subscribe({
        next: this.handleSuccess.bind(this),
        error: this.handleError.bind(this)

      });
  }
  handleSuccess(response: any) {
    let users = response.map((data: any) => {
      return {
        id: data.payload.doc.id,
        ...(data.payload.doc.data() as UserModel),
      }
    });
    if (users && users.length > 0) {
      let userDetail = users.shift();
      localStorage.setItem('displayName', userDetail!.displayName);
      localStorage.setItem('loggedInUserId', userDetail!.id);
      localStorage.setItem('isAdmin', userDetail!.isAdmin ? 'true' : 'false');

      this.toastr.success('login successfully...!');
      this.router.navigate(['/products']);
    }
    else {
      this.toastr.error('In valid credentials!')
    }
  }
  handleError(response: any) {
    this.toastr.error('In-valid credentials')
  }

}
