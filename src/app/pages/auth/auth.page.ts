import { Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage{

  auth = inject(Router);
  firebaseSvc = inject(FirebaseService);

  login(){
    this.firebaseSvc.loginGoogle()
 }
}
