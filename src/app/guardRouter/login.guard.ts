import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
export const loginGuard: CanActivateFn = (route, state) => {
  
  const router: Router = inject(Router);
  const firebaseSvc: FirebaseService = inject(FirebaseService);

  return new Promise(resolve => {
    firebaseSvc.user$.subscribe(user => {
      // se tiver um user não mostrar essa tela login
      if (user.user) {
        // não mostrar essa tela login e enviar para o dashbord
        router.navigate(['/main']);
        resolve(false);
      } else {
        resolve(true);
      }
    })
  })


};