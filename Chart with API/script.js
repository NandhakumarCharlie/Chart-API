// Function to set the default end date to the current date
function setDefaultEndDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  var currentDate = yyyy + '-' + mm + '-' + dd;

  document.getElementById("end_date").value = currentDate;
}

let covidData = {};

const startdate = new Date("2020-04-01");
const enddate = new Date("2020-04-30");

function drawGraph() {

  const chart = echarts.init(document.getElementById('chart'));

  const countries = Object.keys(covidData["AN"]["dates"]).filter((v) => new Date(v) >= startdate && new Date(v) <= enddate);
  const caseCounts = [];

  countries.forEach((curr) => {
    caseCounts.push(covidData["AN"]["dates"][curr]["total"]["confirmed"])
  });

  // console.log(countries);

  //bar chart
  const option = {
    title: {
      text: 'COVID-19 Cases',
      subtext: 'Data from Mock API',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundcolor: '#6a7985'
        }
      },
    },
    xAxis: {
      type: 'category',
      boundryGap: true,
      data: countries,
      axisLabel: {
        interval: 0,
        rotate: 40,
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Cases',
        type: 'line',
        stack: 'Total',
        showSymbol: false,
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: caseCounts,
      },
      {
        name: 'cases2',
        type: 'line',
        stack: 'Total',
        showSymbol: false,
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: caseCounts,
      },
      {
        name: 'cases3',
        type: 'line',
        stack: 'Total',
        showSymbol: false,
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: caseCounts
      },
      {
        name: 'cases4',
        type: 'line',
        stack: 'Total',
        showSymbol: false,
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: caseCounts
      },
      {
        name: 'cases5',
        type: 'line',
        stack: 'Total',
        showSymbol: false,
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: caseCounts
      },
    ],
  };

  chart.setOption(option);
}

async function run() {
  const response = await fetch("https://data.covid19india.org/v4/min/timeseries.min.json");
  covidData = await response.json();

  drawGraph();
}

run();
// First Chart end 

