
<template>
<div id='myCategoryChart'></div>
</template>

<script>
// 카테고리별 목표금액 그래프
export default {
  data() {
    return {
      myCategoryConfig: {
        type: "hbar",
        backgroundColor: "#FCFCFC",
        tooltip: {
          visible: false
        },
        scaleX: {
          lineColor: "transparent",
          tick: {
            visible: false
          },
          labels: ["미분류", "주거/통신", "패션/미용", "식비", "교통", "생활/쇼핑"],
          item: {
            fontColor: "#000000",
            fontSize: 16
          }
        },
        scaleY: {
          visible: false,
          lineColor: "transparent",
          guide: {
            visible: false
          },
          tick: {
            visible: false
          }
        },
        plotarea: {
          marginLeft: "80",
          marginTop: "30",
          marginBottom: "0"
        },
        plot: {
          stacked: true,
          barsSpaceLeft: "20px",
          barsSpaceRight: "20px",
          valueBox: {
            visible: true,
            text: "%v0%",
            fontColor: "#2A2B3A",
            fontSize: 14
          },
          tooltip: {
            borderWidth: 0,
            borderRadius: 2
          },
          animation: {
            effect: 3,
            sequence: 3,
            method: 3
          }
        },
        series: [{
            values: [3, 2, 6, 7, 4, 2],
            borderRadius: "50px 0px 0px 50px",
            backgroundColor: "#E71D36",
            rules: [{
                rule: "%i === 0",
                backgroundColor: "#E71D36"
              },
              {
                rule: "%i === 1",
                backgroundColor: "#2EC4B6"
              },
              {
                rule: "%i === 2",
                backgroundColor: "#FF9F1C"
              },
              {
                rule: "%i === 3",
                backgroundColor: "#20A665"
              },
              {
                rule: "%i === 4",
                backgroundColor: "#E71D36"
              },
              {
                rule: "%i === 5",
                backgroundColor: "#2EC4B6"
              }

            ]
          },
          {
            values: [7, 8, 4, 3, 6, 8],
            borderRadius: "0px 50px 50px 0px",
            backgroundColor: "#E71D36",
            //alpha : 0.8,
            rules: [{
                rule: "%i === 0",
                backgroundColor: "#e85d6f"
              },
              {
                rule: "%i === 1",
                backgroundColor: "#90eae2"
              },
              {
                rule: "%i === 2",
                backgroundColor: "#f7be70"
              },
              {
                rule: "%i === 3",
                backgroundColor: "#5FAD47"
              },
              {
                rule: "%i === 4",
                backgroundColor: "#e85d6f"
              },
              {
                rule: "%i === 5",
                backgroundColor: "#90eae2"
              }
            ]
          }
        ]
      }
    }
  },

  mounted() {
    zingchart.render({
      id: 'myCategoryChart',
      data: this.myCategoryConfig,
      height: '70%',
      width: '99%'
    });
  },
  created() {
    var self = this;
    // this.u_id = self.result[0];
    // this.u_name = '송영수'
    if (!this.$session.exists()) {
      console.log('********** 세션이 없습니다. **********');
    } else {
      console.log('********** 세션이 있습니다. **********');
      // this.u_num = this.$session.getAll();
      console.log('세션 값 확인 ' + this.$session.get('session'))
    }
    axios({
      method: 'post',
      url: 'api/analysis/cate_used_goal_money',
      data: {
        u_num: this.$session.get('session'),
      }
    }).then(function(response) {
      console.log('********** showUser 응답 받음 **********');
      console.log(response.data);
      self.u_id = response.data[0].u_id
      self.u_name = response.data[0].u_name
      self.u_phone = response.data[0].u_phone
      self.u_email = response.data[0].u_email
      self.u_job = response.data[0].u_job
      self.u_salary = response.data[0].u_salary


      // this.u_id = response.data.u_id;

      // response.data.u_name = this.u_name;
      // setTimeout("window.location.href = './modifyUser'",1000)
    })
  }
}
</script>
