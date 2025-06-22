import { Component } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

import { ConfiguracionContextService } from '../../modules/configuracion/services/configuracion-context.service';

// Formularios de subcategorías
import { AlcanceFormDialogComponent } from '../../modules/configuracion/alcances/alcance-form-dialog/alcance-form-dialog.component';
import { ProvinciaFormDialogComponent } from '../../modules/configuracion/provincias/provincia-form-dialog/provincia-form-dialog.component';
import { CausaFormDialogComponent } from '../../modules/configuracion/causas/causa-form-dialog/causa-form-dialog.component';
import { InstitucionFormDialogComponent } from '../../modules/configuracion/instituciones/institucion-form-dialog/institucion-form-dialog.component';
import { OrganismoFormDialogComponent } from '../../modules/configuracion/organismos/organismo-form-dialog/organismo-form-dialog.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule, NgIf, MatDialogModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  sidebarOpen = true;
  currentSubcategory: string | null = null;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private context: ConfiguracionContextService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.detectSubcategory());

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
        this.dialog
          .open(AlcanceFormDialogComponent, {
            width: '400px',
            data: { modoCreacion: true },
          })
          .afterClosed()
          .subscribe((result) => {
            if (result && result.nombre?.trim()) {
              const creado = this.context.createAlcance(result);
              alert(`Nuevo alcance creado (ID: ${creado.id})`);
            }
          });
        break;

      case 'provincias':
        this.dialog
          .open(ProvinciaFormDialogComponent, {
            width: '450px',
            data: {
              modoCreacion: true,
              provincia: {
                id: null,
                nombre: '',
                descripcion: '',
                fechaModificacion: null,
                ultimousuario: '',
                estado: true,
              },
            },
          })
          .afterClosed()
          .subscribe((result) => {
            if (result && result.nombre?.trim()) {
              const creada = this.context.createProvincia(result);
              alert(`Nueva provincia creada (ID: ${creada.id})`);
            }
          });
        break;

      case 'causas':
        this.dialog
          .open(CausaFormDialogComponent, {
            width: '450px',
            data: {
              modoCreacion: true,
              causa: {
                id: null,
                titulo: '',
                descripcion: '',
                fechaModificacion: null,
                ultimousuario: '',
                estado: true,
              },
            },
          })
          .afterClosed()
          .subscribe((result) => {
            if (result && result.titulo?.trim()) {
              const creada = this.context.createCausa(result);
              alert(`Nueva causa creada (ID: ${creada.id})`);
            }
          });
        break;
      case 'organismos':
        this.dialog
          .open(OrganismoFormDialogComponent, {
            width: '450px',
            data: {
              modoCreacion: true,
              organismo: {
                id: null,
                nombre: '',
                descripcion: '',
                estado: true,
                fechaModificacion: null,
                ultimousuario: '',
              },
            },
          })
          .afterClosed()
          .subscribe((result) => {
            if (result && result.nombre?.trim()) {
              const creado = this.context.createOrganismo(result);
              alert(`Nuevo organismo creado (ID: ${creado.id})`);
            }
          });
        break;

      case 'instituciones':
        this.dialog
          .open(InstitucionFormDialogComponent, {
            width: '450px',
            data: {
              modoCreacion: true,
              institucion: {
                id: null,
                nombre: '',
                idOrganismo: '',
                descripcion: '',
                fechaModificacion: null,
                ultimousuario: '',
                estado: true,
              },
            },
          })
          .afterClosed()
          .subscribe((result) => {
            if (result && result.nombre?.trim()) {
              const creada = this.context.createInstitucion(result);
              alert(`Nueva institución creada (ID: ${creada.id})`);
            }
          });
        break;

      default:
        alert(
          `Crear nuevo elemento en "${this.currentSubcategory}" no está implementado.`
        );
        break;
    }
  }
}
