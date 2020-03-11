const option = {
    title: {
        text: '有关xx统计',
        top: 20,
        left: 20,
        textStyle: {
            fontSize: 14,
            fontWeight: 'bold' 
        }
    },
    color: ['#FCD241', '#E84742', '#1B5079', '#2F99D7'],
    backgroundColor: '#f5f5f5',
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        bottom: 0,
        left: 'center',
        bottom: 10,
        textStyle: {
            fontSize: 12
        },
        data: []
    },
    grid: {
        left: 20,
        right: 15,
        bottom: 45,
        containLabel: true
    },
    itemStyle: {
        itemStyle: 'dotted'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value'
    },
    series: []
};

export default option
