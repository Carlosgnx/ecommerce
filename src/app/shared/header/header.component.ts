import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/auth/services/user.service';
import { NavLink } from '../interfaces/shared.interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  get user() {
    return this.userService.user;
  }

  navLinks: NavLink[] = [
    {
      nombre: 'Inicio',
      ruta: '/',
    },
    {
      nombre: 'Productos',
      ruta: '/productos',
    },
    {
      nombre: 'Servicios',
      ruta: '/servicios',
    },
    {
      nombre: 'Tiendas',
      ruta: '/tiendas',
    },
  ];

  logout() {
    this.authService.logout().then(() => {
      this.userService.removeUserSession();
      this.router.navigateByUrl('ingresar');
    });
  }
}
