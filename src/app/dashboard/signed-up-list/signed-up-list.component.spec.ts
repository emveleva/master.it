import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedUpListComponent } from './signed-up-list.component';

describe('SignedUpListComponent', () => {
  let component: SignedUpListComponent;
  let fixture: ComponentFixture<SignedUpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignedUpListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedUpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
