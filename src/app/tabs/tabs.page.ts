import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

interface Usuario {
  id: number;
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
export class TabsPage implements OnInit {

  usuarios: Usuario[] = [
    {
      id: 1,
      nombre: 'Juan Perez',
      email: 'juan@gmail.com',
      telefono: '11-2345-6789',
      ciudad: 'Buenos Aires',
      empresa: 'Tech Solutions',
      web: 'www.techsolutions.com'
    },
    {
      id: 2,
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
  error: string = '';

  constructor(
    private alertController: AlertController,
    private http: HttpClient,) {}

    ngOnInit() {
      this.obtenerUsuarios();
    }

   obtenerUsuarios() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (data) => {
          this.usuarios = data.map(u => ({
            id: u.id,
            nombre: u.name,
            email: u.email,
            telefono: u.phone,
            ciudad: u.address.city,
            empresa: u.company.name,
            web: u.website
          }));

          this.usuariosFiltrados = this.usuarios;
          this.error = '';
        },
        error: (err) => {
          this.error = 'Error al cargar usuarios';
          console.error(err);
        }
      });}

  filtrarUsuarios() {
    const texto = this.textoBusqueda.toLowerCase();

    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(texto) ||
      usuario.email.toLowerCase().includes(texto)
    );
  }

  ocultarMayoresA5() {
    this.usuariosFiltrados = this.usuariosFiltrados.filter(usuario => usuario.id <= 5);
  }

  async verDetalle(usuario: Usuario) {
    const alert = await this.alertController.create({
      header: usuario.nombre,
      message: `
        Id: ${usuario.id}.

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