import { AdminComponent } from './../../admin/admin.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-navbar-detail',
  templateUrl: './navbar-detail.component.html',
  styleUrls: ['./navbar-detail.component.scss']
})
export class NavbarDetailComponent implements OnInit {
  @Input() title?: string;
  @Input() button?: any;
  @Input() titleButton?: string;
  @Output() tapButton = new EventEmitter();

  constructor(
    public admin: AdminComponent
  ) { }

  ngOnInit(): void {
  }

  sideBar() {
    this.admin.toggleSideBar();
  }

  tapEmit() {
    this.tapButton?.emit();
  }


}
