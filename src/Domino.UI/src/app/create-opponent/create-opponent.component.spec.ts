import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOpponentComponent } from './create-opponent.component';

describe('CreateOpponentComponent', () => {
  let component: CreateOpponentComponent;
  let fixture: ComponentFixture<CreateOpponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOpponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOpponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
