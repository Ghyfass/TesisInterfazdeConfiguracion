import { Routes } from '@angular/router';

import { AlcancesComponent } from './modules/configuracion/alcances/alcances.component';
import { CausasComponent } from './modules/configuracion/causas/causas.component';
import { TiposDeSitiosComponent } from './modules/configuracion/tipos-de-sitios/tipos-de-sitios.component';
import { ReglasPorDominioComponent } from './modules/configuracion/reglas-por-dominio/reglas-por-dominio.component';
import { InstitucionesComponent } from './modules/configuracion/instituciones/instituciones.component';
import { OrganismosComponent } from './modules/configuracion/organismos/organismos.component';
import { ProvinciasComponent } from './modules/configuracion/provincias/provincias.component';
import { TematicasComponent } from './modules/configuracion/tematicas/tematicas.component';

// Importa WelcomeComponent desde la carpeta correcta
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },  // Página inicial con mensaje de bienvenida
  { path: 'configuracion/alcances', component: AlcancesComponent },
  { path: 'configuracion/causas', component: CausasComponent },
  { path: 'configuracion/tipos-de-sitios', component: TiposDeSitiosComponent },
  { path: 'configuracion/reglas-por-dominio', component: ReglasPorDominioComponent },
  { path: 'configuracion/instituciones', component: InstitucionesComponent },
  { path: 'configuracion/organismos', component: OrganismosComponent },
  { path: 'configuracion/provincias', component: ProvinciasComponent },
  { path: 'configuracion/tematicas', component: TematicasComponent },

  // Ruta comodín para rutas no definidas
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
