import { CanActivateFn, Router } from "@angular/router";
import {  inject } from "@angular/core";
import { FirebaseService } from "../services/firebase.service";

export const authGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    const firebaseSvc = inject(FirebaseService);

    return new Promise(resolve => {
        firebaseSvc.user$.subscribe(user => {
            if (user.user) {
                console.log("dentro do auth.guard");
                resolve(true);
            } else {
                router.navigate(['/']);
                resolve(false)
            }
        })
    })
}