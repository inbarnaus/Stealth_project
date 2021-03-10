import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-bar',
  template: `
    <div echarts [options]="options" class="echart">
    </div>
  `,
})
export class EchartsBarComponent implements AfterViewInit, OnDestroy, OnChanges {
  options: any = {};
  themeSubscription: any;
  list: any;
  xAxis=[];
  yAxis=[];
  @Input() message: {};
 

  constructor(private theme: NbThemeService, private http: HttpClient) {
    this.http = http;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['message'] && changes['message'].currentValue !== changes['message'].previousValue && changes['message'].previousValue!= undefined) {
        let updated = changes['message'].currentValue;
        this.xAxis = updated['formattedTime'];
        this.yAxis = updated['value'];
        console.log(this.options.xAxis.data)
        this.ngAfterViewInit();
    }
}

  async ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data:[this.xAxis],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'Score',
            type: 'bar',
            barWidth: '60%',
            data:[this.yAxis],
          },
        ],
      };

      console.log(this.message);
    this.options.xAxis.data = this.message[0];
    this.options.series.data = this.message[1];
    console.log(this.options.xAxis.data);
    });

  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
