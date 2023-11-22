import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../service/servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {

  constructor(private userService: ServicioService,private router: Router) {}


  onClick() {
    this.userService.signOut()
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => console.log(error));
  }

}
