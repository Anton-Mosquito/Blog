import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderForFilmsComponent } from './loader-for-films.component';

describe('LoaderForFilmsComponent', () => {
  let component: LoaderForFilmsComponent;
  let fixture: ComponentFixture<LoaderForFilmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderForFilmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderForFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
