import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NavLink } from '../interfaces/shared.interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

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

  get user() {
    return this.authService.loggedUser;
  }

  logout() {
    this.authService.logout().then(() => this.router.navigateByUrl('ingresar'));
  }
}
