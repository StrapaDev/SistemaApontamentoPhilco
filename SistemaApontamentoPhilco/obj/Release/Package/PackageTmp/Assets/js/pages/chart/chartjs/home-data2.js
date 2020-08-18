$(document).ready(function () {
    new Chart(document.getElementById("bar-chart"), {
        type: 'bar',
        data: {
            labels: ["Jan/2018", "Fev/2018", "Mar/2018", "Abr/2018"],
            datasets: [
                {
                    label: "Faturamento",
                    backgroundColor: "#01B8AA",
                    data: [
                        1918394,
                        1813326,
                        2762494,
                        782662
                    ]
                }, {
                    label: "Planejamento",
                    backgroundColor: "#5F6B6D",
                    data: [
                        2058108,
                        2052862,
                        2956018,
                        2181668
                    ]
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Quantidade Faturada x Planejada'
            }
        },
        scaleSteps: 10,
        scaleStepWidth: 50,
        scaleStartValue: 0
    });
});

$(document).ready(function () {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            datasets: [{
                label: 'Cost',
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                backgroundColor: "rgba(255,61,103,0.3)"
            }, {
                label: 'Earning',
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                backgroundColor: "rgba(34,206,206,0.3)"
            }]
        }
    });
});