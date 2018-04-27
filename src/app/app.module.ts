import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule, MatSortModule, MatPaginatorModule, MatMenuModule, MatIconModule, MatCardModule, MatSidenavModule, MatToolbarModule, MatListModule} from '@angular/material';
import {MatDialogModule, MatNativeDateModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes, RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule, MatFormFieldModule, MatInputModule} from '@angular/material'
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import 'hammerjs';

import { AppComponent } from './app.component';
import { CmpTop100Table } from './cmp-top100-table/cmp-top100-table.component';
import { SrvTop100Service } from './srv-top100.service';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { CmpYearWiseCrime } from './cmp-year-wise-crime/cmp-year-wise-crime.component';
import { DataOnMapComponent } from './data-on-map/data-on-map.component';
import { CmpYearDataDialog } from './cmp-year-data-dialog/cmp-year-data-dialog.component';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { CmpDayOfWeekGraph } from './cmp-day-of-week-graph/cmp-day-of-week-graph.component';
import { CmpAreaWiseInfo } from './cmp-area-wise-info/cmp-area-wise-info.component';
import { CmpAreaNameDropdown } from './cmp-area-name-dropdown/cmp-area-name-dropdown.component';
import { CmpCrimePercPerYear } from './cmp-crime-perc-per-year/cmp-crime-perc-per-year.component';
import { CmpOptionsToViewDropdown } from './cmp-options-to-view-dropdown/cmp-options-to-view.component';
import { CmpCalculateProbabilityComponent } from './cmp-calculate-probability/cmp-calculate-probability.component';

const appRoutes: Routes = [
  {
    path: '', 
    component: CmpTop100Table
  },
  {
    path: 'Top100Table', 
    component: CmpTop100Table
  },
  {
    path: 'YearCrime',
    component: CmpYearWiseCrime
  },
  {
    path : 'DataOnMap',
    component: DataOnMapComponent
  },
  {
    path : 'GoogleMap',
    component: GoogleMapsComponent
  },
  {
    path : 'DayOfWeekGraph',
    component: CmpDayOfWeekGraph
  },
  {
    path : 'AreaWiseInfo',
    component: CmpAreaWiseInfo
  },
  {
    path : 'CrimePercentagePerYear',
    component: CmpCrimePercPerYear
  },
  {
    path : 'CalculateProbability',
    component: CmpCalculateProbabilityComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    CmpTop100Table,
    NavmenuComponent,
    CmpYearWiseCrime,
    DataOnMapComponent,
    CmpYearDataDialog,
    GoogleMapsComponent,
    CmpDayOfWeekGraph,
    CmpAreaWiseInfo,
    CmpAreaNameDropdown,
    CmpCrimePercPerYear,
    CmpOptionsToViewDropdown,
    CmpCalculateProbabilityComponent
  ],
  entryComponents: [CmpYearDataDialog],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    CdkTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true}
    )
  ],
  providers: [SrvTop100Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
