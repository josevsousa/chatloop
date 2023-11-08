
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return new Promise(resolve => {
      this.firebaseSvc.user$.subscribe(user => {
        // se tiver um user não mostrar essa tela login
        if (user.user) {
          // não mostrar essa tela login e enviar para o dashbord
          this.utilsSvc.routerLink('/main')
          resolve(false);
        } else {
          resolve(true);
        }
      })
    })
  
  } 
}