import { Component } from '@angular/core';
import { ProveedorService } from '../services/proveedor-service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  usuarios: any;

  constructor(
    public proveedorService: ProveedorService

  ) {}

  ngOnInit() {
    this.ionViewDidLoad()
    }

    ionViewDidLoad(){
      this.proveedorService.obtenerDatos()
      .subscribe({
      next: (data) => {
      this.usuarios = data;
      console.log(this.usuarios);
      },
      error: (error)=> {
      console.log(error);
      }
      })
    }}
