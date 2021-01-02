import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskAppViewComponent } from './desk-app-view.component';

describe('DeskAppViewComponent', () => {
  let component: DeskAppViewComponent;
  let fixture: ComponentFixture<DeskAppViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeskAppViewComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskAppViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
