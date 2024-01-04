import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RubriquesPage } from './rubriques.page';

describe('RubriquesPage', () => {
  let component: RubriquesPage;
  let fixture: ComponentFixture<RubriquesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RubriquesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
