import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-tabla-dinamica',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  templateUrl: './tabla-dinamica.component.html',
  styleUrls: ['./tabla-dinamica.component.css']
})
export class TablaDinamicaComponent {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any[] = [];

  @Output() editar = new EventEmitter<any>();
  @Output() toggleEstado = new EventEmitter<any>();

  onEditar(element: any) {
    this.editar.emit(element);
  }

  onToggleEstado(element: any) {
    this.toggleEstado.emit(element);
  }
}
