import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { TablaDinamicaComponent } from '../../../shared/tabla-dinamica/tabla-dinamica.component';
import { InstitucionFormDialogComponent } from './institucion-form-dialog/institucion-form-dialog.component';
import { ConfirmacionComponent } from '../../../shared/confirmacion/confirmacion.component';
import { ConfiguracionContextService } from '../services/configuracion-context.service';

@Component({
  selector: 'app-instituciones',
  standalone: true,
  imports: [
    TablaDinamicaComponent,
    NgIf,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './instituciones.component.html',
  styleUrls: ['./instituciones.component.css']
})
export class InstitucionesComponent implements OnInit {
  filtro = '';
  dataSource: any[] = [];

  // Columna 'idOrganismo' se muestra, pero no se edita ni crea en formulario
  displayedColumns = ['id', 'nombre', 'idOrganismo', 'descripcion', 'fechaModificacion', 'ultimousuario', 'estado', 'acciones'];

  // Simulación del usuario que está realizando las acciones
  usuarioActualId = 'user123';

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private context: ConfiguracionContextService
  ) {}

  ngOnInit(): void {
    this.context.getInstituciones().subscribe(data => {
      this.dataSource = data;
    });
  }

  get dataFiltrada() {
    const filtroLower = this.filtro.toLowerCase();
    return this.dataSource.filter(item =>
      (item.nombre || '').toLowerCase().includes(filtroLower) ||
      (item.descripcion || '').toLowerCase().includes(filtroLower) ||
      (item.ultimousuario || '').toLowerCase().includes(filtroLower)
    );
  }

  crear() {
    const dialogRef = this.dialog.open(InstitucionFormDialogComponent, {
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
          estado: true
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.nombre.trim() !== '') {
        // Asignar usuario y fecha antes de crear
        result.ultimousuario = this.usuarioActualId;
        result.fechaModificacion = new Date();

        this.context.createInstitucion(result);
        this.snackBar.open('Institución creada', 'Cerrar', { duration: 2500 });
      }
    });
  }

  editar(item: any) {
    const dialogRef = this.dialog.open(InstitucionFormDialogComponent, {
      width: '450px',
      data: {
        modoCreacion: false,
        institucion: { ...item }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Actualizar usuario y fecha antes de actualizar
        result.ultimousuario = this.usuarioActualId;
        result.fechaModificacion = new Date();

        this.context.updateInstitucion(result);
        this.snackBar.open('Institución actualizada', 'Cerrar', { duration: 2500 });
      }
    });
  }

  eliminar(item: any) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '300px',
      data: { mensaje: `¿Está seguro de eliminar "${item.nombre}"?` }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.context.deleteInstitucion(item.id);
        this.snackBar.open('Institución eliminada', 'Cerrar', { duration: 2500 });
      }
    });
  }

  toggleEstado(item: any) {
    this.context.toggleEstadoInstitucion(item.id);
    this.snackBar.open('Estado cambiado', 'Cerrar', { duration: 2500 });
  }
}
