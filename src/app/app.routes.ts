import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./home/home.component").then(c => c.HomeComponent)
    },
    {
        path: "auth/user-register",
        loadComponent: () => import("./auth/user-register/user-register.component").then(c => c.UserRegisterComponent)
    }
];