// Second chart 
fetch('https://data.covid19india.org/v4/min/data.min.json')
  .then(response => response.json())
  .then(data => {
    // Process and use the data for your chart
    // console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

var myChart = echarts.init(document.getElementById('mychart'));

var dates = ['2023-10-01', '2023-10-02', '2023-10-03', '2023-10-04', '2023-10-05', '2023-10-13', '2023-10-30',
  '2023-10-15', '2023-10-23', '2023-10-06'];
var dailyCases = [100, 150, 120, 200, 180, 560, 345, 231, 642, 231];

var option = {
  title: {
    text: 'COVID-19 Daily Cases'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  xAxis: {
    type: 'category',
    data: dates
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    name: 'Daily Cases',
    type: 'line',
    stack: 'Total Cases',
    areaStyle: {},
    data: dailyCases
  }]
};

myChart.setOption(option);
// second chartend 

// Third Chart 

fetch('radar-data.json')
  .then(response => response.json())
  .then(data => {
    var indicator = data.map(item => ({ text: item.name }));
    var current = data.map(item => (item.current));
    var deaths = data.map(item => (item.deaths));
    var cured = data.map(item => (item.cured));
    // console.log(current);
    // console.log(deaths);
    // console.log(cured);
    var chartDom = document.getElementById('radar-chart');
    var myChart = echarts.init(chartDom);
    var radarOption = {
      title: {
        text: 'COVID-19 Radar Chart Example',
      },
      tooltip: {},
      radar: {
        indicator: indicator,
        center: ['50%', '50%'],
        radius: 120,
        startAngle: 90,
        splitNumber: 4,
        shape: 'circle',
        axisName: {
          formatter: '{value}',
          color: '#428BD4',
        },
        splitArea: {
          areaStyle: {
            color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowBlur: 10,
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(211, 253, 250, 0.8)',
          },
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(211, 253, 250, 0.8)',
          },
        },
      },
      series: [
        {
          type: 'radar',
          emphasis: {
            lineStyle: {
              width: 4
            }
          },
          data: [
            {
              value: current,
              name: 'Current'
            },
            {
              value: deaths,
              name: 'Deaths'
            },
            {
              value: cured,
              name: 'Cured'
            }
          ]
        }
      ]
    };
    myChart.setOption(radarOption);
  })
  .catch(error => console.error('Error loading radar data:', error));
// Third Chart End

// Fourth Chart
var heatchart = document.getElementById('heatmap-chart');
var myChart = echarts.init(heatchart);

var dates = [];
var vavNames = [];
var heatmapData = [];

var option = {
  title: {
    text: 'HeatMap Chart',
    left: 'center'
  },
  tooltip: {
    position: 'top'
  },
  grid: {
    height: '50%',
    top: '10%'
  },
  xAxis: {
    type: 'category',
    data: dates,
    splitArea: {
      show: true
    }
  },
  yAxis: {
    type: 'category',
    data: vavNames,
    splitArea: {
      show: true
    }
  },
  visualMap: {
    min: 0,
    max: 30,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: '15%'
  },
  series: [
    {
      name: 'Punch Card',
      type: 'heatmap',
      data: heatmapData,
      label: {
        show: true
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

option && myChart.setOption(option);

fetch('heatmap-data.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      if (!dates.includes(item.Time)) {
        dates.push(item.Time);
      }
      if (!vavNames.includes(item.vav_name)) {
        vavNames.push(item.vav_name);
      }
    });

    heatmapData = data.map(item => [dates.indexOf(item.Time), vavNames.indexOf(item.vav_name), parseFloat(item.Average_temp).toFixed(2)]);

    option.xAxis.data = dates;
    option.yAxis.data = vavNames;
    option.series[0].data = heatmapData;

    myChart.setOption(option);
  });
// Fourth Chart End

// Fiveth Chart 

const nodes = [];
const links = [];

fetch('sankey-data.json')
  .then(response => response.json())
  .then(jsonData => {
    // console.log(jsonData); 

    if (
      Array.isArray(jsonData) &&
      jsonData.length > 0 &&
      jsonData[0].result &&
      jsonData[0].result.data &&
      jsonData[0].result.data.data
    ) {
      const gblVar = jsonData[0].result.data.data;
      const nodeNameSet = new Set();

      gblVar.forEach(item => {
        nodeNameSet.add(item.area_name);
        nodeNameSet.add(item.building_name);
        nodeNameSet.add(item.floor_name);
        nodeNameSet.add(item.room_id);
        nodeNameSet.add(item.equi_nam);

        links.push({
          source: item.area_name,
          target: item.building_name,
          value: parseFloat(item.flowrate)
        });

        links.push({
          source: item.building_name,
          target: item.floor_name,
          value: parseFloat(item.flowrate)
        });

        links.push({
          source: item.floor_name,
          target: item.room_id,
          value: parseFloat(item.flowrate)
        });

        links.push({
          source: item.room_id,
          target: item.equi_nam,
          value: parseFloat(item.flowrate)
        });
      });

      const uniqueNodes = Array.from(nodeNameSet);
      const nodes = uniqueNodes.map(name => ({ name }));
      // console.log(nodes);
      // console.log(links);
      const sankeyChart = echarts.init(document.getElementById('sankey-chart'));

      const optionsankey = {
        title: {
          text: 'Sankey Diagram',
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'sankey',
            layout: 'none',
            emphasis: {
              focus: 'adjacency'
            },
            data: nodes,
            links: links,
          }
        ]
      };

      sankeyChart.setOption(optionsankey);
    }
  })
  .catch(error => console.error('Error fetching JSON data:', error));
// fiveth chart end 


// Sixth Chart 
fetch('gauge-data.json')
  .then(response => response.json())
  .then(data => {
    // Initialize ECharts instance
    var gaugechart = echarts.init(document.getElementById('gauge-chart'));

    // Create the option for the gauge chart
    var option = {
      title: {
        text: 'Gauge',
        left: 'center'
      },
      series: [
        {
          type: 'gauge',
          detail: { formatter: '{value}°C' },
          data: [{ value: data.temperature, name: data.description }],
          axisLabel: { show: true },
          title: {
            show: true,
            offsetCenter: [0, '70%'],
            textStyle: {
              fontSize: 12
            }
          }
        }
      ]
    };
    //   // Function to update the temperature value randomly
    //   function updateTemperature() {
    //     var temperatureValue = Math.random() * 10 + 20; // Random temperature between 20°C and 30°C
    //     option.series[0].data[0].value = temperatureValue.toFixed(1);
    //     chart.setOption(option);
    // }

    // // Periodically update the temperature value
    // setInterval(updateTemperature, 2000); 

    // Set the option and render the chart
    gaugechart.setOption(option);
  })
  .catch(error => console.error('Error loading data:', error));
// sixth chart end 

// Seventh Chart 
var diskchart = document.getElementById('disk-chart');
var myChartdisk = echarts.init(diskchart);
var option;
myChart.showLoading();

