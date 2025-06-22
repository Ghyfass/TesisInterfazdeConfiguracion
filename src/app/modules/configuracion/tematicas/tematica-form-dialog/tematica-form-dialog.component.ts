import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

interface Tematica {
  id: number | null;
  nombre: string;
  descripcion: string;
  fechaModificacion: Date | null;
  ultimousuario: string;
  estado: boolean;
}

interface DialogData {
  modoCreacion: boolean;
  tematica: Tematica;
}

@Component({
  selector: 'app-tematica-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  templateUrl: './tematica-form-dialog.component.html',
  styleUrls: ['./tematica-form-dialog.component.css']
})
export class TematicaFormDialogComponent {
  tematica: Tematica;
  modoCreacion: boolean;

  constructor(
    private dialogRef: MatDialogRef<TematicaFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.modoCreacion = data.modoCreacion;
    this.tematica = { ...data.tematica };
  }

  guardar(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.tematica);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
