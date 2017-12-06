
<template>
    <div id='myCategoryChart'></div>
</template>

<script>
// 카테고리별 목표금액 그래프
    export default {
        data(){
            return{
                myCategoryConfig: {
                    type: "hbar",
                    backgroundColor: "#FCFCFC",
                    tooltip: { visible: false },
                    scaleX: {
                        lineColor: "transparent",
                        tick: {
                            visible: false
                        },
                        labels: ["음료", "식비", "교통", "통신"],
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
                            values: [3, 2, 6, 7],
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
                                }

                            ]
                        },
                        {
                            values: [7, 8, 4, 3],
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
                                }
                            ]
                        }
                    ]
                }
            }
        },

        mounted(){
            zingchart.render({
                id: 'myCategoryChart',
                data: this.myCategoryConfig,
                height: '70%',
                width: '99%'
            });
        }
    }
</script>