
$(document).ready(function ()
{
    var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var config = {
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "New Students",
                backgroundColor: window.chartColors.red,
                borderColor: window.chartColors.red,
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                fill: false,
            }, {
                label: "Old Students",
                fill: false,
                backgroundColor: window.chartColors.blue,
                borderColor: window.chartColors.blue,
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Chart Survey'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Students'
                    }
                }]
            }
        }
    };
    var ctx = document.getElementById("chartjs_line").getContext("2d");
    window.myLine = new Chart(ctx, config);
});


$(document).ready(function ()
{
    var randomScalingFactor = function ()
    {
        return Math.round(Math.random() * 100);
    };

    var config = {
        type: 'pie',
        data: {
            datasets: [{
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                ],
                backgroundColor: [
                    window.chartColors.red,
                    window.chartColors.orange,
                    window.chartColors.yellow,
                    window.chartColors.green,
                    window.chartColors.blue,
                ],
                label: 'Dataset 1'
            }],
            labels: [
                "Red",
                "Orange",
                "Yellow",
                "Green",
                "Blue"
            ]
        },
        options: {
            responsive: true
        }
    };

    var ctx = document.getElementById("chartjs_pie").getContext("2d");
    window.myPie = new Chart(ctx, config);
});

function separarMilhar(value, escala)
{
    var milhar = "";
    var novoValue = "";

    switch (escala) {
        case 1000: milhar = " mil"; break;
        case 1000000: milhar = " M"; break;
        case 1000000000: milhar = " B"; break;
        case 1000000000000: milhar = " T"; break;
    }

    novoValue = value / escala;

    //if (cont <= 3) {
    //    novoValue = valueStr;
    //}
    //else if (cont >= 4 && cont <= 6) {
    //    milhar = "mil";
    //    novoValue = value / 1000;
    //}
    //else if (cont > 6 && cont <= 9) {
    //    milhar = "mi";
    //    novoValue = value / 1000000;
    //}
    //else if (cont > 9 && cont <= 12) {
    //    milhar = "bi";
    //    novoValue = value / 1000000000;
    //}
    //else if (cont > 12 && cont <= 15) {
    //    milhar = "tri";
    //    novoValue = value / 1000000000000;
    //}

    return accounting.formatMoney(novoValue, "", 1, ".", ",") + milhar;
}

