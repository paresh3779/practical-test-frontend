import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { signInGuard } from './core/guards/sign-in.guard';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./home/home.component").then(c => c.HomeComponent)
    },
    {
        path: "auth/user-register",
        loadComponent: () => import("./auth/user-register/user-register.component").then(c => c.UserRegisterComponent),
        canActivate: [signInGuard]
    },
    {
        path: "auth/login",
        loadComponent: () => import("./auth/login/login.component").then(c => c.LoginComponent),
        canActivate: [signInGuard]
    },
    {
        path: "my-account/dashboard",
        loadComponent: () => import("./myaccount/dashboard/dashboard.component").then(c => c.DashboardComponent),
        canActivate: [authGuard]
    },
    {
        path: "my-account/profile",
        loadComponent: () => import("./myaccount/profile/profile.component").then(c => c.ProfileComponent),
        canActivate: [authGuard]
    }
];
