import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeSplitComponent } from './merge-split.component';

describe('MergeSplitComponent', () => {
  let component: MergeSplitComponent;
  let fixture: ComponentFixture<MergeSplitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergeSplitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MergeSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
