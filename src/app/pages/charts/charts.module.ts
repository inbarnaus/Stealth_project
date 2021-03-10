import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { ChartsRoutingModule, routedComponents } from './charts-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EchartsBarComponent } from './echarts/echarts-bar.component';
import { EchartsComponent } from './echarts/echarts.component';
const components = [
  EchartsBarComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    ChartsRoutingModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbCardModule,
    HttpClientModule,
  ],
  declarations: [...routedComponents, ...components],
})
export class ChartsModule {}
