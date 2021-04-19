import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbugComponent } from './searchbug.component';

describe('SearchbugComponent', () => {
  let component: SearchbugComponent;
  let fixture: ComponentFixture<SearchbugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchbugComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
