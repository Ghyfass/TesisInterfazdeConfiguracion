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
import { CausaFormDialogComponent } from './causa-form-dialog/causa-form-dialog.component';
import { ConfirmacionComponent } from '../../../shared/confirmacion/confirmacion.component';
import { ConfiguracionContextService } from '../services/configuracion-context.service';

@Component({
  selector: 'app-causas',
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
  templateUrl: './causas.component.html',
  styleUrls: ['./causas.component.css']
})
export class CausasComponent implements OnInit {
  filtro = '';
  dataSource: any[] = [];

  displayedColumns = ['id', 'titulo', 'descripcion', 'fechaModificacion', 'ultimousuario', 'estado', 'acciones'];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private context: ConfiguracionContextService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.dataSource = this.context.getCausas();
  }

  get dataFiltrada() {
    const filtroLower = this.filtro.toLowerCase();
    return this.dataSource.filter(item =>
      item.titulo.toLowerCase().includes(filtroLower) ||
      item.descripcion.toLowerCase().includes(filtroLower) ||
      item.ultimousuario.toLowerCase().includes(filtroLower)
    );
  }

  crear() {
    const dialogRef = this.dialog.open(CausaFormDialogComponent, {
      width: '450px',
      data: {
        modoCreacion: true,
        causa: {
          id: null,
          titulo: '',
          descripcion: '',
          fechaModificacion: null,
          ultimousuario: '',
          estado: true
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.titulo.trim() !== '') {
        this.context.createCausa(result);
        this.cargarDatos();
        this.snackBar.open('Nueva causa creada', 'Cerrar', { duration: 2500 });
      }
    });
  }

  editar(item: any) {
    const dialogRef = this.dialog.open(CausaFormDialogComponent, {
      width: '450px',
      data: {
        modoCreacion: false,
        causa: { ...item }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.context.updateCausa(result);
        this.cargarDatos();
        this.snackBar.open('Causa actualizada', 'Cerrar', { duration: 2500 });
      }
    });
  }

  eliminar(item: any) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '300px',
      data: { mensaje: `¿Está seguro de eliminar "${item.titulo}"?` }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.context.deleteCausa(item.id);
        this.cargarDatos();
        this.snackBar.open('Causa eliminada', 'Cerrar', { duration: 2500 });
      }
    });
  }

  toggleEstado(item: any) {
    this.context.toggleEstadoCausa(item.id);
    this.cargarDatos();
    this.snackBar.open(`Estado cambiado`, 'Cerrar', { duration: 2500 });
  }
}
