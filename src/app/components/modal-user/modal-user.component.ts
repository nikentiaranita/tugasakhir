import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from "rxjs/operators";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent implements OnInit {

  imgSrc: string = "assets/img/null-image.png";
  dataUser: any = {};

  selectedImage?: string;
  imgUrl: string = "";

  now: number = Date.now();
  isAdmin: boolean = false;

  @Input() id: any;  

  constructor(
    public activeModal: NgbActiveModal,
    private fire: AngularFirestore,
  ) {}

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.fire.collection('user').doc(this.id).get().subscribe((resp) => {
      this.dataUser = resp.data();
    })
  }

  simpanData() {
    this.fire.collection('user').doc(this.id).update(this.dataUser);
  }
}
