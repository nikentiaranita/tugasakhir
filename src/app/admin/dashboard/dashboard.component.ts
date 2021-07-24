import { ModalProductComponent } from './../../components/modal-product/modal-product.component';
import { AdminComponent } from './../admin.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalResep?: number;
  totalUser?: number;
  data: any = {};
  id?: string;

  constructor(
    public fs: AngularFirestore,
    public admin: AdminComponent,
    public modalService: NgbModal,
    config: NgbModalConfig,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.getLast();
    this.getTotal();
  }

  ngOnInit(): void {
  }

  sideBar() {
    this.admin.toggleSideBar();
  }

  getTotal() {
    this.fs.collection('resep').snapshotChanges().subscribe((resp) => {
      this.totalResep = resp.length;
    });

    this.fs.collection('user').snapshotChanges().subscribe((resp) => {
      this.totalUser = resp.length;
    });
  }

  getLast() {
    return this.fs.collection('resep', ref => ref.orderBy('created_at', 'desc').limit(1)).snapshotChanges().subscribe((resp) => {
      this.id = resp[0].payload.doc.id;
      this.data = resp[0].payload.doc.data();
    });
  }

  getDetail() {
    const modalRef = this.modalService.open(ModalProductComponent);
    modalRef.componentInstance.id = this.id;
  }

}
