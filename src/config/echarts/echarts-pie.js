const option = {
    title: {
        text: '有关xx统计',
        subtext: '',
        top: 20,
        left: 20,
        textStyle: {
            fontSize: 14,
            fontWeight: 'bold' 
        }
    },
    color: ['#FCD241', '#E84742', '#1B5079', '#2F99D7'],
    backgroundColor: '#f5f5f5',
    grid: {
        top: 30,
    },

    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        top: 60,
        left: 20,
        orient: 'vertical',
        textStyle: {
            fontSize: 12
        },
        data: []
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '52%',
            center: ['65%', '50%'],
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

export default option
