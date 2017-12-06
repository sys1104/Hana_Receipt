
<template>
    <div id='myTotalChart'></div>
</template>

<script>
// 나의 목표 금액 그래프
    export default {
        data(){
            return{
        mytotalconfig : {
  graphset:[

    {
      type:"bar",
      x: 55,
     	y: 40,
     	height: "100%",
     	width: "100%",
     	title:{
     	  text: "나의 목표",
     	  y: "80%",
     	  fontColor:"#515151",
     	  bold: true
     	},
   	  // subtitle:{
     	//   text: "%",
     	//   y: "76%",
     	//   fontSize: 15,
     	//   bold: false
     	// },
     	scaleY:{
     	  lineColor: "none",
     	  values: "0:100:10",
     	  guide:{
     	    visible: true
     	  },
     	  tick:{
     	    margin: 3,
          lineWidth: 4,
          size: 15,
          lineColor: "#5F5F5F",
          placement: "outter",
          rules:[
            {
              rule: "%i % 2 == 1",
              lineWidth: 2
            }
          ]
        },
        minorTicks: 4,
        minorTick: {
          lineColor: "#C1C1C1",
          placement: "inner",
          size: 7
        },
        item:{
          fontSize: 16,
          rules:[
            {
              rule: "%i % 2 == 1",
              visible: false
            }
           ]
        }
     	},
     	"scale-y-2":{
     	  values: "0:100:10",
     	  lineColor: "none",
     	  item:{
     	    visible: false
     	  },
     	  guide:{
     	    visible: false
     	  },
     	  tick:{
     	    placement: "inner",
     	    size: 40,
     	    padding: 0,
     	    margin: 0,
     	    offsetX: 50,
     	    lineColor: "#fff",
     	    rules:[
     	      {
     	        rule: "%i == 0 || %i == 10",
     	        visible: false
     	      }
     	    ]
     	  }
     	},
     	plot:{
     	  barsOverlap: "100%",
     	  borderRadius: 2,
     	  hoverState: {
     	    visible: false
     	  },
     	  tooltip:{
    		  visible: false
    		}
     	},
     	plotarea:{
     	  marginBottom: "30%",
     	  marginTop: "0%",
     	  _marginRight: "0%"
     	},
     	scaleX:{
     	  visible: false
     	},
      series:[
        {
          values: [100],
          backgroundColor: "#fff",
          borderWidth: 4,
          borderColor: "#C1C1C1",
          maxTrackers: 0,
          barWidth: "100%",
          tooltip:{
            visble: false
          }
        },
        {
          values: [80],
          backgroundColor: "#F8B237",
          barWidth: "93%",
          maxTrackers: 0,
          tooltip:{
            visble: false
          },
          valueBox:{
            text: "%v",
    			  placement: "bottom-out",
    			  offsetY: 0,
    			  fontSize: 28,
    			  fontColor: "#515151",
          }
        }
      ]
    }
  ]
}
  }
    },

        mounted(){
            zingchart.render({ 
            id : 'myTotalChart', 
            data : this.mytotalconfig, 
            height: '80%', 
            width: '80%' 
        });
        }
    }
    //   // 게이지
    // {
    //  	type: "gauge",
    //  	x: 0,
    //  	y: 0,
    //  	height: "100%",
    //  	width: "70%",
    //  	title:{
    //  	  text: "나의 목표 게이지",
    //  	  y: "80%",
    //  	  fontColor:"#515151",
    //  	  bold: true
    //  	},
    //  	subtitle:{
    //  	  text: "rpm",
    //  	  y: "59%",
    //  	  fontSize: 15,
    //  	  bold: false
    //  	},
    //  	scaleR:{
    //  	 values: "0:10:1",
    //  	  aperture: 320,
    //  	  tick:{
    //  	    visible: false
    //  	  },
    //  	  item:{
    //  	    visible: false
    //  	  },
    //  	  ring:{
    //  	    backgroundColor: "#C1C1C1",
    //  	    size: 20
    //  	  },
    //  	  center:{
    //  	    visible: false
    //  	  }
    //  	},
    //  	scale:{
    //  	  sizeFactor: 0.9
    //  	},
    //  	"scale-r-2":{
    //  	  values: "0:100:10",
    //  	  aperture: 290,
    //     tick:{
    //       lineWidth: 4,
    //       size: 15,
    //       lineColor: "#5F5F5F",
    //       placement: "outter"
    //     },
    //     minorTicks: 4,
    //     minorTick: {
    //       lineColor: "#C1C1C1",
    //       placement: "inner",
    //       size: 7
    //     },
    //     ring:{
    //       visible: false
    //     },
    //     item:{
    //       offsetR: -1,
    //       fontSize: 16
    //     },
    //     center:{
    //  	    size: 14,
    //  	    backgroundColor:"#BEBEBE",
    //  	    borderWidth: 1,
    //  	    borderColor: "#5F5F5F"
    //  	  },
    //  	  label:{
    //  	    text: "text"
    //  	  }
    //  	},
    //  	"scale-2":{
    //  	  sizeFactor: 0.55
    //  	},
    //  	plot:{
    //  	  size: "56%",
    // 		csize: "14%",
    // 		tooltip:{
    // 		  visible: false
    // 		}
    //  	},
    //  	plotarea:{
    //  	  marginBottom: "20%"
    //  	},
    // 	series : [
    // 		{
    // 			values : [50],
    // 			backgroundColor: "#F8B237",
    // 			valueBox:{
    // 			  text: "%v",
    // 			  placement: "center",
    // 			  offsetY: 40,
    // 			  fontSize: 28,
    // 			  fontColor: "#515151",
    // 			}
    			
    // 		}
    // 	]
    // },
    // 바
</script>
