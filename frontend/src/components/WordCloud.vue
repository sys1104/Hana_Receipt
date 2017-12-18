<template>
<!-- 나의 소비 키워드를 알아보는 워드클라우드 -->
<div id="wordcloudlist">
  <div id="wordvalue">
  </div>
</div>
</template>

<!-- Vue Style을 위한 CSS -->
<style>
@font-face {
  font-family: 'overwatch';
  src: url('/fonts/koverwatch.ttf');
}
</style>

<script>
import axios from 'axios'
export default {
  data: function() {
    return {
      results: '',
      results2: [],
      flag: false,
      result3: ''
    }
  },
  components: {},
  methods: {
    //소비내역 키워드를 D3.js를 이용하여 역동적으로 보여주기위한 메소드 실행
    showWordCloud(wordresult) {
      var wResult = [];
      var cResult = [];
      //인자로 받은 중복제거된 배열 respon_result배열에 넣기.
      var respon_result = [];
      respon_result = wordresult;

      // 품목이름과 개수 각각의 배열(wResult, cResult)로 구별
      for (var m = 0; m < respon_result.length; m++) {
        for (var n = 0; n < 2; n++) {
          if (n == 0) {
            wResult.push(respon_result[m][0]);
          } else if (n == 1) {
            cResult.push(respon_result[m][1]);
          }
        }
      }

      let index = 0;
      let index2 = 0;
      //index를 인자로 각 키워드의 개수에 따라 폰트 크기 설정을 위한 메소드
      function showRandom(index) {
        return cResult[index];
      }

      //워드클라우드 디자인 및 사용
      var width = 1000,
          height = 600;
      var fill = function(i) {
        return d3.schemeCategory20b[i];
      };
      var svg = d3.select("#wordvalue").append("svg")
        .attr("width", width)
        .attr("height", height);
      d3.csv(wResult, function(data) {
        showCloud(data)
        setInterval(function() {
          //setInterval --> 인덱스 초기화
          index = 0;
          index2 = 0;
          //소비 키워드 데이터를 인자로 역동적으로 보이게하는 메소드 실행
          showCloud(data)
        }, 3000)
      });

      var svg = d3.select("svg")
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

      //소비 키워드 데이터를 인자로 역동적으로 보이게하는 메소드 실행
      function showCloud(data) {
        d3.layout.cloud().size([width, height])
          //클라우드 레이아웃에 데이터 전달
          .words(wResult.map(function(d) {
            return {
              text: d,
              size: setTimeout(showRandom(index++), 0) * 2,
              test: "haha"
            };
          }))
          // function() { return ~~(Math.random() * 2) * 90; }
          .rotate(0)
          .font("Impact")
          //빈도수에 따라 각 단어의 크기를 설정
          .fontSize(function(d) {
            return showRandom(index2++) * 20;
          })
          //클라우드 레이아웃을 초기화 > end이벤트 발생 > 연결된 함수 작동
          .on("end", draw)
          .start();

        //draw 메소드 실행
        function draw(words) {
          var cloud = svg.selectAll("text").data(words)
          //Entering words
          cloud.enter()
            .append("text")
            .style("font-family", "overwatch")
            .style("fill", function(d, i) {
              return fill(i);
            })
            .style("fill-opacity", .5)
            .attr("text-anchor", "middle")
            .attr('font-size', function(d) {
              return d.size + "px";
            })
            .text(function(d) {
              return d.text;
            });
          cloud
            .transition()
            .duration(600)
            .style("font-size", function(d) {
              return d.size + "px";
            })
            .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("fill-opacity", 1);
        }
      }
    }
  },
  created() {
    console.log('WordCloud created()');
    var self = this;
    //DB 조회 후 소비내역 품목이름 response받기. (기간 : 현재 날짜로 부터 한달전)
    axios({
      method: 'post',
      url: 'api/analysis/word_cloud_history',
      data: {
        u_num: this.$session.get('session')
      }
    }).then(function(response) {
      self.results = response.data;

      //response받은 품목이름과 개수 배열로 저장
      var result_word = [];
      var count = 0;
      for (var k = 0; k < response.data.length; k++) {
        count = 0;
        for (var y = 0; y < response.data.length; y++) {
          if (response.data[k].content == response.data[y].content) {
            count++;
          }
        }
        result_word.push([response.data[k].content, count]);
      }

      //중복배열 제거
      var cnt = 0;
      var word_result = [];
      var chkflag = false;
      //이중 for문을 이용하여 중복된 배열 제거
      for (var f = 0; f < result_word.length; f++) {
        chkflag = false;
        if (word_result.length == 0) {
          word_result.push(result_word[f]);
          continue;
        }

        for (var v = 0; v < word_result.length; v++) {
          if (JSON.stringify(result_word[f]) == JSON.stringify(word_result[v])) {
            chkflag = true;
          }
        }
        if (chkflag == false) {
          //중복 제거 후 word_result 배열에 값 저장
          word_result.push(result_word[f]);
        }
      }

      //소비내역 키워드를 D3.js를 이용하여 역동적으로 보여주기위한 메소드 실행 (인자로 중복제거된 배열 넣기)
      self.showWordCloud(word_result);
    })

  }
}
</script>
