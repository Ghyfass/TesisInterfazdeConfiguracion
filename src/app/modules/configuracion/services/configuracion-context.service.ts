// src/app/modules/configuracion/services/configuracion-context.service.ts
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionContextService {
  private alcances = [
    {
      id: 1,
      nombre: 'Alcance 1',
      fechaModificacion: new Date('2025-06-18T15:30:00'),
      usuarioModificacion: 123,
      estado: true
    },
    {
      id: 2,
      nombre: 'Alcance 2',
      fechaModificacion: new Date('2025-06-17T10:20:00'),
      usuarioModificacion: 456,
      estado: false
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  getSubcategoriaActual(): string | null {
    const url = this.router.url;
    const partes = url.split('/');
    const configIndex = partes.indexOf('configuracion');

    if (configIndex !== -1 && partes.length > configIndex + 1) {
      return partes[configIndex + 1];
    }

    return null;
  }

  // ===== MÉTODOS PARA ALCANCES =====

  getAlcances() {
    return [...this.alcances]; // se devuelve una copia para evitar mutación externa
  }

  createAlcance(data: any) {
    const nuevoId = this.alcances.length ? Math.max(...this.alcances.map(i => i.id)) + 1 : 1;
    const nuevo = {
      ...data,
      id: nuevoId,
      fechaModificacion: new Date(),
      usuarioModificacion: 999
    };
    this.alcances.push(nuevo);
    return nuevo;
  }

  updateAlcance(data: any) {
    const index = this.alcances.findIndex(a => a.id === data.id);
    if (index !== -1) {
      this.alcances[index] = {
        ...this.alcances[index],
        ...data,
        fechaModificacion: new Date()
      };
      return this.alcances[index];
    }
    return null;
  }

  deleteAlcance(id: number) {
    const index = this.alcances.findIndex(a => a.id === id);
    if (index !== -1) {
      this.alcances.splice(index, 1);
      return true;
    }
    return false;
  }

  toggleEstadoAlcance(id: number) {
    const alcance = this.alcances.find(a => a.id === id);
    if (alcance) {
      alcance.estado = !alcance.estado;
      return alcance.estado;
    }
    return null;
  }
}
