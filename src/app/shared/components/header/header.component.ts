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
  @Input() backButton!: String;

  firebaseSvc = inject(FirebaseService);
  router = inject(Router);

  //====auth====
  logOut(): void{
    this.firebaseSvc.desconectarGoogle();
  }
  sendRouter(link: string){
    this.router.navigate([link])
  }

}
