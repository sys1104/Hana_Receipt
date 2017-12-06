
<template>
    <div id='percentageChart'></div>
</template>

<script>
// 나와 이용자 평균 percentage
    export default {
        data(){
            return{
                percentageConfig: {
    "layout":"h",
     "globals":{
        "font-family":"Roboto"
    },
    "graphset":[
        // 첫번째 파이
        {
            "type":"pie",
            "background-color":"none",
            "legend":{
                "background-color":"none",
                "border-width":0,
                "shadow":false,
                "layout":"float",
                "margin":"auto auto 8% auto",
                "marker":{
                    "border-radius":3,
                    "border-width":0
                },
                "item":{
                    "color":"%backgroundcolor"
                }
            },
            // "title":{
            //     // "text":"카테고리별 나의 소비량",
            //     "background-color":"none",
            //     "font-size":16,
            //     "color":"",
            //     "x":-20,
            //     "y":80
            // },
            "plotarea":{
                "background-color":"none",
                "border-color":"none",
                "border-width":1,
                "border-radius":3,
                "margin":"15% 5%"
            },
            "labels":[
                {
                    "x":"45%",
                    "y":"47%",
                    "width":"10%",
                    "text":"나의 평균 소비",
                    "font-size":18
                }    
            ],
            "plot":{
                "size":100,
                "slice":70,
                "margin-right":100,
                "border-width":0,
                "shadow":0,
                "value-box":{
                    "visible":false
                },
                "tooltip":{
                    "text":"%v원",
                    "shadow":false,
                    "border-radius":3
                }
            },
            "series":[
                {
                    "values":[136],
                    "text":"식비",
                    "background-color":"#E85D6F"
                },
                {
                    "values":[118],
                    "text":"교통",
                    "background-color":"#F7BE70"
                },
                {
                    "values":[108],
                    "text":"통신",
                    "background-color":"#90EAE2"
                }
            ]
        },
        // 두번째 파이
        {
            "type":"pie",
            "background-color":"none",
            "legend":{
                "background-color":"none",
                "border-width":0,
                "shadow":false,
                "layout":"float",
                "margin":"auto auto 8% auto",
                "marker":{
                    "border-radius":3,
                    "border-width":0
                },
                "item":{
                    "color":"%backgroundcolor"
                }
            },
            "title":{
                // "text":"카테고리별 평균 소비량",
                "background-color":"none",
                "color":"#626262",
                "font-size":16,
                "x":-52,
                "y":80
            },
            "plotarea":{
                "background-color":"none",
                "border-color":"none",
                "border-width":1,
                "border-radius":3,
                "margin":"10% 5%"
            },
            "labels":[
                {
                    "x":"45%",
                    "y":"47%",
                    "width":"10%",
                    "text":"이용자 평균 소비",
                    "font-size":18
                }    
            ],
            "plot":{
                "size":100,
                "slice":70,
                "border-width":0,
                "shadow":0,
                "value-box":{
                    "visible":false
                },
                // 마우스 올릴 때
                 "tooltip":{
                    "text":"%v원",
                    "shadow":false,
                    "border-radius":3
                }
            },
            "series":[
                {
                    "values":[2.33],
                    "text":"식비",
                    "background-color":"#E85D6F"
                },
                {
                    "values":[2.02],
                    "text":"교통",
                    "background-color":"#F7BE70"
                },
                {
                    "values":[1.85],
                    "text":"통신",
                    "background-color":"#90EAE2"
                }
            ]
        }
    ]}
            }
        },

        mounted(){
            zingchart.render({ 
            id : 'percentageChart', 
            data : this.percentageConfig, 
            height: '75%', 
            width: '99%'
        });
    }
}
</script>