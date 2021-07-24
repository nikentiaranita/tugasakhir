import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loading: boolean = false;
  errorMessage?: String;
  showError: boolean = false;
  
  constructor(
    public auth: AngularFireAuth,
    private route: Router,
    public fire: AngularFirestore
  ) {
    auth.authState.subscribe(resp => {
      if (resp) {
        route.navigateByUrl('/admin')
      }
    })
   }

  ngOnInit(): void {
  }


  tapLogin(login: any) {
    this.loading = true;
    this.auth.signInWithEmailAndPassword(
      login.email,
      login.password
    ).then((resp) => {
      this.loading = false;
    }).catch((err) => {
      this.loading = false;
      switch (err['code']) {
        case 'auth/invalid-email':
          this.errorMessage = 'Email anda salah !';
          break;
        case 'auth/user-not-found':
          this.errorMessage = 'User tidak ditemukan !';
          break;
        default:
          this.errorMessage = 'Periksa kembali data anda !';
          console.log(err)
          break;
      }
      this.showError = true;

    })
  }

  tapRegister(register: any) {
    this.loading = true;
    this.auth.createUserWithEmailAndPassword(
      register.email,
      register.password
    ).then((resp) => {
      this.route.navigateByUrl('/login');
      register['role'] = 'user';
      this.fire.collection('user').add(register)
      this.loading = false;
    }).catch((err) => {
      this.loading = false;
      this.errorMessage = err['message'];
      this.showError = true;
    })
  }

  closeAlert() {
    this.showError = false;
  }

}
