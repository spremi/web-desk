import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskGroupComponent } from './desk-group.component';

describe('DeskGroupComponent', () => {
  let component: DeskGroupComponent;
  let fixture: ComponentFixture<DeskGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeskGroupComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
