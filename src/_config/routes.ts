import { AuthGuard } from '@/features/auth/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'login',
        loadChildren: () => import('../app/features/login/login.module').then((m) => m.LoginModule),
    },
    {
        path: 'payments',
        loadChildren: () => import('../app/features/payments/payments.module').then((m) => m.PaymentsModule),
        canLoad: [AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
