import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

interface Organismo {
  id: number | null;
  nombre: string;
  descripcion: string;
  fechaModificacion: Date | null;
  ultimousuario: string;
  estado: boolean;
}

interface DialogData {
  modoCreacion: boolean;
  organismo: Organismo;
}

@Component({
  selector: 'app-organismo-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  templateUrl: './organismo-form-dialog.component.html',
  styleUrls: ['./organismo-form-dialog.component.css']
})
export class OrganismoFormDialogComponent {
  organismo: Organismo;
  modoCreacion: boolean;

  constructor(
    private dialogRef: MatDialogRef<OrganismoFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.modoCreacion = data.modoCreacion;
    this.organismo = { ...data.organismo };
  }

  guardar(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.organismo);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
