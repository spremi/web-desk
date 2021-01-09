import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskAppComponent } from './desk-app.component';

describe('DeskAppComponent', () => {
  let component: DeskAppComponent;
  let fixture: ComponentFixture<DeskAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeskAppComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
