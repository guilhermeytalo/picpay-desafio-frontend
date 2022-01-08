import { DropdownModule } from '@/components/dropdown/dropdown.module';
import { HeaderModule } from '@/components/header/header.module';
import { PaginationModule } from '@/components/pagination/pagination.module';
import { AuthModule } from '@/features/auth/auth.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from '../dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        HeaderModule,
        PaginationModule,
        DropdownModule,
        RouterTestingModule.withRoutes([]),
        FormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
