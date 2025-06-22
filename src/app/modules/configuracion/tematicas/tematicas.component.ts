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
import { TematicaFormDialogComponent } from './tematica-form-dialog/tematica-form-dialog.component';
import { ConfirmacionComponent } from '../../../shared/confirmacion/confirmacion.component';
import { ConfiguracionContextService } from '../services/configuracion-context.service';

@Component({
  selector: 'app-tematicas',
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
  templateUrl: './tematicas.component.html',
  styleUrls: ['./tematicas.component.css']
})
export class TematicasComponent implements OnInit {
  filtro = '';
  dataSource: any[] = [];
  displayedColumns = ['id', 'nombre', 'descripcion', 'fechaModificacion', 'ultimousuario', 'estado', 'acciones'];

  usuarioActualId = 'user123';

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private context: ConfiguracionContextService
  ) {}

  ngOnInit(): void {
    this.context.getTematicas().subscribe(data => {
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
    const dialogRef = this.dialog.open(TematicaFormDialogComponent, {
      width: '450px',
      data: {
        modoCreacion: true,
        tematica: {
          id: null,
          nombre: '',
          descripcion: '',
          fechaModificacion: null,
          ultimousuario: '',
          estado: true
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.nombre.trim() !== '') {
        result.ultimousuario = this.usuarioActualId;
        result.fechaModificacion = new Date();
        this.context.createTematica(result);
        this.snackBar.open('Temática creada', 'Cerrar', { duration: 2500 });
      }
    });
  }

  editar(item: any) {
    const dialogRef = this.dialog.open(TematicaFormDialogComponent, {
      width: '450px',
      data: {
        modoCreacion: false,
        tematica: { ...item }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.ultimousuario = this.usuarioActualId;
        result.fechaModificacion = new Date();
        this.context.updateTematica(result);
        this.snackBar.open('Temática actualizada', 'Cerrar', { duration: 2500 });
      }
    });
  }

  eliminar(item: any) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '300px',
      data: { mensaje: `¿Está seguro de eliminar la temática "${item.nombre}"?` }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.context.deleteTematica(item.id);
        this.snackBar.open('Temática eliminada', 'Cerrar', { duration: 2500 });
      }
    });
  }

  toggleEstado(item: any) {
    this.context.toggleEstadoTematica(item.id);
    this.snackBar.open('Estado cambiado', 'Cerrar', { duration: 2500 });
  }
}
