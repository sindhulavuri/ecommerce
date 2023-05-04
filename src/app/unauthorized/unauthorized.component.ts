import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent {
  imgUrl: string = "assets/9dfc532d-8f76-4ab1-bfa8-6f8a1b89159f.jpg"
  constructor(private router: Router) {

  }
  go() {
    this.router.navigate(['/products'])
  }

}
