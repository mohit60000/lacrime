import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule, MatSortModule, MatPaginatorModule, MatMenuModule, MatIconModule, MatCardModule, MatSidenavModule, MatToolbarModule, MatListModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes, RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

import 'hammerjs';

import { AppComponent } from './app.component';
import { CmpTop100Table } from './cmp-top100-table/cmp-top100-table.component';
import { SrvTop100Service } from './srv-top100.service';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { CmpYearWiseCrime } from './cmp-year-wise-crime/cmp-year-wise-crime.component';
import { DataOnMapComponent } from './data-on-map/data-on-map.component';

const appRoutes: Routes = [
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
  }
]

@NgModule({
  declarations: [
    AppComponent,
    CmpTop100Table,
    NavmenuComponent,
    CmpYearWiseCrime,
    DataOnMapComponent
  ],
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
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true}
    )
  ],
  providers: [SrvTop100Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
