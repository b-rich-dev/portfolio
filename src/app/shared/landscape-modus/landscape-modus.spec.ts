import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandscapeModus } from './landscape-modus';

describe('LandscapeModus', () => {
  let component: LandscapeModus;
  let fixture: ComponentFixture<LandscapeModus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandscapeModus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandscapeModus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
