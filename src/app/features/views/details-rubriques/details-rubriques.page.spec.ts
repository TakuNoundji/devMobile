import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsRubriquesPage } from './details-rubriques.page';

describe('DetailsRubriquesPage', () => {
  let component: DetailsRubriquesPage;
  let fixture: ComponentFixture<DetailsRubriquesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailsRubriquesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
