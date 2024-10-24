import { Routes } from "@angular/router";

export default[
    {
        path: 'ejemplo1',
        loadComponent:()=>import('./ejemplo1/ejemplo1.component'),
    },
    {
        path: 'zodiaco',
        loadComponent:()=>import('./zodiaco/zodiaco.component'),
    },
    {
        path: 'resistencia',
        loadComponent:()=>import('./resistencia/resistencia.component'),
    },
    {
        path: 'empleado',
        loadComponent:()=>import('./empleado/empleado.component'),
    }

]as Routes