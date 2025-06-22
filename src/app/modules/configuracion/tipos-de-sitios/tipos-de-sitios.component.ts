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
import { ConfirmacionComponent } from '../../../shared/confirmacion/confirmacion.component';
import { TipoFormDialogComponent } from './tipo-form-dialog/tipo-form-dialog.component';
import { ConfiguracionContextService } from '../services/configuracion-context.service';

@Component({
  selector: 'app-tipos-de-sitio',
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
  templateUrl: './tipos-de-sitios.component.html',
  styleUrls: ['./tipos-de-sitios.component.css']
})
export class TiposDeSitioComponent implements OnInit {
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
    this.context.getTiposDeSitio().subscribe(data => {
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
    const dialogRef = this.dialog.open(TipoFormDialogComponent, {
      width: '450px',
      data: {
        modoCreacion: true,
        tipo: {
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
        this.context.createTipoDeSitio(result);
        this.snackBar.open('Tipo de sitio creado', 'Cerrar', { duration: 2500 });
      }
    });
  }

  editar(item: any) {
    const dialogRef = this.dialog.open(TipoFormDialogComponent, {
      width: '450px',
      data: {
        modoCreacion: false,
        tipo: { ...item }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.ultimousuario = this.usuarioActualId;
        result.fechaModificacion = new Date();
        this.context.updateTipoDeSitio(result);
        this.snackBar.open('Tipo de sitio actualizado', 'Cerrar', { duration: 2500 });
      }
    });
  }

  eliminar(item: any) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '300px',
      data: { mensaje: `¿Está seguro de eliminar el tipo de sitio "${item.nombre}"?` }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.context.deleteTipoDeSitio(item.id);
        this.snackBar.open('Tipo de sitio eliminado', 'Cerrar', { duration: 2500 });
      }
    });
  }

  toggleEstado(item: any) {
    this.context.toggleEstadoTipoDeSitio(item.id);
    this.snackBar.open('Estado cambiado', 'Cerrar', { duration: 2500 });
  }
}
