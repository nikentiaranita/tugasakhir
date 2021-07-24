import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDetailComponent } from './navbar-detail.component';

describe('NavbarDetailComponent', () => {
  let component: NavbarDetailComponent;
  let fixture: ComponentFixture<NavbarDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
