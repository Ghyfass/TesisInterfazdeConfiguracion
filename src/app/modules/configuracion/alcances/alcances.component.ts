import { Component, OnInit } from '@angular/core';
import { TablaDinamicaComponent } from '../../../shared/tabla-dinamica/tabla-dinamica.component';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AlcanceFormDialogComponent } from './alcance-form-dialog/alcance-form-dialog.component';
import { ConfirmacionComponent } from '../../../shared/confirmacion/confirmacion.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfiguracionContextService } from '../services/configuracion-context.service';

@Component({
  selector: 'app-alcances',
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
  templateUrl: './alcances.component.html',
  styleUrls: ['./alcances.component.css']
})
export class AlcancesComponent implements OnInit {
  filtro = '';
  displayedColumns = ['id', 'nombre', 'fechaModificacion', 'usuarioModificacion', 'estado', 'acciones'];
  alcances: any[] = [];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private configService: ConfiguracionContextService
  ) {}

  ngOnInit(): void {
    // Suscribimos para actualizar automáticamente al cambiar datos
    this.configService.getAlcances().subscribe(datos => {
      this.alcances = datos;
    });
  }

  get dataFiltrada() {
    const filtroLower = this.filtro.toLowerCase();
    return this.alcances.filter(item =>
      item.nombre.toLowerCase().includes(filtroLower)
    );
  }

  editar(item: any) {
    const dialogRef = this.dialog.open(AlcanceFormDialogComponent, {
      width: '400px',
      data: { ...item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const actualizado = this.configService.updateAlcance(result);
        if (actualizado) {
          this.snackBar.open('Alcance actualizado', 'Cerrar', { duration: 2500 });
        }
      }
    });
  }

  crear() {
    const dialogRef = this.dialog.open(AlcanceFormDialogComponent, {
      width: '400px',
      data: {
        id: null,
        nombre: '',
        fechaModificacion: null,
        usuarioModificacion: null,
        estado: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.nombre.trim() !== '') {
        this.configService.createAlcance(result);
        this.snackBar.open('Nuevo alcance creado', 'Cerrar', { duration: 2500 });
      }
    });
  }

  toggleEstado(item: any) {
    const nuevoEstado = this.configService.toggleEstadoAlcance(item.id);
    this.snackBar.open(`Estado cambiado a ${nuevoEstado ? 'activo' : 'inactivo'}`, 'Cerrar', { duration: 2500 });
  }

  eliminar(item: any) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '300px',
      data: { mensaje: `¿Está seguro de eliminar "${item.nombre}"?` }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.configService.deleteAlcance(item.id);
        this.snackBar.open('Alcance eliminado', 'Cerrar', { duration: 2500 });
      }
    });
  }
}
