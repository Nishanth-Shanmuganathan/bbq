import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
// import { NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const MATERIALS = [
  MatIconModule,
  MatInputModule,
  MatRippleModule,
  MatDialogModule,
  MatButtonModule,
  MatDividerModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatProgressBarModule,
  MatListModule,
  MatTooltipModule,
  MatMenuModule,
  MatSidenavModule,
  MatSelectModule,
  MatBadgeModule,
  MatTabsModule,
  MatExpansionModule,
  MatSlideToggleModule
]
@NgModule({
  imports: [...MATERIALS],
  exports: [...MATERIALS]
})
export class AppMaterialModule { }
