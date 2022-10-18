import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SliderComponent } from './components/slider/slider.component';

@NgModule({
  declarations: [HomeComponent, SidebarComponent, SliderComponent],
  imports: [CommonModule],
})
export class ShopModule {}
