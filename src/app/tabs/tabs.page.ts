import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {

  usuarios = [
    { nombre: 'Juan Perez', email: 'juan@gmail.com' },
    { nombre: 'Maria Lopez', email: 'maria@gmail.com' },
    { nombre: 'Carlos Gomez', email: 'carlos@gmail.com' }
  ];

  usuariosFiltrados = [...this.usuarios];

  textoBusqueda: string = '';

  constructor() {}

  filtrarUsuarios() {
    const texto = this.textoBusqueda.toLowerCase();

    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(texto) ||
      usuario.email.toLowerCase().includes(texto)
    );
  }

}