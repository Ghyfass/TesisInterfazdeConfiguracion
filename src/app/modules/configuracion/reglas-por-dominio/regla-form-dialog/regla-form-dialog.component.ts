import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

interface ReglaPorDominio {
  id: number | null;
  nombre: string;
  descripcion: string;
  fechaModificacion: Date | null;
  ultimousuario: string;
  estado: boolean;
}

interface DialogData {
  modoCreacion: boolean;
  regla: ReglaPorDominio;
}

@Component({
  selector: 'app-regla-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  templateUrl: './regla-form-dialog.component.html',
  styleUrls: ['./regla-form-dialog.component.css']
})
export class ReglaFormDialogComponent {
  regla: ReglaPorDominio;
  modoCreacion: boolean;

  constructor(
    private dialogRef: MatDialogRef<ReglaFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.modoCreacion = data.modoCreacion;
    this.regla = { ...data.regla };
  }

  guardar(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.regla);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
