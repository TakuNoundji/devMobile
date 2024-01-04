import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChoiceLevelPage } from './choice-level.page';

describe('ChoiceLevelPage', () => {
  let component: ChoiceLevelPage;
  let fixture: ComponentFixture<ChoiceLevelPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChoiceLevelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
