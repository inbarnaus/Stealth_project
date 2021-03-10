import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';

@Component({
  // selector: 'ngx-echarts-bar',
  selector: 'ngx-echarts',
  styleUrls: ['./echarts.component.scss'],
  templateUrl: './echarts.component.html',
  // template: `
  //   <div echarts [options]="options" class="echart">
  //   </div>
  // `,
})

export class EchartsComponent implements OnInit, OnChanges{//implements OnInit
  options:any;
  list: any;
  message={};
  
  constructor(private http: HttpClient, private router: Router){
    this.http = http;
  }

  async ngOnInit(): Promise<void> {
    const headers = { 'content-type': 'application/json'}
    let response = await this.http.get('/pages/charts/get', {'headers':headers}) 
      response.subscribe(
        res=> {
          var options = {};
          var select = document.getElementById('cars');
          var opt = document.createElement("option");
          for (let i = 0; i < (<any> res).length; i++) {
            opt.value = res[i]['procedure'];
            opt.innerHTML = res[i]['procedure'];
            select.appendChild(opt);
            options[res[i]['procedure']] = [res[i]['timestamp'], res[i]['value']];
          }          
          this.list = options;
         },
         error => {
             console.log(error);
         },
         () => {
             console.log("Get Completed");
         }
        );
  }

  async ngOnChanges(){
    var x = (<any> document.getElementById("cars")).selectedIndex;
    var y = (<any> document.getElementById("cars")).options;

    var date = new Date(this.list[y[x].text][0]* 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    const value = this.list[y[x].text][1];

    this.message = {formattedTime, value};
    const headers = { 'content-type': 'application/json'}
    let response = await this.http.post('/pages/charts/get', {formattedTime, value}, {'headers':headers}) 
      response.subscribe(
        res=> {
            console.log("POST completed sucessfully");
         },
         error => {
             console.log(error);
         },
         () => {
             console.log("Get Completed");
         }
        );
  }
  
}
