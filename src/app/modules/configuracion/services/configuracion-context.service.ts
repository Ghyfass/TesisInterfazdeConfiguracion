import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionContextService {
  // Datos simulados para alcances
  private alcances = [
    {
      id: 1,
      nombre: 'Alcance 1',
      fechaModificacion: new Date('2025-06-18T15:30:00'),
      usuarioModificacion: '#123',
      estado: true
    },
    {
      id: 2,
      nombre: 'Alcance 2',
      fechaModificacion: new Date('2025-06-17T10:20:00'),
      usuarioModificacion: '#456',
      estado: false
    }
  ];
  // Datos simulados para tematicas
  private tematicas = [
  {
    id: 1,
    nombre: 'Salud',
    descripcion: 'Temas relacionados con la salud pública',
    fechaModificacion: new Date('2025-06-20T11:00:00'),
    ultimousuario: '#123',
    estado: true
  },
  {
    id: 2,
    nombre: 'Tecnología',
    descripcion: 'Temas sobre avances tecnológicos',
    fechaModificacion: new Date('2025-06-19T15:30:00'),
    ultimousuario: '#456',
    estado: false
  }
];


  // Datos simulados para causas
  private causas = [
    {
      id: 1,
      titulo: 'Fallo técnico',
      descripcion: 'Problema con el servidor DNS',
      fechaModificacion: new Date('2025-06-15T11:00:00'),
      ultimousuario: '#123',
      estado: true
    },
    {
      id: 2,
      titulo: 'Actualización programada',
      descripcion: 'Mantenimiento mensual del sistema',
      fechaModificacion: new Date('2025-06-10T08:45:00'),
      ultimousuario: '#456',
      estado: false
    }
  ];

  // Datos simulados para instituciones
  private instituciones = [
    {
      id: 1,
      nombre: 'Instituto Nacional de Salud',
      idOrganismo: 101,
      descripcion: 'Entidad de investigación en salud pública',
      fechaModificacion: new Date('2025-06-16T14:30:00'),
      ultimousuario: '#123',
      estado: true
    },
    {
      id: 2,
      nombre: 'Universidad de Tecnología',
      idOrganismo: 102,
      descripcion: 'Formación universitaria en áreas tecnológicas',
      fechaModificacion: new Date('2025-06-14T09:10:00'),
      ultimousuario: '#456',
      estado: false
    }
  ];

  // Datos simulados para organismos
  private organismos = [
    {
      id: 1,
      nombre: 'Organismo A',
      descripcion: 'Descripción del Organismo A',
      fechaModificacion: new Date('2025-06-20T12:00:00'),
      ultimousuario: '#123',
      estado: true
    },
    {
      id: 2,
      nombre: 'Organismo B',
      descripcion: 'Descripción del Organismo B',
      fechaModificacion: new Date('2025-06-19T09:30:00'),
      ultimousuario: '#456',
      estado: false
    }
  ];

  // Datos simulados para provincias (nuevo)
  private provincias = [
    {
      id: 1,
      nombre: 'Provincia A',
      codigo: '#01',
      fechaModificacion: new Date('2025-06-19T13:00:00'),
      ultimoUsuario: '#123',
      ultimousuario: '#456',
      estado: true

    },
    {
      id: 2,
      nombre: 'Provincia B',
      codigo: '#02',
      fechaModificacion: new Date('2025-06-18T09:30:00'),
      ultimousuario: '#457',
      estado: false
    }
  ];
  private reglasPorDominio: any[] = [
  {
    id: 1,
    nombre: 'Regla HTTP',
    descripcion: 'Bloqueo de puertos HTTP inseguros',
    fechaModificacion: new Date('2025-06-20T10:00:00'),
    ultimousuario: '#123',
    estado: true
  },
  {
    id: 2,
    nombre: 'Regla HTTPS',
    descripcion: 'Permitir solo conexiones cifradas',
    fechaModificacion: new Date('2025-06-19T09:30:00'),
    ultimousuario: '#456',
    estado: false
  }
];


  // BehaviorSubjects para observables reactivos
  private alcancesSubject = new BehaviorSubject(this.alcances);
  private reglasPorDominioSubject = new BehaviorSubject<any[]>([...this.reglasPorDominio]);
  private causasSubject = new BehaviorSubject(this.causas);
  private institucionesSubject = new BehaviorSubject(this.instituciones);
  private organismosSubject = new BehaviorSubject(this.organismos);
  private provinciasSubject = new BehaviorSubject(this.provincias); // nuevo BehaviorSubject
  private tematicasSubject = new BehaviorSubject<any[]>([...this.tematicas]);

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
  getAlcances(): Observable<any[]> {
    return this.alcancesSubject.asObservable();
  }

  createAlcance(data: any) {
    const nuevoId = this.alcances.length ? Math.max(...this.alcances.map(i => i.id)) + 1 : 1;
    const nuevo = {
      ...data,
      id: nuevoId,
      fechaModificacion: new Date(),
      usuarioModificacion: '#999'  // simulamos ID usuario
    };
    this.alcances.push(nuevo);
    this.alcancesSubject.next([...this.alcances]);
    return nuevo;
  }

  updateAlcance(data: any) {
    const index = this.alcances.findIndex(a => a.id === data.id);
    if (index !== -1) {
      this.alcances[index] = {
        ...this.alcances[index],
        ...data,
        fechaModificacion: new Date(),
        usuarioModificacion: '#999'  // simulamos ID usuario
      };
      this.alcancesSubject.next([...this.alcances]);
      return this.alcances[index];
    }
    return null;
  }

  deleteAlcance(id: number) {
    const index = this.alcances.findIndex(a => a.id === id);
    if (index !== -1) {
      this.alcances.splice(index, 1);
      this.alcancesSubject.next([...this.alcances]);
      return true;
    }
    return false;
  }

  toggleEstadoAlcance(id: number) {
    const alcance = this.alcances.find(a => a.id === id);
    if (alcance) {
      alcance.estado = !alcance.estado;
      this.alcancesSubject.next([...this.alcances]);
      return alcance.estado;
    }
    return null;
  }
  // ===== MÉTODOS PARA TEMÁTICAS =====
getTematicas(): Observable<any[]> {
  return this.tematicasSubject.asObservable();
}

createTematica(data: any) {
  const nuevoId = this.tematicas.length ? Math.max(...this.tematicas.map(i => i.id)) + 1 : 1;
  const nueva = {
    ...data,
    id: nuevoId,
    fechaModificacion: new Date(),
    ultimousuario: '#999'  // simulamos ID usuario
  };
  this.tematicas.push(nueva);
  this.tematicasSubject.next([...this.tematicas]);
  return nueva;
}

updateTematica(data: any) {
  const index = this.tematicas.findIndex(t => t.id === data.id);
  if (index !== -1) {
    this.tematicas[index] = {
      ...this.tematicas[index],
      ...data,
      fechaModificacion: new Date(),
      ultimousuario: '#999'
    };
    this.tematicasSubject.next([...this.tematicas]);
    return this.tematicas[index];
  }
  return null;
}

deleteTematica(id: number) {
  const index = this.tematicas.findIndex(t => t.id === id);
  if (index !== -1) {
    this.tematicas.splice(index, 1);
    this.tematicasSubject.next([...this.tematicas]);
    return true;
  }
  return false;
}

toggleEstadoTematica(id: number) {
  const tematica = this.tematicas.find(t => t.id === id);
  if (tematica) {
    tematica.estado = !tematica.estado;
    this.tematicasSubject.next([...this.tematicas]);
    return tematica.estado;
  }
  return null;
}

  // ===== MÉTODOS PARA CAUSAS =====
  getCausas(): Observable<any[]> {
    return this.causasSubject.asObservable();
  }

  createCausa(data: any) {
    const nuevoId = this.causas.length ? Math.max(...this.causas.map(i => i.id)) + 1 : 1;
    const nueva = {
      ...data,
      id: nuevoId,
      fechaModificacion: new Date(),
      ultimousuario: '#999'  // simulamos ID usuario
    };
    this.causas.push(nueva);
    this.causasSubject.next([...this.causas]);
    return nueva;
  }

  updateCausa(data: any) {
    const index = this.causas.findIndex(c => c.id === data.id);
    if (index !== -1) {
      this.causas[index] = {
        ...this.causas[index],
        ...data,
        fechaModificacion: new Date(),
        ultimousuario: '#999'  // simulamos ID usuario
      };
      this.causasSubject.next([...this.causas]);
      return this.causas[index];
    }
    return null;
  }

  deleteCausa(id: number) {
    const index = this.causas.findIndex(c => c.id === id);
    if (index !== -1) {
      this.causas.splice(index, 1);
      this.causasSubject.next([...this.causas]);
      return true;
    }
    return false;
  }

  toggleEstadoCausa(id: number) {
    const causa = this.causas.find(c => c.id === id);
    if (causa) {
      causa.estado = !causa.estado;
      this.causasSubject.next([...this.causas]);
      return causa.estado;
    }
    return null;
  }

  // ===== MÉTODOS PARA INSTITUCIONES =====
  getInstituciones(): Observable<any[]> {
    return this.institucionesSubject.asObservable();
  }

  createInstitucion(data: any) {
    const nuevoId = this.instituciones.length ? Math.max(...this.instituciones.map(i => i.id)) + 1 : 1;
    const nueva = {
      ...data,
      id: nuevoId,
      fechaModificacion: new Date(),
      ultimousuario: '#999'  // simulamos ID usuario
    };
    this.instituciones.push(nueva);
    this.institucionesSubject.next([...this.instituciones]);
    return nueva;
  }

  updateInstitucion(data: any) {
    const index = this.instituciones.findIndex(i => i.id === data.id);
    if (index !== -1) {
      this.instituciones[index] = {
        ...this.instituciones[index],
        ...data,
        fechaModificacion: new Date(),
        ultimousuario: '#999'  // simulamos ID usuario
      };
      this.institucionesSubject.next([...this.instituciones]);
      return this.instituciones[index];
    }
    return null;
  }

  deleteInstitucion(id: number) {
    const index = this.instituciones.findIndex(i => i.id === id);
    if (index !== -1) {
      this.instituciones.splice(index, 1);
      this.institucionesSubject.next([...this.instituciones]);
      return true;
    }
    return false;
  }

  toggleEstadoInstitucion(id: number) {
    const institucion = this.instituciones.find(i => i.id === id);
    if (institucion) {
      institucion.estado = !institucion.estado;
      this.institucionesSubject.next([...this.instituciones]);
      return institucion.estado;
    }
    return null;
  }

  // ===== MÉTODOS PARA ORGANISMOS =====
  getOrganismos(): Observable<any[]> {
    return this.organismosSubject.asObservable();
  }

  createOrganismo(data: any) {
    const nuevoId = this.organismos.length ? Math.max(...this.organismos.map(i => i.id)) + 1 : 1;
    const nuevo = {
      ...data,
      id: nuevoId,
      fechaModificacion: new Date(),
      ultimousuario: '#999'  // simulamos ID usuario
    };
    this.organismos.push(nuevo);
    this.organismosSubject.next([...this.organismos]);
    return nuevo;
  }

  updateOrganismo(data: any) {
    const index = this.organismos.findIndex(o => o.id === data.id);
    if (index !== -1) {
      this.organismos[index] = {
        ...this.organismos[index],
        ...data,
        fechaModificacion: new Date(),
        ultimousuario: '#999'  // simulamos ID usuario
      };
      this.organismosSubject.next([...this.organismos]);
      return this.organismos[index];
    }
    return null;
  }

  deleteOrganismo(id: number) {
    const index = this.organismos.findIndex(o => o.id === id);
    if (index !== -1) {
      this.organismos.splice(index, 1);
      this.organismosSubject.next([...this.organismos]);
      return true;
    }
    return false;
  }

  toggleEstadoOrganismo(id: number) {
    const organismo = this.organismos.find(o => o.id === id);
    if (organismo) {
      organismo.estado = !organismo.estado;
      this.organismosSubject.next([...this.organismos]);
      return organismo.estado;
    }
    return null;
  }

// ===== MÉTODOS PARA PROVINCIAS =====
getProvincias(): Observable<any[]> {
  return this.provinciasSubject.asObservable();
}

createProvincia(data: any) {
  const nuevoId = this.provincias.length ? Math.max(...this.provincias.map(p => p.id)) + 1 : 1;
  const nueva = {
    ...data,
    id: nuevoId,
    fechaModificacion: new Date(),
    ultimousuario: '#999'  // simulamos ID usuario
  };
  this.provincias.push(nueva);
  this.provinciasSubject.next([...this.provincias]);
  return nueva;
}

updateProvincia(data: any) {
  const index = this.provincias.findIndex(p => p.id === data.id);
  if (index !== -1) {
    this.provincias[index] = {
      ...this.provincias[index],
      ...data,
      fechaModificacion: new Date(),
      ultimousuario: '#999'
    };
    this.provinciasSubject.next([...this.provincias]);
    return this.provincias[index];
  }
  return null;
}

deleteProvincia(id: number) {
  const index = this.provincias.findIndex(p => p.id === id);
  if (index !== -1) {
    this.provincias.splice(index, 1);
    this.provinciasSubject.next([...this.provincias]);
    return true;
  }
  return false;
}

toggleEstadoProvincia(id: number) {
  const provincia = this.provincias.find(p => p.id === id);
  if (provincia) {
    provincia.estado = !provincia.estado;
    this.provinciasSubject.next([...this.provincias]);
    return provincia.estado;
  }
  return null;
}
// ===== MÉTODOS PARA REGLAS POR DOMINIO =====
getReglasPorDominio(): Observable<any[]> {
  return this.reglasPorDominioSubject.asObservable();
}

createReglaPorDominio(data: any) {
  const nuevoId = this.reglasPorDominio.length ? Math.max(...this.reglasPorDominio.map(i => i.id)) + 1 : 1;
  const nueva = {
    ...data,
    id: nuevoId,
    fechaModificacion: new Date(),
    ultimousuario: '#999'  // simulamos ID usuario
  };
  this.reglasPorDominio.push(nueva);
  this.reglasPorDominioSubject.next([...this.reglasPorDominio]);
  return nueva;
}

updateReglaPorDominio(data: any) {
  const index = this.reglasPorDominio.findIndex(r => r.id === data.id);
  if (index !== -1) {
    this.reglasPorDominio[index] = {
      ...this.reglasPorDominio[index],
      ...data,
      fechaModificacion: new Date(),
      ultimousuario: '#999'
    };
    this.reglasPorDominioSubject.next([...this.reglasPorDominio]);
    return this.reglasPorDominio[index];
  }
  return null;
}

deleteReglaPorDominio(id: number) {
  const index = this.reglasPorDominio.findIndex(r => r.id === id);
  if (index !== -1) {
    this.reglasPorDominio.splice(index, 1);
    this.reglasPorDominioSubject.next([...this.reglasPorDominio]);
    return true;
  }
  return false;
}

toggleEstadoReglaPorDominio(id: number) {
  const regla = this.reglasPorDominio.find(r => r.id === id);
  if (regla) {
    regla.estado = !regla.estado;
    this.reglasPorDominioSubject.next([...this.reglasPorDominio]);
    return regla.estado;
  }
  return null;
}

}
