import { NgModule } from '@angular/core';

import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ZommRangePageComponent } from './pages/zomm-range-page/zomm-range-page.component';

const routes: Routes = [
  { path: '', component: MapsLayoutComponent, children: [
    { path: 'fullscreen' , component: FullScreenPageComponent},
    { path: 'zoom-range', component: ZommRangePageComponent},
    { path: 'markers', component: MarkersPageComponent},
    { path: 'property', component: PropertiesPageComponent},
    { path: '**', redirectTo: 'fullscreen', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
