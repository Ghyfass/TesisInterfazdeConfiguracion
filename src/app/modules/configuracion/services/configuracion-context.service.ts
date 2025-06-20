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

  private causas = [
    {
      id: 1,
      titulo: 'Fallo técnico',
      descripcion: 'Problema con el servidor DNS',
      fechaModificacion: new Date('2025-06-15T11:00:00'),
      ultimousuario: 'admin',
      estado: true
    },
    {
      id: 2,
      titulo: 'Actualización programada',
      descripcion: 'Mantenimiento mensual del sistema',
      fechaModificacion: new Date('2025-06-10T08:45:00'),
      ultimousuario: 'editor1',
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
    return [...this.alcances];
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

  // ===== MÉTODOS PARA CAUSAS =====
  getCausas() {
    return [...this.causas];
  }

  createCausa(data: any) {
    const nuevoId = this.causas.length ? Math.max(...this.causas.map(i => i.id)) + 1 : 1;
    const nueva = {
      ...data,
      id: nuevoId,
      fechaModificacion: new Date(),
      ultimousuario: 'admin'
    };
    this.causas.push(nueva);
    return nueva;
  }

  updateCausa(data: any) {
    const index = this.causas.findIndex(c => c.id === data.id);
    if (index !== -1) {
      this.causas[index] = {
        ...this.causas[index],
        ...data,
        fechaModificacion: new Date()
      };
      return this.causas[index];
    }
    return null;
  }

  deleteCausa(id: number) {
    const index = this.causas.findIndex(c => c.id === id);
    if (index !== -1) {
      this.causas.splice(index, 1);
      return true;
    }
    return false;
  }

  toggleEstadoCausa(id: number) {
    const causa = this.causas.find(c => c.id === id);
    if (causa) {
      causa.estado = !causa.estado;
      return causa.estado;
    }
    return null;
  }
}
