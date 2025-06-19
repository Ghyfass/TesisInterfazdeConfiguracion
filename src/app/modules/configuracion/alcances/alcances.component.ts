import { Component } from '@angular/core';
import { TablaDinamicaComponent } from '../../../shared/tabla-dinamica/tabla-dinamica.component';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  ],
  templateUrl: './alcances.component.html',
  styleUrls: ['./alcances.component.css']
})
export class AlcancesComponent {
  filtro = '';

  displayedColumns = ['id', 'nombre', 'fechaModificacion', 'idUsuario', 'estado', 'acciones'];

  dataSource = [
    {
      id: 1,
      nombre: 'Alcance 1',
      fechaModificacion: new Date('2025-06-18T15:30:00'),
      idUsuario: 123,
      estado: true  // true = activo
    },
    {
      id: 2,
      nombre: 'Alcance 2',
      fechaModificacion: new Date('2025-06-17T10:20:00'),
      idUsuario: 456,
      estado: false // false = inactivo
    }
  ];

  get dataFiltrada() {
    const filtroLower = this.filtro.toLowerCase();
    return this.dataSource.filter(item =>
      item.nombre.toLowerCase().includes(filtroLower)
    );
  }

  editar(item: any) {
    console.log('Editar item:', item);
    // Aquí abrirás tu diálogo de formulario para editar
  }

  toggleEstado(item: any) {
    item.estado = !item.estado;
    console.log(`Estado cambiado para id ${item.id} a ${item.estado ? 'Activo' : 'Inactivo'}`);
    // Aquí puedes agregar lógica para guardar el cambio en backend
  }
}
