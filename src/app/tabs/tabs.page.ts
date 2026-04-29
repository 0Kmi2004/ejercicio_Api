import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false
})
export class TabsPage implements OnInit {

  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  textoBusqueda: string = '';
  error: string = '';
  

  constructor(
    private http: HttpClient,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (data) => {
          this.usuarios = data;
          this.usuariosFiltrados = data;
        },
        error: (err) => {
          this.error = 'Error al cargar usuarios';
          console.error(err);
        }
      });
  }

  filtrarUsuarios() {
    const texto = this.textoBusqueda.toLowerCase();

    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.name.toLowerCase().includes(texto) ||
      usuario.email.toLowerCase().includes(texto)
    );
  }

  async verDetalle(usuario: any) {
    const alert = await this.alertController.create({
      header: usuario.name,
      message: `
        <strong>Teléfono:</strong> ${usuario.phone}<br>
        <strong>Ciudad:</strong> ${usuario.address.city}<br>
        <strong>Empresa:</strong> ${usuario.company.name}<br>
        <strong>Web:</strong> ${usuario.website}
      `,
      buttons: ['OK']
    });

    await alert.present();
  }
}