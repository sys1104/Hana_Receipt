<template>
<div id="wordcloudlist" class="table-users container" style="width:100%">
  <h2>----------------------------------------------</h2>
  <h2>워드클라우드</h2>
  <div id="wordvalue" style="background-color:#FAFAFA;">

  </div>
</div>
</template>
<style>
    @font-face {
        font-family: 'overwatch';
        src: url('/fonts/koverwatch.ttf');
    }
</style>
<script>
    import axios from 'axios'
    export default {
      data: function () {
        return {
          results:'',
          results2:[],
          flag:false,
          result3 : ''
        }
      },
      components:{
      },
      methods :{
        showWordCloud(wordresult){

          var wResult = [];
          var cResult = [];
          var lala = [];
          lala = wordresult;

          for(var m=0; m<lala.length; m++){
            for(var n=0; n<2; n++){
              if(n == 0){
                wResult.push(lala[m][0]);
              }else if(n == 1){
                cResult.push(lala[m][1]);
              }
            }
          }
          let index = 0;
          function showRandom (index){
            return cResult[index];
          }

          let index2 = 0;
          function showWord (index2){
            return wResult[index2];
          }

          //워드클라우드 디자인 및 사용
          var width = 1000,
              height = 850;
          var fill = function(i){ return d3.schemeCategory20b[i];};
          var svg = d3.select("#wordvalue").append("svg")
              .attr("width", width)
              .attr("height", height);
          d3.csv(wResult, function (data) {
              showCloud(data)
              setInterval(function(){
                    index = 0;
                    index2 = 0;
                   showCloud(data)
              },3000)
          });

          var svg = d3.select("svg")
                      .append("g")
                      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")


          function showCloud(data) {
              d3.layout.cloud().size([width, height])
                  //클라우드 레이아웃에 데이터 전달
                  .words(wResult.map(function(d) {
                      return {text: d, size: setTimeout(showRandom(index++),0)*2, test: "haha"};
                    }))
                  // function() { return ~~(Math.random() * 2) * 90; }
                  .rotate(0)
                  .font("Impact")
                  //스케일로 각 단어의 크기를 설정
                  .fontSize(function(d) { return showRandom(index2++)*20; })
                  //클라우드 레이아웃을 초기화 > end이벤트 발생 > 연결된 함수 작동
                  .on("end", draw)
                  .start();

              function draw(words) {
                  var cloud = svg.selectAll("text").data(words)
                  //Entering words
                  cloud.enter()
                      .append("text")
                      .style("font-family", "overwatch")
                      .style("fill", function(d, i) { return fill(i); })
                      .style("fill-opacity", .5)
                      .attr("text-anchor", "middle")
                      .attr('font-size', function(d) { return d.size + "px"; })
                      .text(function (d) {
                          return d.text;
                      });
                  cloud
                      .transition()
                      .duration(600)
                      .style("font-size", function (d) {
                          return d.size + "px";
                      })
                      .attr("transform", function (d) {
                          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                      })
                      .style("fill-opacity", 1);
              }
          }

          // var fill = function(i){ return d3.schemeCategory20b[i];};
          // var layout = d3.layout.cloud()
          //     .size([1000, 900])
          //     // .words(b)
          //       .words(wResult.map(function(d) {
          //           return {text: d, size: setTimeout(showRandom(index++),0)*2, test: "haha"};
          //         }))
          //       .padding(5)
          //       // function() { return ~~(Math.random() * 2) * 90; }
          //       .rotate(function() { return ~~(Math.random() * 2) * 90; })
          //       .font("Impact")
          //       // function(d) { return d.size; }
          //       .fontSize(function(d) { return showRandom(index2++)*20; })
          //       .on("end", draw);
          //
          //       layout.start();
          //
          //       function draw(words) {
          //         d3.select("#wordvalue").append("svg")
          //         .attr("width", layout.size()[0])
          //         .attr("height", layout.size()[1])
          //         .append("g")
          //         .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
          //         .selectAll("text")
          //         .data(words)
          //         .enter().append("text")
          //         .style("font-size", function(d) { return d.size + "px"; })
          //         .style("font-family", "Impact")
          //         .style("fill", function(d, i) { return fill(i); })
          //         .attr("text-anchor", "middle")
          //         .attr("transform", function(d) {
          //           return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          //         })
          //         .text(function(d) { return d.text; });
          //       }
        }
    },
    mounted(){
      console.log('WordCloud Mounted()');
      //axios 부분
      var self  = this;
        axios({
        method: 'post',
        url: 'api/analysis/word_cloud_history',
        data:{
          u_num:this.$session.get('session')
        }
      }).then(function (response) {
            self.results = response.data;

            var wordresult = [];
            for(var j=0; j<response.data.length; j++){
              // console.log(self.results[j].content);
              wordresult.push(self.results[j].content);
            }

            //각 품목이름별 갯수
            var result_word = [];
            var result_cnt = [];
            var count = 0;
            for(var k=0; k<response.data.length; k++){
              count = 0;
              for(var y=0; y<response.data.length; y++){
                if(response.data[k].content == response.data[y].content){
                  count++;
                }
              }
              result_word.push([response.data[k].content, count]);
              // console.log('=====%%%%====' + result_word[k]);
              // result_cnt.push(count);
            }

            //중복배열 제거
            var cnt = 0;
            var cnt_result = [];
            var chkflag = false;
            for(var f=0; f<result_word.length; f++){
              chkflag = false;
              if(cnt_result.length == 0){
                cnt_result.push(result_word[f]);
                continue;
              }

              for(var v=0; v<cnt_result.length; v++){
                if(JSON.stringify(result_word[f])==JSON.stringify(cnt_result[v])){
                  // console.log('cnt_result[v] 값 : ' + cnt_result[v]);
                  // console.log('result_word[f] 값 : ' + result_word[f]);
                  chkflag = true;
                }
              }
              if(chkflag == false){
                cnt_result.push(result_word[f]);
              }
            }
            // console.log('cnt_result 값@@@@@ : ' + cnt_result);
            self.showWordCloud(cnt_result);
          })
      }
    }
</script>
