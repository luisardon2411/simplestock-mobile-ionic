import { CanActivateFn, Router } from "@angular/router";
import { inject } from '@angular/core';


export const PublicGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    const token = localStorage.getItem('token');
    if(token) {
        router.navigateByUrl('/dashboard');
        return false;
    }
    return true;
}