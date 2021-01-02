import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskAppEditComponent } from './desk-app-edit.component';

describe('DeskAppEditComponent', () => {
  let component: DeskAppEditComponent;
  let fixture: ComponentFixture<DeskAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeskAppEditComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
