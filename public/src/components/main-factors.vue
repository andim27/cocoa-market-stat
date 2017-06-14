<template><div><div class="column is-desktop is-full-mobile"><div class="hello">Основные{{who}}</div><section class="panel"><p class="panel-heading"><button class="button is-primary" v-on:click="func1">Commodity turnover</button></p><p class="panel-tabs"><a class="is-active" href="#">All Time</a> <a href="#">Past week</a> <a href="#">Past month</a> <a href="#">Past quarter</a> <a href="#">Past Year</a></p><div class="panel-block"><div id="chart1" style="height: 250px"></div></div><div class="panel-block"><button class="button is-default is-outlined is-fullwidth">View Data</button></div></section></div><div class="column is-desktop is-full-mobile"><section class="panel"><p class="panel-heading"><button class="button is-primary" v-on:click="func2">Sales</button></p><div class="panel-block"><div id="chart2" style="height: 280px"></div></div><div class="panel-block"><button class="button is-default is-outlined is-fullwidth">View Data</button></div></section></div><div class="column is-desktop is-full-mobile"><section class="panel"><p class="panel-heading"><button class="button is-primary" v-on:click="func3">YoY Comparison</button></p><div class="panel-block"><div id="chart3" style="height: 280px"></div></div><div class="panel-block"><button class="button is-default is-outlined is-fullwidth">View Data</button></div></section></div><div class="column is-desktop is-full-mobile"><section class="panel"><p class="panel-heading">Notifications</p><div class="panel-block"><div class="notification is-warning"><button class="delete" onclick="((this).parentNode.remove())"></button> <strong>Purchase order for cocoa powder.</strong><p><small>1h ago | via: system</small></p></div><div class="notification"><button class="delete" onclick="((this).parentNode.remove())"></button> <strong>Purchase order for cocoa powder.</strong><p><small>2h ago | via: system</small></p></div><div class="notification"><button class="delete" onclick="((this).parentNode.remove())"></button> <strong>Shipment of cocoa powder.</strong><p><small>1d ago | via: system</small></p></div><div class="notification"><button class="delete" onclick="((this).parentNode.remove())"></button> <strong>Bank - the arrival of payment under the contract.</strong><p><small>09.05.2017</small></p></div></div></section></div><div class="column is-desktop is-full-mobile"><section class="panel"><p class="panel-heading">Forecast</p><div class="panel-block"><div id="chart5" style="height: 280px"></div></div></section></div><div class="column is-desktop is-full-mobile"><section class="panel"><p class="panel-heading">Last shipment</p><div class="panel-block"><table class="table"><thead><tr><th>Name</th><th>Responsible manager</th><th></th><th></th></tr></thead><tfoot><tr><th>Name</th><th>Instrument</th><th></th><th></th></tr></tfoot><tbody><tr><td>GT Cocoa Corporation</td><td>Bass Guitar</td><td class="is-icon"><a href="#"><i class="fa fa-twitter"></i></a></td><td class="is-icon"><a href="#"><i class="fa fa-instagram"></i></a></td></tr><tr><td>?? ????????</td><td>Rhythm Guitar</td><td class="is-icon"><a href="#"><i class="fa fa-twitter"></i></a></td><td class="is-icon"><a href="#"><i class="fa fa-instagram"></i></a></td></tr><tr><td>??????-???????? (????? ???????)</td><td>Lead Guitar</td><td class="is-icon"><a href="#"><i class="fa fa-twitter"></i></a></td><td class="is-icon"><a href="#"><i class="fa fa-instagram"></i></a></td></tr><tr><td>????? ???? ??? - ???????</td><td>Drums</td><td class="is-icon"><a href="#"><i class="fa fa-twitter"></i></a></td><td class="is-icon"><a href="#"><i class="fa fa-instagram"></i></a></td></tr></tbody></table></div></section></div></div></template><script>module.exports = {
    data: function() {
        return {
            who: 'показатели'
        }
    },
    mounted:function () {
        console.log("!!! Mounted");

    },
    activated:function () {
        console.log("!!! ACTIVATED!!!");
        this.func1();
    },
    methods:  {

            func1: function () {
                new Morris.Line({
                    // ID of the element in which to draw the chart.
                    element: 'chart1',
                    // Chart data records -- each entry in this array corresponds to a point on
                    // the chart.
                    data: [
                        { year: '2006', value: 10394 },
                        { year: '2007', value: 50391 },
                        { year: '2008', value: 102025 },
                        { year: '2009', value: 198563 },
                        { year: '2010', value: 985641 },
                        { year: '2011', value: 1253256 },
                        { year: '2012', value: 4563215 },
                        { year: '2013', value: 10563215 },
                        { year: '2014', value: 50125009 },
                        { year: '2015', value: 129300581 },
                        { year: '2016', value: 256251253 }
                    ],
                    // The name of the data record attribute that contains x-values.
                    xkey: 'year',
                    // A list of names of data record attributes that contain y-values.
                    ykeys: ['value'],
                    // Labels for the ykeys -- will be displayed when you hover over the
                    // chart.
                    labels: ['Total Users']
                });
            },
            func2: function () {
                Morris.Donut({
                    element: 'chart2',
                    data: [
                        {label: "Download Sales", value: 12},
                        {label: "In-Store Sales", value: 30},
                        {label: "Mail-Order Sales", value: 20}
                    ]
                });
            },
            func3: function () {
                Morris.Area({
                    element: 'chart3',
                    data: [
                        { y: '1', a: 80, b: 79 },
                        { y: '2', a: 75,  b: 65 },
                        { y: '3', a: 50,  b: 40 },
                        { y: '4', a: 75,  b: 59 },
                        { y: '5', a: 50,  b: 20 },
                        { y: '6', a: 75,  b: 42 },
                        { y: '7', a: 75,  b: 50 },
                        { y: '8', a: 50,  b: 140 },
                        { y: '9', a: 75,  b: null },
                        { y: '10', a: 50,  b: null },
                        { y: '11', a: 75,  b: null },
                        { y: '12', a: 100, b: null }
                    ],
                    xkey: 'y',
                    ykeys: ['a', 'b'],
                    labels: ['2015', '2016']
                });
            }

    }

}</script><style>.hello {
    background-color: #ffe;
}</style>