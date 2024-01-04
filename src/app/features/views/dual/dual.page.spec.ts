import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DualPage } from './dual.page';

describe('DualPage', () => {
  let component: DualPage;
  let fixture: ComponentFixture<DualPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
