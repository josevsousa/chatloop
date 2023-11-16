import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { EditProfileComponent } from 'src/app/shared/components/edit-profile/edit-profile.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  user = {} as User;
  loadind=true;

  ngOnInit() {
    this.getUserLS();
  }

  getUserLS(){
    // === pegando user no LS ===
    return this.user = this.utilsSvc.getElementLocalStorage('user');
  }

  // ===== Atualizar o profile
  editProfile() {
    this.utilsSvc.presentMotal({
      component: EditProfileComponent,
      cssClass: 'edit-profile-modal'
    }).finally(()=>{
      // atualizar o user de localStorage
      this.getUserLS(); 
    });
  }

}
