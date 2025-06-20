import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-causa-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule
  ],
  templateUrl: './causa-form-dialog.component.html',
  styleUrls: ['./causa-form-dialog.component.css']
})
export class CausaFormDialogComponent {
  causaForm: FormGroup;
  modoCreacion: boolean;

  constructor(
    private dialogRef: MatDialogRef<CausaFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.modoCreacion = data.modoCreacion;

    const causa = data.causa || {};

    this.causaForm = this.fb.group({
      id: [causa.id || null],
      titulo: [causa.titulo || '', Validators.required],
      descripcion: [causa.descripcion || '', Validators.required],
      estado: [causa.estado ?? true],
      fechaModificacion: [causa.fechaModificacion || new Date()],
      ultimousuario: [causa.ultimousuario || 'admin']
    });
  }

  guardar() {
    if (this.causaForm.valid) {
      this.dialogRef.close(this.causaForm.value);
    }
  }

  cancelar() {
    this.dialogRef.close(null);
  }
}
