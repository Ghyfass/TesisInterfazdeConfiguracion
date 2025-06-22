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
import { ProvinciaFormDialogComponent } from './provincia-form-dialog/provincia-form-dialog.component';
import { ConfirmacionComponent } from '../../../shared/confirmacion/confirmacion.component';
import { ConfiguracionContextService } from '../services/configuracion-context.service';

@Component({
  selector: 'app-provincias',
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
  templateUrl: './provincias.component.html',
  styleUrls: ['./provincias.component.css']
})
export class ProvinciasComponent implements OnInit {
  filtro = '';
  dataSource: any[] = [];

  displayedColumns = ['id', 'nombre', 'codigo', 'ultimousuario', 'fechaModificacion', 'estado', 'acciones'];

  usuarioActualId = 'user123';

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private context: ConfiguracionContextService
  ) {}

  ngOnInit(): void {
    this.cargarProvincias();
  }

  cargarProvincias() {
    this.context.getProvincias().subscribe(data => {
      this.dataSource = data;
    });
  }

  get dataFiltrada() {
    const filtroLower = this.filtro.toLowerCase();
    return this.dataSource.filter(item =>
      (item.nombre || '').toLowerCase().includes(filtroLower) ||
      (item.ultimousuario || '').toLowerCase().includes(filtroLower) ||
      (item.codigo || '').toLowerCase().includes(filtroLower)  // <-- AÑADIDO para buscar por código
    );
  }

  editar(item: any) {
    const dialogRef = this.dialog.open(ProvinciaFormDialogComponent, {
      width: '450px',
      data: {
        modoCreacion: false,
        provincia: { ...item }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.ultimousuario = this.usuarioActualId;
        result.fechaModificacion = new Date();

        this.context.updateProvincia(result);
        this.snackBar.open('Provincia actualizada', 'Cerrar', { duration: 2500 });
        this.cargarProvincias();
      }
    });
  }

  eliminar(item: any) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '300px',
      data: { mensaje: `¿Está seguro de eliminar la provincia "${item.nombre}"?` }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.context.deleteProvincia(item.id);
        this.snackBar.open('Provincia eliminada', 'Cerrar', { duration: 2500 });
        this.cargarProvincias();
      }
    });
  }

  toggleEstado(item: any) {
    this.context.toggleEstadoProvincia(item.id);
    this.snackBar.open('Estado cambiado', 'Cerrar', { duration: 2500 });
    this.cargarProvincias();
  }
}
