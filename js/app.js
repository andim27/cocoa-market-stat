/**
 * Created by andrey-note on 23.05.2017.
 */

$(document).ready(function() {
    //httpVueLoaderRegister(Vue, 'src/components/main-factors.vue');
    //Vue.use(httpVueLoader);


    app = new Vue({
        el: '#app',
        components: {
            'main-factors':httpVueLoader('src/components/main-factors.vue'),
            'settings':httpVueLoader('src/components/settings.vue'),

        },
        data: { //-------------------------App data---------------------------------
            menu:[{label:'Основной график',isActive:true},
                {label:'Источники данных',isActive:false},
                {label:'Основные показатели',isActive:false},
                {label:'Пользователи', isActive:false},
                {label:'Установки системы', isActive:false},

            ],
            menuActiveIndex:0,
            data_bases:[{name:'documents'},{name:'Sbcnts'}],
            cur_base_name:'documents',
            data_source:[
                {id:0,name:"заявкапокупателя_шапка",fields:[
                    {name:"IDDOC",type:"varchar(9)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"Склад",type:"varchar(100)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"Клиент",type:"varchar(100)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"Получатель",type:"varchar(100)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"ДатаОтгрузки",type:"date",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"ДатаПлатежа",type:"date",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"СуммаПлатежа",type:"decimal(17,2)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''}
                ],isOpen:true
                },
                {id:1,name:"заявкапокупателя",fields: [
                    {name:"IDDOC",type:"varchar(9)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"Товар",type:"varchar(100)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"Количество",type:"decimal(13,6)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"Цена",type:" decimal(17,2)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"Сумма",type:" decimal(17,2)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"ВесФакт",type:" decimal(17,2)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"ВесВозвр",type:" decimal(17,2)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"СуммаНДС",type:" decimal(15,2)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''}
                ],isOpen:false
                },
                {id:2,name:"валюта",fields: [
                    {name:"ID",type:"varchar(9)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"CODE",type:"varchar(3)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"DESCR",type:"varchar(9)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"ISMARK",type:"varchar(9)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"VERSTAMP",type:"varchar(9)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''}
                ],isOpen:false
                },
                {id:3,name:"контрагенты",fields:[
                    {name:"ID",type:"varchar(9)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"CODE",type:"varchar(80)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"DESCR",type:"varchar(80)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"ISMARK",type:"varchar(1)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"VERSTAMP",type:"varchar(9)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"ISFOLDER",type:"int(11)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''},
                    {name:"PARENTID",type:"varchar(9)",isAxisSelect:false,axisSelectedName:'',filterSelectedName:'',groupSelectedName:''}
                ],isOpen:false
                }
            ],
            selectedTableId:0,//---id from data_source
            cur_ds_index:0,  //--index 0,1,2,3... in data_source
            selectedFields:{ axis_x:[],axis_y:[],filter:[],group:[]},// { axis_x:[{base_name:'documents',table_name:'Контрагенты',field_name:'ID'},{}],axis_y:[{},{}]}
            filter_field:"поле",
            axis_x_detail:[2012,2013,2014,2015,2016,2017],
            axis_x_select:"year",
            month_list:[
                {name:"Январь",name_short:"Янв"},
                {name:"Февраль",name_short:"Фев"},
                {name:"Март",name_short:"Март"},
                {name:"Апрель",name_short:"Апр"},
                {name:"Июнь",name_short:"Июнь"},
                {name:"Июль",name_short:"Июль"},
                {name:"Август",name_short:"Авг"},
                {name:"Сентябрь",name_short:"Сент"},
                {name:"Октябрь",name_short:"Окт"},
                {name:"Ноябрь",name_short:"Нояб"},
                {name:"Декабрь",name_short:"Дек"}
            ],
            year_list:[2012,2013,2014,2015,2016,2017],
            main_chart_el:'#main_chart',
            main_chart_obj:{},
            main_chart_options:{
                credits: {
                    enabled: false
                },
                chart: {
                    renderTo: 'main_chart',
                    type: 'spline'
                },
                title: {
                    text: 'График заявок покупателей'
                },
                xAxis: {
                    categories: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май']
                },
                yAxis: {
                    title: {
                        text: 'Сумма'
                    },
                    labels: {
                        format: '{value} руб'
                    }
                },
                series: [{data:[10500,206500,2345,400240,55034]}]
            },
            client_type:0,
            goods_type:0,
            client_selected:"A",
            clients_list: [
                { text: 'Ваш продукт Компания (Ваш продукт, Торгсервис)', value: 'A' },
                { text: 'Шоколадница (Глазурь, РайсТорг, Концерн < Шоколадница >")', value: 'B' },
                { text: 'КузбассСнаб  (Мастер Кейк)', value: 'C' }
                ],
            goods_selected:"A",
            goods_list: [
                { text: 'Какао порошок алкализованный 10-12% жирность', value: 'A' },
                { text: 'Вафельная крошка', value: 'B' },
                { text: 'Жиры различных наименований (Эколад, Эконд, пр.)', value: 'C' }
                ],
            group_list:[
                {text:'год',value:'год'},
                {text:'вид товара',value:'вид товара'}
            ],
            filter_cond_operations:[
                {name:" = ",value:"="},
                {name:" <> ",value:"="},
                {name:" * ",value:"="},
                {name:" / ",value:"="}
            ],
            filter_field_value:0,
            filter_group:[{name:'field-1'},{name:'field-2'}]

        },
        methods: {
            menuActive:function(index) {
                //$("#menu_modal").removeClass('is-active');
                this.menuActiveIndex=index;
                for (var i=0; i< this.menu.length;i++ ) {
                    if (i == index) {
                        this.menu[i].isActive=true;
                    } else {
                        this.menu[i].isActive=false;
                    }
                }
                if (index==2) {//--controls
                    //initCharts();
                    //showMorris();
                }
                if (index==3) {//--controls
                    //initToday();
                }
               // console.log(index);
            },
            axisXChange:function (el) {
                //alert(el.value);
                //console.log(this.axis_x_select);
                this.axis_x_detail=[];
                if (this.axis_x_select=='month') {

                    for (var i=0; i < this.month_list.length; i++) {
                        this.axis_x_detail.push(this.month_list[i].name);
                    }
                    this.main_chart_obj.xAxis[0].categories=this.axis_x_detail;
                }
                if (this.axis_x_select=='year') {
                    for (var i=0; i < this.year_list.length; i++) {
                        this.axis_x_detail.push(this.year_list[i]);
                    }
                }
            },
            sourceFieldClick:function(index){
                if (this.data_source[index].isOpen) {
                    this.data_source[index].isOpen = false;
                } else {
                    this.data_source[index].isOpen = true;
                }
            },
            selectFieldAxis:function (axis_str,ds_index,field_index) {
                if (axis_str =='x') {

                }
                if (axis_str =='y') {

                }
            },
            selectFilterField:function(ds_index,field_index) {
                this.filter_field = this.data_source[ds_index].fields[field_index].name;
            },
            setCurDsIndex:function () {
                for (var i=0; i < this.data_source.length; i++) {
                    if (this.data_source[i].id == this.selectedTableId) {
                        this.cur_ds_index = i;
                        return;
                    }
                }
            },
            selectDatabase:function(n) {
                console.log(n);
            },
            selectTableChange:function (el_id) {
                //console.log($("#"+el_id).val());
                //console.log(this.selectedTableId);
                this.setCurDsIndex();
            },
            btnLoadClick:function(){
                alert('Загрузка данных...')
            },
            initMainChart:function(main_chart_options){
                var options ={};
                app.$data.main_chart_obj =  new Highcharts.Chart(main_chart_options);
            },
            changeMainGraphType:function(chart_type){
                this.main_chart_obj.options.chart.type = chart_type;
                //alert(app.$data.main_chart_obj.options.chart.type);
                this.main_chart_obj.series[0].update({
                    type: chart_type
                });
                //app.initMainChart(app.$data.main_chart_options);
            },
            clientTypeSelect:function() {
                console.log(this.client_type);
            },
            goodsTypeSelect:function() {
                console.log(this.goods_type);
            },
            clearGroupFields:function() {
                for (var i=0; i < this.data_source.length; i++) {
                    var fields =this.data_source[i].fields;
                    for (var j=0; j < fields.length; j++) {
                        fields[j].groupSelectedName='';
                    }
                }
                this.selectedFields.group=[];
            },
            clearFilterFields:function(kind) {
                for (var i=0; i < this.data_source.length; i++) {
                    var fields =this.data_source[i].fields;
                    for (var j=0; j < fields.length; j++) {
                        fields[j].filterSelectedName='';
                    }
                }
                this.selectedFields.filter=[];
                if (kind =='all') {
                    this.filter_field='';
                    this.filter_field_value=0;
                }

            },
            clearAxisFields:function () {
                for (var i=0; i < this.data_source.length; i++) {
                    var fields =this.data_source[i].fields;
                    for (var j=0; j < fields.length; j++) {
                        fields[j].isAxisSelect=false;
                        fields[j].axisSelectedName='';
                    }
                }
                this.selectedFields.axis_x=[];
                this.selectedFields.axis_y=[];
                this.clearFilterFields('all');
                this.clearGroupFields();
            },
            allowDrop:function (ev) {
                ev.preventDefault();
            },
            fieldDrag:function(ev) {
                //console.log("Drag is:",ev);
                ev.dataTransfer.setData("text", ev.target.id);
            },
            fieldDrop:function(ev) {
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                //console.log("fieldDrop data:",data);
                //console.log("ev.target.id:",ev.target.id);
                //ev.target.appendChild(document.getElementById(data));

                var ds_index = data.split("_")[1];
                var field_index = data.split("_")[2];

                var field_obj = {
                    base_name: this.cur_base_name,
                    table_name:this.data_source[this.selectedTableId].name,
                    field_name:this.data_source[ds_index].fields[field_index].name
                };
                this.data_source[ds_index].fields[field_index].isAxisSelect=true;
                if (ev.target.id =='drop_x') {
                    this.data_source[ds_index].fields[field_index].axisSelectedName='x';
                    this.selectedFields.axis_x.push(field_obj);
                }
                if (ev.target.id =='drop_y') {
                    this.data_source[ds_index].fields[field_index].axisSelectedName='y';
                    this.selectedFields.axis_y.push(field_obj);
                }

            },
            fieldFilterDrop:function(ev) {
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                var ds_index = data.split("_")[1];
                var field_index = data.split("_")[2];
                var field_obj = {
                    base_name: this.cur_base_name,
                    table_name:this.data_source[this.selectedTableId].name,
                    field_name:this.data_source[ds_index].fields[field_index].name
                };
                this.clearFilterFields('field');
                this.data_source[ds_index].fields[field_index].filterSelectedName=this.data_source[ds_index].fields[field_index].name;
                this.selectFilterField(ds_index,field_index);
                this.selectedFields.filter.push(field_obj);
            },
            fieldGroupDrop:function(ev) {
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                var ds_index = data.split("_")[1];
                var field_index = data.split("_")[2];
                var field_obj = {
                    base_name: this.cur_base_name,
                    table_name:this.data_source[this.selectedTableId].name,
                    field_name:this.data_source[ds_index].fields[field_index].name
                };
                this.data_source[ds_index].fields[field_index].groupSelectedName=this.data_source[ds_index].fields[field_index].name;
                this.selectedFields.group.push(field_obj);
            }
        }
    });
    app.initMainChart(app.$data.main_chart_options);


    //--------------Events----------
    app.$on('fixWorkingData',function(working_data){
       //console.log('!!! on !!!',working_data);
       this.data_source=[];
       this.clearAxisFields();
       for (var i=0;i < working_data.length;i++) {
           var ds_obj={id:i,name:working_data[i].table_name,fields:working_data[i].fields};
           for (var j=0;j < ds_obj.fields.length;j++) {
               ds_obj.fields[j].isAxisSelect=false;
               ds_obj.fields[j].axisSelectedName='';
               ds_obj.fields[j].filterSelectedName='';
               ds_obj.fields[j].groupSelectedName='';
           }

           //console.log("onfix",ds_obj);
           this.data_source.push(ds_obj);
       }
       //this.$emit('fixedWorkingData');
       app.$refs.settings.fixedWorkingData();
    });

});

document.addEventListener("DOMContentLoaded", function(){
    // Handler when the DOM is fully loaded
});

jQuery(document.body).on("DOMReady", "#chart1", function(e){

//console.log("Ready #chart1");
});


