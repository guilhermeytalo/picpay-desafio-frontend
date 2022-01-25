import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
            { path: 'listar-pagamentos', loadChildren: () => import('./listar-pagamentos/listar-pagamentos.module').then(m => m.ListarPagamentosModule) },
            
        ]
    },
    {path: 'login', component: LoginComponent},
    
    {path: '**', redirectTo: 'login'}
]