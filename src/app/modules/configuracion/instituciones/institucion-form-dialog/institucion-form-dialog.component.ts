import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-institucion-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule
  ],
  templateUrl: './institucion-form-dialog.component.html',
  styleUrls: ['./institucion-form-dialog.component.css']
})
export class InstitucionFormDialogComponent {
  institucion: any;
  modoCreacion: boolean;

  constructor(
    private dialogRef: MatDialogRef<InstitucionFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modoCreacion = data.modoCreacion;
    this.institucion = {
      id: data.institucion?.id ?? null,
      nombre: data.institucion?.nombre ?? '',
      idOrganismo: data.institucion?.idOrganismo ?? '',
      descripcion: data.institucion?.descripcion ?? '',
      fechaModificacion: data.institucion?.fechaModificacion ?? null,
      ultimousuario: data.institucion?.ultimousuario ?? '',
      estado: data.institucion?.estado ?? true
    };
  }

  guardar() {
    this.dialogRef.close(this.institucion);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
