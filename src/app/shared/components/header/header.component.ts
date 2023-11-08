import { Component, inject, Input } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

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
  utilSvc = inject(UtilsService);

  //====auth====
  logOut(): void{
    console.log("logout")
    this.firebaseSvc.desconectarGoogle();
  }
  // ============ Evia a qualquer pagina disponivel =============
  routerLink(url: string) {
    this.utilSvc.routerLink(url);
  }
  

}
