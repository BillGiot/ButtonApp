import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonpageComponent } from './buttonpage.component';

describe('ButtonpageComponent', () => {
  let component: ButtonpageComponent;
  let fixture: ComponentFixture<ButtonpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