fetch('disk-data.json')
  .then(response => response.json())
  .then(diskData => {
    myChart.hideLoading();
    const formatUtil = echarts.format;

    function getLevelOption() {
      return [
        {
          itemStyle: {
            borderWidth: 0,
            gapWidth: 5
          }
        },
        {
          itemStyle: {
            gapWidth: 1
          }
        },
        {
          colorSaturation: [0.35, 0.5],
          itemStyle: {
            gapWidth: 1,
            borderColorSaturation: 0.6
          }
        }
      ];
    }

    myChartdisk.setOption({
      title: {
        text: 'Disk Usage',
        left: 'center'
      },
      tooltip: {
        formatter: function (info) {
          var value = info.value;
          var treePathInfo = info.treePathInfo;
          var treePath = [];
          for (var i = 1; i < treePathInfo.length; i++) {
            treePath.push(treePathInfo[i].name);
          }
          return [
            '<div class="tooltip-title">' +
            formatUtil.encodeHTML(treePath.join('/')) +
            '</div>',
            'Disk Usage: ' + formatUtil.addCommas(value) + ' KB'
          ].join('');
        }
      },
      series: [
        {
          name: 'Disk Usage',
          type: 'treemap',
          visibleMin: 300,
          label: {
            show: true,
            formatter: '{b}'
          },
          itemStyle: {
            borderColor: '#fff'
          },
          levels: getLevelOption(),
          data: diskData
        }
      ]
    });
  })
  .catch(error => {
    console.error('Error loading JSON data:', error);
  });

// Seventh Chart end 

// Eighth chart 
var ohlc = echarts.init(document.getElementById('ohlc-chart'))

fetch('ohlc-data.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var dates = data.map(function (item) {
      return item.date;
    })
    var ohlcData = data.map(function (item) {
      return [item.open, item.close, item.low, item.high];
    });
    // console.log(dates);
    // console.log(ohlcData);

    var ohlcoption = {
      title: {
        text: 'OHLC Chart',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      xAxis: {
        data: dates,
      },
      yAxis: {},
      series: [
        {
          type: 'candlestick',
          data: ohlcData,
          itemStyle: {
            color: '#ef232a',
            color0: '#14b143',
            borderColor: '#ef232a',
            borderColor0: '#14b143',
          },
        },
      ],
    };

    ohlc.setOption(ohlcoption);

  })
  .catch(function (error) {
    console.error("load to fail Data from Json :", error);
  });
// Eighth Chart end 

// Nineth chart 
// Fetching Api Data 
fetch('treemap-chart.json')
  .then(response => response.json())
  .then(data => {
    console.log('Fetched raw data:', data); // Log the raw data
    const treemapData = convertToTreemap(data);
    renderTreemap(treemapData);
  })
  .catch(error => console.error('Error fetching data:', error));

// ConvertToTreemap Function To convert the Structure 
function convertToTreemap(data) {
  if (!data || !data[0] || !data[0].result || !data[0].result.data || !data[0].result.data.data) {
    console.error('Invalid data format:', data);
    return { name: 'kadubeesanahalli', children: [] };
  }

  const treemapData = {
    name: 'kadubeesanahalli',
    children: []
  };

  data[0].result.data.data.forEach(item => {
    if (!item.building_name || !item.floor_name || !item.room_name || !item.room_id || !item.equi_nam || !item.flowrate) {
      console.error('Invalid item format:', item);
      return;
    }
    console.log('Flowrate value:', item.flowrate);
    const buildingNode = findOrCreateNode(treemapData, item.building_name);
    const floorNode = findOrCreateNode(buildingNode, item.floor_name);
    const roomNode = findOrCreateNode(floorNode, item.room_name, item.room_id);
    const equipmentNode = findOrCreateNode(roomNode, item.equi_nam);

    const flowrateValue = findOrCreateNode(equipmentNode, item.flowrate);
    if (!isNaN(flowrateValue)) {
      const flowrateNode = { name: item.equi_nam, value: flowrateValue };
      equipmentNode.children.push(flowrateNode);

    } else {
      console.error('Invalid flowrate value:', item.flowrate);
    }
  });
  // console.log('Converted treemap data:', treemapData);
  return treemapData;
}

function findOrCreateNode(parentNode, nodeName) {
  const existingNode = parentNode.children.find(node => node.name === nodeName);

  if (existingNode) {
    return existingNode;
  } else {
    const newNode = { name: nodeName, children: [] };
    parentNode.children.push(newNode);
    return newNode;
  }
};
function renderTreemap(data) {
  const tChart = echarts.init(document.getElementById('treemap-chart'));
  // console.log('Data passed to ECharts:', data); 
  tChart.setOption({
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [
      {
        type: 'tree',
        data: [data],
        top: '1%',
        left: '7%',
        bottom: '1%',
        right: '20%',
        symbolSize: 15,
        initialTreeDepth: 5,
        label: {
          position: 'bottom',
          verticalAlign: 'middle',
          align: 'right',
          fontSize: 9,
          formatter: function (params) {
            return params.data.name;
          }
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          }
        },
        emphasis: {
          focus: 'descendant'
        },
        expandAndCollapse: true,
        anmationDuration: 550,
        animationDurationUpdate: 750
      }
    ]
  });
}

// Nineth chrt end 