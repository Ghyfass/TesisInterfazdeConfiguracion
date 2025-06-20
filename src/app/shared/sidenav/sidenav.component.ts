import { Component } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

// Formularios de subcategorías
import { AlcanceFormDialogComponent } from '../../modules/configuracion/alcances/alcance-form-dialog/alcance-form-dialog.component';
import { ProvinciaFormDialogComponent } from '../../modules/configuracion/provinciass/provincia-form-dialog/provincia-form-dialog.component'; 
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule, NgIf, MatDialogModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  sidebarOpen = true;
  currentSubcategory: string | null = null;

  constructor(private router: Router, private dialog: MatDialog) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.detectSubcategory());

    this.detectSubcategory();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  private detectSubcategory() {
    const url = this.router.url;
    const match = url.match(/\/configuracion\/([^\/]+)/);
    this.currentSubcategory = match ? match[1] : null;
  }

  abrirFormularioCrear() {
    if (!this.currentSubcategory) {
      alert('No se pudo determinar la subcategoría actual.');
      return;
    }

    switch (this.currentSubcategory) {
      case 'alcances':
        this.dialog.open(AlcanceFormDialogComponent, {
          width: '400px',
          data: { modoCreacion: true }
        }).afterClosed().subscribe(result => {
          if (result) {
            alert('Nuevo alcance creado correctamente');
          }
        });
        break;

      case 'provincias':
        this.dialog.open(ProvinciaFormDialogComponent, {
          width: '400px',
          data: { modoCreacion: true }
        }).afterClosed().subscribe(result => {
          if (result) {
            alert('Nueva provincia creada correctamente');
          }
        });
        break;

      default:
        alert(`Crear nuevo elemento en "${this.currentSubcategory}" no está implementado.`);
        break;
    }
  }
}
