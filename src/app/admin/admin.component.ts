import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, HostListener, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  sideBarOpen: boolean = true;

  constructor(
    public af: AngularFireAuth,
    public router: Router,
  ) { 
    af.authState.subscribe(resp => {
      if (!resp) {
        router.navigateByUrl('/auth')
      }
    })
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
        if(window.innerWidth > 500) {
          this.sideBarOpen = true;
        } else {
          this.sideBarOpen = false;
        }
  }

  toggleSideBar() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  logOut() {
    this.af.signOut().then(resp => {
      this.router.navigateByUrl('auth');
    });
  }

}
