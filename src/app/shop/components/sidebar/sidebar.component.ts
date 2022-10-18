import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../interfaces/shop.interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  categorias: Categoria[] = [
    {
      nombre: 'Accesorios',
      ruta: null,
      subcategorias: [
        {
          nombre: 'Mouse',
          ruta: '',
        },
        {
          nombre: 'Teclado',
          ruta: '',
        },
        {
          nombre: 'Memorias',
          ruta: '',
        },
        {
          nombre: 'StreamDeck',
          ruta: '',
        },
        {
          nombre: 'Mousepad',
          ruta: '',
        },
        {
          nombre: 'Estantes',
          ruta: '',
        },
        {
          nombre: 'Audifonos',
          ruta: '',
        },
        {
          nombre: 'Diademas',
          ruta: '',
        },
        {
          nombre: 'Microfonos',
          ruta: '',
        },
      ],
      icono: 'bi-mouse',
    },
    {
      nombre: 'Componentes',
      ruta: null,
      subcategorias: [],
      icono: 'bi-cpu',
    },
    {
      nombre: 'Impresion',
      ruta: null,
      subcategorias: [],
      icono: 'bi-printer',
    },
    {
      nombre: 'Software',
      ruta: null,
      subcategorias: [],
      icono: 'bi-windows',
    },
    {
      nombre: 'Monitores',
      ruta: null,
      subcategorias: [],
      icono: 'bi-display',
    },
    {
      nombre: 'Celulares',
      ruta: null,
      subcategorias: [],
      icono: 'bi-phone',
    },
    {
      nombre: 'Redes',
      ruta: null,
      subcategorias: [],
      icono: 'bi-modem',
    },
    {
      nombre: 'Consumibles',
      ruta: null,
      subcategorias: [],
      icono: 'bi-eyedropper',
    },
    {
      nombre: 'Electrodomesticos',
      ruta: null,
      subcategorias: [],
      icono: 'bi-eyedropper',
    },
  ];
}
