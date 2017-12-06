/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TagInputItemComponent } from './tag-input-item.component';

describe('TagInputItemComponent', () => {
  let component: TagInputItemComponent;
  let fixture: ComponentFixture<TagInputItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagInputItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagInputItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
