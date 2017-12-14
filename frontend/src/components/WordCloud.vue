<template>
<div id="wordcloudlist" class="table-users container" style="width:100%">
  <h2>----------------------------------------------</h2>
  <h2>워드클라우드</h2>
  <div id="wordvalue">

  </div>
</div>
</template>

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
          var fill = function(i){ return d3.schemeCategory20b[i];};
          var layout = d3.layout.cloud()
              .size([700, 500])
              .words(wordresult.map(function(d) {
                  return {text: d, size: 10 + Math.random() * 200, test: "haha"};
                }))
                .padding(5)
                .rotate(function() { return ~~(Math.random() * 2) * 90; })
                .font("Impact")
                .fontSize(function(d) { return d.size; })
                .on("end", draw);

                layout.start();

                function draw(words) {
                  d3.select("#wordvalue").append("svg")
                  .attr("width", layout.size()[0])
                  .attr("height", layout.size()[1])
                  .append("g")
                  .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                  .selectAll("text")
                  .data(words)
                  .enter().append("text")
                  .style("font-size", function(d) { return d.size + "px"; })
                  .style("font-family", "Impact")
                  .style("fill", function(d, i) { return fill(i); })
                  .attr("text-anchor", "middle")
                  .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                  })
                  .text(function(d) { return d.text; });
                }
        }
    },
    mounted(){
      console.log('WordCloud Mounted()');
      //d3 워드크라우드 자바스크립트 코드



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
              console.log(self.results[j].content);
              wordresult.push(self.results[j].content);
            }

            self.showWordCloud(wordresult);
          })
      }
    }
</script>