$(document).ready(function ()
{
    var MONTHS = ["2015", "2016", "2017", "2018"];
    var color = Chart.helpers.color;
    var barChartData = {
        labels: ["2015", "2016", "2017", "2018"],

        datasets: [
            {
                label: 'Reticulado',
                borderColor: window.chartColors.yellow,
                backgroundColor: color(window.chartColors.yellow).alpha(0).rgbString(),
                borderWidth: 3,
                borderDash: [5, 5],
                data: [
                    15027279,
                    18579345,
                    18579345,
                    18582341
                ],
                type: 'line'
            },
            {
                label: 'Crescimento',
                borderColor: window.chartColors.blue,
                backgroundColor: color(window.chartColors.blue).alpha(0).rgbString(),
                borderWidth: 3,
                data: [
                    0,
                    2029853,
                    4581919,
                    5002996
                ],
                type: 'line'
            },
            {
                label: 'Volume',
                backgroundColor: color(window.chartColors.orange).alpha(1).rgbString(),
                borderColor: window.chartColors.orange,
                borderWidth: 1,
                data: [
                    12027279,
                    9997426,
                    14579345,
                    15582341
                ]
            }]
    };

    var arrQtd = ["2015|0%", "2016|10%", "2017|30%", "2018|36%"];

    var ctx = document.getElementById("chartjs_bar").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values)
                        {
                            return separarMilhar(value, 1000000);
                            //return accounting.formatMoney(Math.round(value * 100) / 100, "", 0, ".", ",");
                        }
                    }
                }]
            },
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: false,
                text: '123'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data)
                    {

                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        if (label != "Crescimento") {
                            if (label) {
                                label += ': ';
                            }
                            label += accounting.formatMoney(Math.round(tooltipItem.yLabel * 100) / 100, "", 0, ".", ",");
                        }
                        else {
                            var ano = tooltipItem.xLabel;
                            var porcent = "0%";
                            for (var i = 0; i < arrQtd.length; i++) {
                                var anoPorcent = arrQtd[i].split("|");
                                if (anoPorcent[0] == ano) {
                                    porcent = anoPorcent[1];
                                    break;
                                }
                            }
                            label += ": " + porcent;
                        }
                        return label;
                    }
                }
            }
        }
    });


    var barChartData2 = {
        labels: ["2015", "2016", "2017", "2018"],
        datasets: [
            {
                label: 'Reticulado',
                borderColor: window.chartColors.yellow,
                backgroundColor: color(window.chartColors.yellow).alpha(0).rgbString(),
                borderWidth: 3,
                borderDash: [5, 5],
                data: [
                    1634300728.24,
                    1833239604.05,
                    2803249229.91,
                    2907637626.99
                ],
                type: 'line'
            },
            {
                label: 'Crescimento',
                borderColor: window.chartColors.blue,
                backgroundColor: color(5, 228, 3).alpha(0).rgbString(),
                borderWidth: 3,
                data: [
                    0,
                    98938875.81,
                    870009625.86,
                    1174398022.08
                ],
                type: 'line'
            },
            {
                label: 'Volume',
                backgroundColor: '#42e800',
                borderColor: '#42e800',
                borderWidth: 1,
                data: [
                    1534300728.24,
                    1633239604.05,
                    2503249229.91,
                    2807637626.99
                ]
            }]

    };

    var arrVlr = ["2015|0%", "2016|6%", "2017|53%", "2018|65%"];

    var ctx = document.getElementById("chartjs_bar4").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData2,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values)
                        {
                            return separarMilhar(value, 1000000000);
                            //return accounting.formatMoney(Math.round(value * 100) / 100, "", 0, ".", ",");
                        }
                    }
                }]
            },
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: false,
                text: ''
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data)
                    {

                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        if (label != "Crescimento") {
                            if (label) {
                                label += ': ';
                            }
                            label += accounting.formatMoney(Math.round(tooltipItem.yLabel * 100) / 100, "R$", 0, ".", ",");
                        }
                        else {
                            var ano = tooltipItem.xLabel;
                            var porcent = "0%";
                            for (var i = 0; i < arrVlr.length; i++) {
                                var anoPorcent = arrVlr[i].split("|");
                                if (anoPorcent[0] == ano) {
                                    porcent = anoPorcent[1];
                                    break;
                                }
                            }
                            label += ": " + porcent;
                        }
                        return label;
                    }
                }
            }
        }
    });

    var barChartData3 = {
        labels: ["2015", "2016", "2017", "2018"],

        datasets: [
            {
                label: 'Reticulado',
                borderColor: window.chartColors.yellow,
                backgroundColor: color(window.chartColors.yellow).alpha(0).rgbString(),
                borderWidth: 3,
                borderDash: [5, 5],
                data: [
                    606711,
                    804067,
                    1187587,
                    1719872
                ],
                type: 'line'
            },
            {
                label: 'Crescimento',
                borderColor: window.chartColors.blue,
                backgroundColor: color(window.chartColors.blue).alpha(0).rgbString(),
                borderWidth: 3,
                data: [
                    0,
                    197356,
                    303520,
                    432285
                ],
                type: 'line'
            },
            {
                label: 'Volume',
                backgroundColor: color(window.chartColors.orange).alpha(1).rgbString(),
                borderColor: window.chartColors.orange,
                borderWidth: 1,
                data: [
                    586711,
                    784067,
                    1087587,
                    1519872
                ]
            }]
    };

    var arrQtdCli = ["2015|0%", "2016|33,63%", "2017|38,71%", "2018|39,74%"];

    var ctx = document.getElementById("chartjs_bar2").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData3,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values)
                        {
                            return separarMilhar(value, 1000000);
                            //return accounting.formatMoney(Math.round(value * 100) / 100, "", 0, ".", ",");
                        }
                    }
                }]
            },
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: false,
                text: ''
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data)
                    {

                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        if (label != "Crescimento") {
                            if (label) {
                                label += ': ';
                            }
                            label += accounting.formatMoney(Math.round(tooltipItem.yLabel * 100) / 100, "", 0, ".", ",");
                        }
                        else {
                            var ano = tooltipItem.xLabel;
                            var porcent = "0%";
                            for (var i = 0; i < arrQtdCli.length; i++) {
                                var anoPorcent = arrQtdCli[i].split("|");
                                if (anoPorcent[0] == ano) {
                                    porcent = anoPorcent[1];
                                    break;
                                }
                            }
                            label += ": " + porcent;
                        }
                        return label;
                    }
                }
            }
        }
    });


    var barChartData4 = {
        labels: ["2015", "2016", "2017", "2018"],
        datasets: [
            {
                label: 'Reticulado',
                borderColor: window.chartColors.yellow,
                backgroundColor: color(window.chartColors.yellow).alpha(0).rgbString(),
                borderWidth: 3,
                borderDash: [5, 5],
                data: [
                    60321670.07,
                    95141618.03,
                    152804396.16,
                    191344158.81
                ],
                type: 'line'
            },
            {
            label: 'Crescimento',
            borderColor: window.chartColors.blue,
            backgroundColor: color(5, 228, 3).alpha(0).rgbString(),
            borderWidth: 3,
            data: [
                0,
                33819947.93,
                33662778.13,
                58539762.65
            ],
            type: 'line'
        },
        {
            label: 'Volume',
            backgroundColor: '#42e800',
            borderColor: '#42e800',
            borderWidth: 1,
            data: [
                55321670.07,
                89141618.03,
                122804396.16,
                181344158.81
            ]
        }]
    };

    var arrVlrCli = ["2015|0%", "2016|61,13%", "2017|97,76%", "2018|137,66%"];

    var ctx = document.getElementById("chartjs_bar3").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData4,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values)
                        {
                            return separarMilhar(value, 1000000);
                            //return accounting.formatMoney(Math.round(value * 100) / 100, "", 0, ".", ",");
                        }
                    }
                }]
            },
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: false,
                text: ''
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data)
                    {

                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        if (label != "Crescimento") {
                            if (label) {
                                label += ': ';
                            }
                            label += accounting.formatMoney(Math.round(tooltipItem.yLabel * 100) / 100, "", 0, ".", ",");
                        }
                        else {
                            var ano = tooltipItem.xLabel;
                            var porcent = "0%";
                            for (var i = 0; i < arrVlrCli.length; i++) {
                                var anoPorcent = arrVlrCli[i].split("|");
                                if (anoPorcent[0] == ano) {
                                    porcent = anoPorcent[1];
                                    break;
                                }
                            }
                            label += ": " + porcent;
                        }
                        return label;
                    }
                }
            }
        }
    });

    var barChartData5 = {
        labels: ["2015", "2016", "2017", "2018"],

        datasets: [
            {
                label: 'Reticulado',
                backgroundColor: color(window.chartColors.yellow).alpha(0).rgbString(),
                borderColor: window.chartColors.blue,
                borderWidth: 3,
                borderDash: [5, 5],
                data: [
                    1729383,
                    1593450,
                    2481979,
                    2303552
                ],
                type: 'line'
            },
            {
                label: 'Havan',
                backgroundColor: color(window.chartColors.orange).alpha(1).rgbString(),
                borderColor: window.chartColors.orange,
                borderWidth: 1,
                data: [
                    86448,
                    87145,
                    118113,
                    204068
                ]
            }
            ,
            {
                label: 'Empresa',
                backgroundColor: color(window.chartColors.yellow).alpha(1).rgbString(),
                borderColor: window.chartColors.yellow,
                borderWidth: 1,
                data: [
                    1429383,
                    1393450,
                    2081979,
                    2003552
                ]
            }]
    };

    var arrQtdCliPro = ["2015|0%", "2016|0,80%", "2017|35,53%", "2018|72,77%"];

    var ctx = document.getElementById("chartjs_bar5").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData5,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values)
                        {
                            return separarMilhar(value, 1000000);
                            //return accounting.formatMoney(Math.round(value * 100) / 100, "", 0, ".", ",");
                        }
                    }
                }]
            },
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: false,
                text: ''
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data)
                    {

                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        if (label != "Crescimento") {
                            if (label) {
                                label += ': ';
                            }
                            label += accounting.formatMoney(Math.round(tooltipItem.yLabel * 100) / 100, "", 0, ".", ",");
                        }
                        else {
                            var ano = tooltipItem.xLabel;
                            var porcent = "0%";
                            for (var i = 0; i < arrQtdCliPro.length; i++) {
                                var anoPorcent = arrQtdCliPro[i].split("|");
                                if (anoPorcent[0] == ano) {
                                    porcent = anoPorcent[1];
                                    break;
                                }
                            }
                            label += ": " + porcent;
                        }
                        return label;
                    }
                }
            }
        }
    });

    var ctx = document.getElementById("chartjs_bar7").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData5,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values)
                        {
                            return separarMilhar(value, 1000000);
                            //return accounting.formatMoney(Math.round(value * 100) / 100, "", 0, ".", ",");
                        }
                    }
                }]
            },
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: false,
                text: ''
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data)
                    {

                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        if (label != "Crescimento") {
                            if (label) {
                                label += ': ';
                            }
                            label += accounting.formatMoney(Math.round(tooltipItem.yLabel * 100) / 100, "", 0, ".", ",");
                        }
                        else {
                            var ano = tooltipItem.xLabel;
                            var porcent = "0%";
                            for (var i = 0; i < arrQtdCliPro.length; i++) {
                                var anoPorcent = arrQtdCliPro[i].split("|");
                                if (anoPorcent[0] == ano) {
                                    porcent = anoPorcent[1];
                                    break;
                                }
                            }
                            label += ": " + porcent;
                        }
                        return label;
                    }
                }
            }
        }
    });





    var ctx = document.getElementById("chartjs_bar1234").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData5,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values)
                        {
                            return separarMilhar(value, 1000000);
                            //return accounting.formatMoney(Math.round(value * 100) / 100, "", 0, ".", ",");
                        }
                    }
                }]
            },
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: false,
                text: ''
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data)
                    {

                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        if (label != "Crescimento") {
                            if (label) {
                                label += ': ';
                            }
                            label += accounting.formatMoney(Math.round(tooltipItem.yLabel * 100) / 100, "", 0, ".", ",");
                        }
                        else {
                            var ano = tooltipItem.xLabel;
                            var porcent = "0%";
                            for (var i = 0; i < arrVlrCliPro.length; i++) {
                                var anoPorcent = arrVlrCliPro[i].split("|");
                                if (anoPorcent[0] == ano) {
                                    porcent = anoPorcent[1];
                                    break;
                                }
                            }
                            label += ": " + porcent;
                        }
                        return label;
                    }
                }
            }
        }
    });



    var ctx = document.getElementById("chartjs_bar12345").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData5,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values)
                        {
                            return separarMilhar(value, 1000000);
                            //return accounting.formatMoney(Math.round(value * 100) / 100, "", 0, ".", ",");
                        }
                    }
                }]
            },
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: false,
                text: ''
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data)
                    {

                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        if (label != "Crescimento") {
                            if (label) {
                                label += ': ';
                            }
                            label += accounting.formatMoney(Math.round(tooltipItem.yLabel * 100) / 100, "", 0, ".", ",");
                        }
                        else {
                            var ano = tooltipItem.xLabel;
                            var porcent = "0%";
                            for (var i = 0; i < arrVlrCliPro.length; i++) {
                                var anoPorcent = arrVlrCliPro[i].split("|");
                                if (anoPorcent[0] == ano) {
                                    porcent = anoPorcent[1];
                                    break;
                                }
                            }
                            label += ": " + porcent;
                        }
                        return label;
                    }
                }
            }
        }
    });

    var ctx = document.getElementById("chartjs_bar123456").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData5,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values)
                        {
                            return separarMilhar(value, 1000000);
                            //return accounting.formatMoney(Math.round(value * 100) / 100, "", 0, ".", ",");
                        }
                    }
                }]
            },
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: false,
                text: ''
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data)
                    {

                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        if (label != "Crescimento") {
                            if (label) {
                                label += ': ';
                            }
                            label += accounting.formatMoney(Math.round(tooltipItem.yLabel * 100) / 100, "", 0, ".", ",");
                        }
                        else {
                            var ano = tooltipItem.xLabel;
                            var porcent = "0%";
                            for (var i = 0; i < arrVlrCliPro.length; i++) {
                                var anoPorcent = arrVlrCliPro[i].split("|");
                                if (anoPorcent[0] == ano) {
                                    porcent = anoPorcent[1];
                                    break;
                                }
                            }
                            label += ": " + porcent;
                        }
                        return label;
                    }
                }
            }
        }
    });

    var barChartData6 = {
        labels: ["2015", "2016", "2017", "2018"],
        datasets: [
            {
                label: 'Reticulado',
                backgroundColor: color(window.chartColors.yellow).alpha(0).rgbString(),
                borderColor: window.chartColors.yellow,
                borderWidth: 3,
                borderDash: [5, 5],
                data: [
                    90482291.15,
                    132031037.02,
                    172669283.14,
                    168461842.01
                ],
                type: 'line'
            },
            {
                label: 'Havan',
                backgroundColor: '#42e800',
                borderColor: '#42e800',
                borderWidth: 1,
                data: [
                    6510341.05,
                    8162617.85,
                    9127419.24,
                    15158664.62
                ]
            },
            {
                label: 'Empresa',
                backgroundColor: '#2f64ff',
                borderColor: '#2f64ff',
                borderWidth: 1,
                data: [
                    88482291.15,
                    112031037.02,
                    162669283.14,
                    158461842.01
                ]
            }]
    };

    var arrVlrCliPro = ["2015|0%", "2016|25,37%", "2017|11,81%", "2018|66,07%"];

    var ctx = document.getElementById("chartjs_bar6").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData6,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values)
                        {
                            return separarMilhar(value, 1000000);
                            //return accounting.formatMoney(Math.round(value * 100) / 100, "", 0, ".", ",");
                        }
                    }
                }]
            },
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: false,
                text: ''
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data)
                    {

                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        if (label != "Crescimento") {
                            if (label) {
                                label += ': ';
                            }
                            label += accounting.formatMoney(Math.round(tooltipItem.yLabel * 100) / 100, "", 0, ".", ",");
                        }
                        else {
                            var ano = tooltipItem.xLabel;
                            var porcent = "0%";
                            for (var i = 0; i < arrVlrCliPro.length; i++) {
                                var anoPorcent = arrVlrCliPro[i].split("|");
                                if (anoPorcent[0] == ano) {
                                    porcent = anoPorcent[1];
                                    break;
                                }
                            }
                            label += ": " + porcent;
                        }
                        return label;
                    }
                }
            }
        }
    });

    var ctx = document.getElementById("chartjs_bar8").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData6,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values)
                        {
                            return separarMilhar(value, 1000000);
                            //return accounting.formatMoney(Math.round(value * 100) / 100, "", 0, ".", ",");
                        }
                    }
                }]
            },
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: false,
                text: ''
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data)
                    {

                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        if (label != "Crescimento") {
                            if (label) {
                                label += ': ';
                            }
                            label += accounting.formatMoney(Math.round(tooltipItem.yLabel * 100) / 100, "", 0, ".", ",");
                        }
                        else {
                            var ano = tooltipItem.xLabel;
                            var porcent = "0%";
                            for (var i = 0; i < arrVlrCliPro.length; i++) {
                                var anoPorcent = arrVlrCliPro[i].split("|");
                                if (anoPorcent[0] == ano) {
                                    porcent = anoPorcent[1];
                                    break;
                                }
                            }
                            label += ": " + porcent;
                        }
                        return label;
                    }
                }
            }
        }
    });

    var ctx = document.getElementById("chartjs_bar1231").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData6,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values)
                        {
                            return separarMilhar(value, 1000000);
                            //return accounting.formatMoney(Math.round(value * 100) / 100, "", 0, ".", ",");
                        }
                    }
                }]
            },
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: false,
                text: ''
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data)
                    {

                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        if (label != "Crescimento") {
                            if (label) {
                                label += ': ';
                            }
                            label += accounting.formatMoney(Math.round(tooltipItem.yLabel * 100) / 100, "", 0, ".", ",");
                        }
                        else {
                            var ano = tooltipItem.xLabel;
                            var porcent = "0%";
                            for (var i = 0; i < arrVlrCliPro.length; i++) {
                                var anoPorcent = arrVlrCliPro[i].split("|");
                                if (anoPorcent[0] == ano) {
                                    porcent = anoPorcent[1];
                                    break;
                                }
                            }
                            label += ": " + porcent;
                        }
                        return label;
                    }
                }
            }
        }
    });

    var ctx = document.getElementById("chartjs_bar12341").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData6,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values)
                        {
                            return separarMilhar(value, 1000000);
                            //return accounting.formatMoney(Math.round(value * 100) / 100, "", 0, ".", ",");
                        }
                    }
                }]
            },
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: false,
                text: ''
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data)
                    {

                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        if (label != "Crescimento") {
                            if (label) {
                                label += ': ';
                            }
                            label += accounting.formatMoney(Math.round(tooltipItem.yLabel * 100) / 100, "", 0, ".", ",");
                        }
                        else {
                            var ano = tooltipItem.xLabel;
                            var porcent = "0%";
                            for (var i = 0; i < arrVlrCliPro.length; i++) {
                                var anoPorcent = arrVlrCliPro[i].split("|");
                                if (anoPorcent[0] == ano) {
                                    porcent = anoPorcent[1];
                                    break;
                                }
                            }
                            label += ": " + porcent;
                        }
                        return label;
                    }
                }
            }
        }
    });

    var ctx = document.getElementById("chartjs_bar123451").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData6,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values)
                        {
                            return separarMilhar(value, 1000000);
                            //return accounting.formatMoney(Math.round(value * 100) / 100, "", 0, ".", ",");
                        }
                    }
                }]
            },
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: false,
                text: ''
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data)
                    {

                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        if (label != "Crescimento") {
                            if (label) {
                                label += ': ';
                            }
                            label += accounting.formatMoney(Math.round(tooltipItem.yLabel * 100) / 100, "", 0, ".", ",");
                        }
                        else {
                            var ano = tooltipItem.xLabel;
                            var porcent = "0%";
                            for (var i = 0; i < arrVlrCliPro.length; i++) {
                                var anoPorcent = arrVlrCliPro[i].split("|");
                                if (anoPorcent[0] == ano) {
                                    porcent = anoPorcent[1];
                                    break;
                                }
                            }
                            label += ": " + porcent;
                        }
                        return label;
                    }
                }
            }
        }
    });

    var ctx = document.getElementById("chartjs_bar1234561").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData6,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values)
                        {
                            return separarMilhar(value, 1000000);
                            //return accounting.formatMoney(Math.round(value * 100) / 100, "", 0, ".", ",");
                        }
                    }
                }]
            },
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: false,
                text: ''
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data)
                    {

                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        if (label != "Crescimento") {
                            if (label) {
                                label += ': ';
                            }
                            label += accounting.formatMoney(Math.round(tooltipItem.yLabel * 100) / 100, "", 0, ".", ",");
                        }
                        else {
                            var ano = tooltipItem.xLabel;
                            var porcent = "0%";
                            for (var i = 0; i < arrVlrCliPro.length; i++) {
                                var anoPorcent = arrVlrCliPro[i].split("|");
                                if (anoPorcent[0] == ano) {
                                    porcent = anoPorcent[1];
                                    break;
                                }
                            }
                            label += ": " + porcent;
                        }
                        return label;
                    }
                }
            }
        }
    });

    var barChartData9 = {
        labels: ["2015", "2016", "2017", "2018"],

        datasets: [{
            label: 'Crescimento',
            borderColor: window.chartColors.blue,
            backgroundColor: color(window.chartColors.blue).alpha(0).rgbString(),
            borderWidth: 3,
            data: [
                0,
                197356,
                303520,
                432285
            ],
            type: 'line'
        },
        {
            label: 'Volume',
            backgroundColor: color(window.chartColors.orange).alpha(1).rgbString(),
            borderColor: window.chartColors.orange,
            borderWidth: 1,
            data: [
                586711,
                784067,
                1087587,
                1519872
            ]
        }]
    };

    var ctx = document.getElementById("chartjs_bar9").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData9,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values)
                        {
                            return separarMilhar(value, 1000000);
                            //return accounting.formatMoney(Math.round(value * 100) / 100, "", 0, ".", ",");
                        }
                    }
                }]
            },
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: false,
                text: ''
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data)
                    {

                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        if (label != "Crescimento") {
                            if (label) {
                                label += ': ';
                            }
                            label += accounting.formatMoney(Math.round(tooltipItem.yLabel * 100) / 100, "", 0, ".", ",");
                        }
                        else {
                            var ano = tooltipItem.xLabel;
                            var porcent = "0%";
                            for (var i = 0; i < arrQtdCli.length; i++) {
                                var anoPorcent = arrQtdCli[i].split("|");
                                if (anoPorcent[0] == ano) {
                                    porcent = anoPorcent[1];
                                    break;
                                }
                            }
                            label += ": " + porcent;
                        }
                        return label;
                    }
                }
            }
        }
    });

    var barChartData10 = {
        labels: ["2015", "2016", "2017", "2018"],
        datasets: [{
            label: 'Crescimento',
            borderColor: window.chartColors.blue,
            backgroundColor: color(5, 228, 3).alpha(0).rgbString(),
            borderWidth: 3,
            data: [
                0,
                33819947.93,
                33662778.13,
                58539762.65
            ],
            type: 'line'
        },
        {
            label: 'Volume',
            backgroundColor: '#42e800',
            borderColor: '#42e800',
            borderWidth: 1,
            data: [
                55321670.07,
                89141618.03,
                122804396.16,
                181344158.81
            ]
        }]
    };

    var ctx = document.getElementById("chartjs_bar10").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData10,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values)
                        {
                            return separarMilhar(value, 1000000);
                            //return accounting.formatMoney(Math.round(value * 100) / 100, "", 0, ".", ",");
                        }
                    }
                }]
            },
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: false,
                text: ''
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data)
                    {

                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        if (label != "Crescimento") {
                            if (label) {
                                label += ': ';
                            }
                            label += accounting.formatMoney(Math.round(tooltipItem.yLabel * 100) / 100, "", 0, ".", ",");
                        }
                        else {
                            var ano = tooltipItem.xLabel;
                            var porcent = "0%";
                            for (var i = 0; i < arrVlrCli.length; i++) {
                                var anoPorcent = arrVlrCli[i].split("|");
                                if (anoPorcent[0] == ano) {
                                    porcent = anoPorcent[1];
                                    break;
                                }
                            }
                            label += ": " + porcent;
                        }
                        return label;
                    }
                }
            }
        }
    });
});

