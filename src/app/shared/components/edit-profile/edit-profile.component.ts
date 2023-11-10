import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent  implements OnInit {

  utilsSvc = inject(UtilsService);
  user!: any;

  form = new FormGroup({
    displayName: new FormControl('joooo', Validators.required)
  })

  ngOnInit() {
     this.user = this.utilsSvc.getElementLocalStorage('user');
  }
}
