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
  @Input() backButton: string;
  @Input() isModal!: boolean;

  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);

  //============ auth ==============
  logOut(): void{
    this.firebaseSvc.desconectarGoogle();
  }
  // ============ Router =============
  routerLink(url: string) {
    this.utilSvc.routerLink(url);
  }

  // =========== Modal ============
  dismissModal(){
    this.utilSvc.dismissModal();
  }

  
}