$(document).ready(function ()
{
    var randomScalingFactor = function ()
    {
        return Math.round(Math.random() * 100);
    };

    var chartColors = window.chartColors;
    var color = Chart.helpers.color;
    var config = {
        data: {
            datasets: [{
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                ],
                backgroundColor: [
                    color(chartColors.red).alpha(0.5).rgbString(),
                    color(chartColors.orange).alpha(0.5).rgbString(),
                    color(chartColors.yellow).alpha(0.5).rgbString(),
                    color(chartColors.green).alpha(0.5).rgbString(),
                    color(chartColors.blue).alpha(0.5).rgbString(),
                ],
                label: 'My dataset' // for legend
            }],
            labels: [
                "Red",
                "Orange",
                "Yellow",
                "Green",
                "Blue"
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Polar Area Chart'
            },
            scale: {
                ticks: {
                    beginAtZero: true
                },
                reverse: false
            },
            animation: {
                animateRotate: false,
                animateScale: true
            }
        }
    };

    var ctx = document.getElementById("chartjs_polar");
    window.myPolarArea = Chart.PolarArea(ctx, config);

});

$(document).ready(function ()
{
    var randomScalingFactor = function ()
    {
        return Math.round(Math.random() * 100);
    };

    var config = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                ],
                backgroundColor: [
                    window.chartColors.red,
                    window.chartColors.orange,
                    window.chartColors.yellow,
                    window.chartColors.green,
                    window.chartColors.blue,
                ],
                label: 'Dataset 1'
            }],
            labels: [
                "Red",
                "Orange",
                "Yellow",
                "Green",
                "Blue"
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Doughnut Chart'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    };

    var ctx = document.getElementById("chartjs_doughnut").getContext("2d");
    window.myDoughnut = new Chart(ctx, config);

});

$(document).ready(function ()
{
    var randomScalingFactor = function ()
    {
        return Math.round(Math.random() * 100);
    };

    var color = Chart.helpers.color;
    var config = {
        type: 'radar',
        data: {
            labels: [["Eating", "Dinner"], ["Drinking", "Water"], "Sleeping", ["Designing", "Graphics"], "Coding", "Cycling", "Running"],
            datasets: [{
                label: "New Students",
                backgroundColor: color(window.chartColors.red).alpha(0.2).rgbString(),
                borderColor: window.chartColors.red,
                pointBackgroundColor: window.chartColors.red,
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ]
            }, {
                label: "Old Students",
                backgroundColor: color(window.chartColors.blue).alpha(0.2).rgbString(),
                borderColor: window.chartColors.blue,
                pointBackgroundColor: window.chartColors.blue,
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ]
            },]
        },
        options: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Radar Chart'
            },
            scale: {
                ticks: {
                    beginAtZero: true
                }
            }
        }
    };

    window.myRadar = new Chart(document.getElementById("radar_chart"), config);
});

