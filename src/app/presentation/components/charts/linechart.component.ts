import { Component, ViewChild } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexStroke,
    ApexYAxis,
    ApexTitleSubtitle,
    ApexLegend,
    NgApexchartsModule
  } from "ng-apexcharts";

  import { series } from "./data";

  export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    labels: string[];
    legend: ApexLegend;
    subtitle: ApexTitleSubtitle;
  };

@Component({
    selector: 'app-line-chart',
    templateUrl: './linechart.component.html',
    styleUrls: ['./linechart.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NgApexchartsModule
    ]
})
export class LineChartComponent {
    
    @ViewChild('chart') chart!: ChartComponent;
    public chartOptions: any;

    constructor(){
        this.chartOptions = {
            series: [
              {
                name: "STOCK ABC",
                data: [0]
              }
            ],
            chart: {
              type: "area",
              background: 'transparent',
              height: 350,
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: "smooth"
            },
            title: {
              text: "Prodctos vendidos por mes",
              align: "left"
            },
            subtitle: {
                text: "ventas por mes",
                align: "left"
            },
            labels: series.monthDataSeries1.dates,
            xaxis: {
              type: "datetime"
            },
            yaxis: {
              opposite: true
            },
            legend: {
              horizontalAlign: "left"
            },
            theme: {
                mode: 'light',
                palette: 'palette1', 
                monochrome: {
                    enabled: false,
                    color: '#255aee',
                    shadeTo: 'light',
                    shadeIntensity: 0.65
                },
            },
        };
    }

}