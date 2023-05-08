import { Component } from '@angular/core';
import { UserModel } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userDetail = new UserModel();
  constructor(private aService: AuthService, private toastr: ToastrService, private router: Router) {

  }
  registerNote() {
    this.aService.register(this.userDetail)
      .then(response => {
        this.toastr.success('registration successful....!');
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.toastr.error('Internal server error...!');
      })
  }

}
