import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface Usuario {
  nombre: string;
  email: string;
  telefono: string;
  ciudad: string;
  empresa: string;
  web: string;
}

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {

  usuarios: Usuario[] = [
    {
      nombre: 'Juan Perez',
      email: 'juan@gmail.com',
      telefono: '11-2345-6789',
      ciudad: 'Buenos Aires',
      empresa: 'Tech Solutions',
      web: 'www.techsolutions.com'
    },
    {
      nombre: 'Maria Lopez',
      email: 'maria@gmail.com',
      telefono: '11-9876-5432',
      ciudad: 'Córdoba',
      empresa: 'DevSoft',
      web: 'www.devsoft.com'
    }
  ];

  usuariosFiltrados = [...this.usuarios];
  textoBusqueda: string = '';

  constructor(private alertController: AlertController) {}

  filtrarUsuarios() {
    const texto = this.textoBusqueda.toLowerCase();

    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(texto) ||
      usuario.email.toLowerCase().includes(texto)
    );
  }

  async verDetalle(usuario: Usuario) {
    const alert = await this.alertController.create({
      header: usuario.nombre,
      message: `
        Teléfono: ${usuario.telefono}.

        Ciudad: ${usuario.ciudad}.

        Empresa: ${usuario.empresa}.

        Sitio web: ${usuario.web}.
      `,
      buttons: ['Cerrar']
    });

    await alert.present();
  }

}