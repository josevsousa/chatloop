import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { EditProfileComponent } from 'src/app/shared/components/edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  fibaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  user!: any;

  ngOnInit() {
     this.user = this.utilsSvc.getElementLocalStorage('user');
  }

  // ===== Atualizar o profile
  editProfile(){
    this.utilsSvc.presentMotal({
      component: EditProfileComponent,
      cssClass: 'edit-profile-modal'
    })
  }

}
