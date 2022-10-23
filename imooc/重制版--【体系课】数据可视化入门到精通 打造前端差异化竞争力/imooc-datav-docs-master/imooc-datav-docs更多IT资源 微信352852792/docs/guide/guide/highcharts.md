# Highcharts

[Highcharts](https://www.highcharts.com.cn/) 是一个用纯JavaScript编写的一个图表库， 能够很简单便捷的在web网站或是web应用程序添加有交互性的图表，并且免费提供给个人学习、个人网站和非商业用途使用。Highcharts 系列包含 Highcharts JS，Highstock JS，Highmaps JS 共三款软件，均为纯 JavaScript 编写的 HTML5 图表库。

## Highcharts

Highcharts 是一个用纯 JavaScript 编写的一个图表库， 能够很简单便捷的在 Web 网站或是 Web 应用程序添加有交互性的图表，Highcharts 支持的图表类型有直线图、曲线图、区域图、柱状图、饼状图、散状点图、仪表图、气泡图、瀑布流图等多达 20 种图表，其中很多图表可以集成在同一个图形中形成混合图。
                                                                           
## 案例：Highcharts 折线图

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-highcharts.html"
  width="100%"
  height="400"
/>

::: details
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="https://code.highcharts.com.cn/highcharts/highcharts.js"></script>
    <style>
      #container {
        width: 800px;
        height: 400px;
      }
    </style>
  </head>
  <body>
    <div id="container"></div>
    <script>
      var chart = Highcharts.chart('container', {
        title: {
          text: '2010 ~ 2016 年太阳能行业就业人员发展情况'
        },
        subtitle: {
          text: '数据来源：thesolarfoundation.com'
        },
        yAxis: {
          title: {
            text: '就业人数'
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 2010
          }
        },
        series: [{
          name: '安装，实施人员',
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }, {
          name: '工人',
          data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
        }, {
          name: '销售',
          data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
        }, {
          name: '项目开发',
          data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
        }, {
          name: '其他',
          data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
        }]
      });
    </script>
  </body>
</html>
```
:::

## Highstock

Highstock 是用纯 JavaScript 编写的股票图表控件，可以开发股票走势或大数据量的时间轴图表。它包含多个高级导航组件：预设置数据时间范围，日期选择器、滚动条、平移、缩放功能。

## 案例：平安银行股价K线图

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-highstock.html"
  width="100%"
  height="400"
/>

::: details
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="https://code.highcharts.com.cn/highstock/highstock.js"></script>
    <style>
      #container {
        width: 800px;
        height: 400px;
      }
    </style>
  </head>
  <body>
    <div id="container"></div>
    <script>
      Highcharts.setOptions({
        lang: {
          rangeSelectorZoom: ''
        }
      });
      fetch('https://data.jianshukeji.com/stock/history/000001')
        .then(data => data.json())
        .then(data => {
          if(data.code !== 1) {
			  	  alert('读取股票数据失败！');
				    return false;
          }
          data = data.data;
          var ohlc = [],
            volume = [],
            dataLength = data.length,
          // set the allowed units for data grouping
          groupingUnits = [[
            'week',                         // unit name
            [1]                             // allowed multiples
          ], [
            'month',
            [1, 2, 3, 4, 6]
          ]],
          i = 0;
          for (i; i < dataLength; i += 1) {
            ohlc.push([
              data[i][0], // the date
              data[i][1], // open
              data[i][2], // high
              data[i][3], // low
              data[i][4] // close
            ]);
            volume.push([
              data[i][0], // the date
              data[i][5] // the volume
            ]);
          }
          // create the chart
          var chart = Highcharts.stockChart('container', {
            rangeSelector: {
              selected: 1,
              inputDateFormat: '%Y-%m-%d'
            },
            title: {
              text: '平安银行历史股价'
            },
            xAxis: {
              dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%y-%m',
                year: '%Y'
              }
            },
            tooltip: {
              split: false,
              shared: true,
            },
            yAxis: [{
              labels: {
                align: 'right',
                x: -3
              },
              title: {
                text: '股价'
              },
              height: '65%',
              resize: {
                enabled: true
              },
              lineWidth: 2
            }, {
              labels: {
                align: 'right',
                x: -3
              },
              title: {
                text: '成交量'
              },
              top: '65%',
              height: '35%',
              offset: 0,
              lineWidth: 2
            }],
            series: [{
              type: 'candlestick',
              name: '平安银行',
              color: 'green',
              lineColor: 'green',
              upColor: 'red',
              upLineColor: 'red',
              tooltip: {
              },
              navigatorOptions: {
                color: Highcharts.getOptions().colors[0]
              },
              data: ohlc,
              dataGrouping: {
                units: groupingUnits
              },
              id: 'sz'
            }, {
              type: 'column',
              data: volume,
              yAxis: 1,
              dataGrouping: {
                units: groupingUnits
              }
            }]
          })
        })
    </script>
  </body>
</html>
```
:::

## Highmaps

Highmaps 是一款基于 HTML5 的优秀地图组件。Highmaps 继承了 Highcharts 简单易用的特性，利用它可以方便快捷的创建用于展现销售、选举结果等其他与地理位置关系密切的交互性地图图表。

## 案例：欧洲时区

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-highmaps.html"
  width="100%"
  height="520"
/>

::: details
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://code.highcharts.com.cn/jquery/jquery-1.8.3.min.js"></script>
  <script src="https://code.highcharts.com.cn/highmaps/highmaps.js"></script>
</head>
<body>
<script src="https://img.hcharts.cn/mapdata/countries/us/us-all.js"></script>
<div id="container" style="height: 500px; min-width: 310px; max-width: 600px; margin: 0 auto"></div>
<script>
  $.getJSON('https://data.jianshukeji.com/jsonp?filename=json/us-population-density.json&callback=?', function(data) {
    console.log(data);
    // Make codes uppercase to match the map data
    $.each(data, function() {
      this.code = this.code.toUpperCase()
    })
    // Instanciate the map
    Highcharts.mapChart('container', {
      chart: {
        borderWidth: 1
      },
      title: {
        text: 'US population density (/km²)'
      },
      legend: {
        layout: 'horizontal',
        borderWidth: 0,
        backgroundColor: 'rgba(255,255,255,0.85)',
        floating: true,
        verticalAlign: 'top',
        y: 25
      },
      mapNavigation: {
        enabled: true
      },
      colorAxis: {
        min: 1,
        type: 'logarithmic',
        minColor: '#EEEEFF',
        maxColor: '#000022',
        stops: [
          [0, '#EFEFFF'],
          [0.67, '#4444FF'],
          [1, '#000022']
        ]
      },
      series: [{
        animation: {
          duration: 1000
        },
        data: data,
        mapData: Highcharts.maps['countries/us/us-all'],
        joinBy: ['postal-code', 'code'],
        dataLabels: {
          enabled: true,
          color: 'white',
          format: '{point.code}'
        },
        name: 'Population density',
        tooltip: {
          pointFormat: '{point.code}: {point.value}/km²'
        }
      }]
    })
  })
</script>
</body>
</html>
```
:::
