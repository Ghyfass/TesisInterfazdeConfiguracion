import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-provincia-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './provincia-form-dialog.component.html',
  styleUrls: ['./provincia-form-dialog.component.css']
})
export class ProvinciaFormDialogComponent {
  provincia: any;
  modoCreacion: boolean;

  constructor(
    private dialogRef: MatDialogRef<ProvinciaFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modoCreacion = data.modoCreacion;
    this.provincia = {
      id: data.provincia?.id ?? null,
      nombre: data.provincia?.nombre ?? '',
      codigo: data.provincia?.codigo ?? '',
      fechaModificacion: data.provincia?.fechaModificacion ?? null,
      ultimousuario: data.provincia?.ultimousuario ?? '',
      estado: data.provincia?.estado ?? true
    };
  }

  guardar() {

      this.dialogRef.close(this.provincia);
    
  }

  cancelar() {
    this.dialogRef.close();
  }
}
