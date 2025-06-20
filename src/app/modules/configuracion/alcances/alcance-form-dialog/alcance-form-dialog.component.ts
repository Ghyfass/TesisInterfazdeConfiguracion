import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-alcance-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './alcance-form-dialog.component.html',
})
export class AlcanceFormDialogComponent {
  modoCreacion: boolean = false;
  alcanceData: any = {
    nombre: '',
    usuarioModificacion: ''
  };

  constructor(
    public dialogRef: MatDialogRef<AlcanceFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modoCreacion = data.modoCreacion ?? false;
    if (this.modoCreacion) {
      // Crear: inicializamos objeto vacío
      this.alcanceData = { nombre: '', usuarioModificacion: '' };
    } else {
      // Editar: clonar datos para evitar modificar referencia directa
      this.alcanceData = { ...data };
    }
  }

  guardar() {
    this.dialogRef.close(this.alcanceData);
  }

  cerrar() {
    this.dialogRef.close();
  }
}
