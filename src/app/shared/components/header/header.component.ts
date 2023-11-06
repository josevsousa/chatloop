import { Component, inject, Input } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent{

  @Input() title = '';
  @Input() page = '';

  firebaseSvc = inject(FirebaseService);
  router = inject(Router);

  //====auth====
  logOut(): void{
    this.firebaseSvc.desconectarGoogle();
  }
  linkProfile(){
    this.router.navigate(['auth/profile'])
  }

}
