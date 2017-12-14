<template>
<div class="container">
  <div class="jumbotron">
    <svg id="visualisation" width="1000" height="500"></svg>
  </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'statics',
  mounted() {
    var self = this;
    // this.myCategoryConfig.scaleX.labels.push('생활/쇼핑');
    if (!this.$session.exists()) {
      console.log('********** 세션이 없습니다. **********');
    } else {
      console.log('********** 세션이 있습니다. **********');
      // this.u_num = this.$session.getAll();
      console.log('세션 값 확인 ' + this.$session.get('session'));
      var unum = this.$session.get('session');
      var date = new Date();
      var year = date.getFullYear();
      var month = new String(date.getMonth() + 1);
      var day = new String(date.getDate());
      // 한자리수일 경우 0을 채워준다.
      if (month.length == 1) {
        month = "0" + month;
      }
      if (day.length == 1) {
        day = "0" + day;
      }
      var start_date = year + '' + month + '' + day;
      var end_date = start_date;
      var daysago = 30;
      start_date = new Date(date - (3600000 * 24 * daysago));
      var year2 = start_date.getFullYear();
      var month2 = new String(start_date.getMonth() + 1);
      var day2 = new String(start_date.getDate());
      // 한자리수일 경우 0을 채워준다.
      if (month2.length == 1) {
        month2 = "0" + month2;
      }
      if (day2.length == 1) {
        day2 = "0" + day2;
      }
      start_date = year2 + '' + month2 + '' + day2;
      setTimeout(function() {
        axios({
          method: 'post',
          url: 'api/analysis/used_month',
          data: {
            u_num: unum,
            start_date: start_date,
            end_date: end_date
          }
        }).then((response) => {
          console.log('********** used_month 응답 받음 **********');
          var data = [{
            sale: 202,
            year: 20171213
          }, {
            sale: 215,
            year: 20171214
          }
        ];
          var data2 = [];
          var data3 = [];
          var data4 = [];
          var data5 = [];
          var data6 = [];
          console.log(response.data.length);

          for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[i].cate_num);
            if (response.data[i].cate_num == 1) {
              var a = {};
              a.sale = response.data[i].sum_price;
              a.year = response.data[i].c_time;
              // data.push(a);
            } else if (response.data[i].cate_num == 2) {
              var b = {};
              b.sale = response.data[i].sum_price;
              b.year = response.data[i].c_time;
              data2.push(b);
            } else if (response.data[i].cate_num == 3) {
              var c = {};
              c.sale = response.data[i].sum_price;
              c.year = response.data[i].c_time;
              data3.push(c);
            } else if (response.data[i].cate_num == 4) {
              var d = {};
              d.sale = response.data[i].sum_price;
              d.year = response.data[i].c_time;
              data4.push(d);
            } else if (response.data[i].cate_num == 5) {
              var e = {};
              e.sale = response.data[i].sum_price;
              e.year = response.data[i].c_time;
              data5.push(e);
            } else if (response.data[i].cate_num == 6) {
              var f = {};
              f.sale = response.data[i].sum_price;
              f.year = response.data[i].c_time;
              data6.push(f);
            }
          }

          function InitChart() {
            // var data = data;
            var data2 = data2;
            var data3 = data3;
            var data4 = data4;
            var data5 = data5;
            var data6 = data6;
            console.log('넘버' + start_date);
            console.log('넘버' + end_date);
            var start_date = Number(start_date);
            var end_date = Number(end_date);
            console.log('넘버' + start_date);
            console.log('넘버' + end_date);
            var vis = d3.select("#visualisation"),
              WIDTH = 1000,
              HEIGHT = 500,
              MARGINS = {
                top: 20,
                right: 20,
                bottom: 20,
                left: 50
              },
              xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([20171213, 20171215]),
              yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([134, 215]),
              xAxis = d3.svg.axis()
              .scale(xScale),
              yAxis = d3.svg.axis()
              .scale(yScale)
              .orient("left");

            vis.append("svg:g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
              .call(xAxis);
            vis.append("svg:g")
              .attr("class", "y axis")
              .attr("transform", "translate(" + (MARGINS.left) + ",0)")
              .call(yAxis);
            var lineGen = d3.svg.line()
              .x(function(d) {
                return xScale(d.year);
              })
              .y(function(d) {
                return yScale(d.sale);
              })
              .interpolate("basis");
            vis.append('svg:path')
              .attr('d', lineGen(data))
              .attr('stroke', 'green')
              .attr('stroke-width', 2)
              .attr('fill', 'none');
            vis.append('svg:path')
              .attr('d', lineGen(data2))
              .attr('stroke', 'blue')
              .attr('stroke-width', 2)
              .attr('fill', 'none');
            vis.append('svg:path')
              .attr('d', lineGen(data3))
              .attr('stroke', 'red')
              .attr('stroke-width', 2)
              .attr('fill', 'none');
            vis.append('svg:path')
              .attr('d', lineGen(data4))
              .attr('stroke', 'yellow')
              .attr('stroke-width', 2)
              .attr('fill', 'none');
            vis.append('svg:path')
              .attr('d', lineGen(data5))
              .attr('stroke', 'black')
              .attr('stroke-width', 2)
              .attr('fill', 'none');
            vis.append('svg:path')
              .attr('d', lineGen(data6))
              .attr('stroke', 'orange')
              .attr('stroke-width', 2)
              .attr('fill', 'none');
          }
          InitChart();
        });
      }, 800);
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.axis path {
  fill: none;
  stroke: #777;
  shape-rendering: crispEdges;
}

.axis text {
  font-family: Lato;
  font-size: 13px;
}
</style>
