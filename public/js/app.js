"use strict";$(document).ready(function(){app=new Vue({el:"#app",components:{"main-factors":httpVueLoader("src/components/main-factors.vue"),settings:httpVueLoader("src/components/settings.vue")},data:{menu:[{label:"Основной график",isActive:!0},{label:"Источники данных",isActive:!1},{label:"Основные показатели",isActive:!1},{label:"Пользователи",isActive:!1},{label:"Установки системы",isActive:!1}],menuActiveIndex:0,data_bases:[{name:"documents"},{name:"Sbcnts"}],cur_base_name:"documents",data_source:[{id:0,name:"заявкапокупателя_шапка",fields:[{name:"IDDOC",type:"varchar(9)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"Склад",type:"varchar(100)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"Клиент",type:"varchar(100)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"Получатель",type:"varchar(100)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"ДатаОтгрузки",type:"date",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"ДатаПлатежа",type:"date",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"СуммаПлатежа",type:"decimal(17,2)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""}],isOpen:!0},{id:1,name:"заявкапокупателя",fields:[{name:"IDDOC",type:"varchar(9)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"Товар",type:"varchar(100)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"Количество",type:"decimal(13,6)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"Цена",type:" decimal(17,2)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"Сумма",type:" decimal(17,2)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"ВесФакт",type:" decimal(17,2)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"ВесВозвр",type:" decimal(17,2)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"СуммаНДС",type:" decimal(15,2)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""}],isOpen:!1},{id:2,name:"валюта",fields:[{name:"ID",type:"varchar(9)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"CODE",type:"varchar(3)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"DESCR",type:"varchar(9)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"ISMARK",type:"varchar(9)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"VERSTAMP",type:"varchar(9)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""}],isOpen:!1},{id:3,name:"контрагенты",fields:[{name:"ID",type:"varchar(9)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"CODE",type:"varchar(80)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"DESCR",type:"varchar(80)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"ISMARK",type:"varchar(1)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"VERSTAMP",type:"varchar(9)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"ISFOLDER",type:"int(11)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""},{name:"PARENTID",type:"varchar(9)",isAxisSelect:!1,axisSelectedName:"",filterSelectedName:"",groupSelectedName:""}],isOpen:!1}],selectedTableId:0,cur_ds_index:0,selectedFields:{axis_x:[],axis_y:[],filter:[],group:[]},filter_field:"поле",axis_x_detail:[2012,2013,2014,2015,2016,2017],axis_x_select:"year",month_list:[{name:"Январь",name_short:"Янв"},{name:"Февраль",name_short:"Фев"},{name:"Март",name_short:"Март"},{name:"Апрель",name_short:"Апр"},{name:"Июнь",name_short:"Июнь"},{name:"Июль",name_short:"Июль"},{name:"Август",name_short:"Авг"},{name:"Сентябрь",name_short:"Сент"},{name:"Октябрь",name_short:"Окт"},{name:"Ноябрь",name_short:"Нояб"},{name:"Декабрь",name_short:"Дек"}],year_list:[2012,2013,2014,2015,2016,2017],main_chart_el:"#main_chart",main_chart_obj:{},main_chart_options:{credits:{enabled:!1},chart:{renderTo:"main_chart",type:"spline"},title:{text:"График заявок покупателей"},xAxis:{categories:["Январь","Февраль","Март","Апрель","Май"]},yAxis:{title:{text:"Сумма"},labels:{format:"{value} руб"}},series:[{data:[10500,206500,2345,400240,55034]}]},client_type:0,goods_type:0,client_selected:"A",clients_list:[{text:"Ваш продукт Компания (Ваш продукт, Торгсервис)",value:"A"},{text:'Шоколадница (Глазурь, РайсТорг, Концерн < Шоколадница >")',value:"B"},{text:"КузбассСнаб  (Мастер Кейк)",value:"C"}],goods_selected:"A",goods_list:[{text:"Какао порошок алкализованный 10-12% жирность",value:"A"},{text:"Вафельная крошка",value:"B"},{text:"Жиры различных наименований (Эколад, Эконд, пр.)",value:"C"}],group_list:[{text:"год",value:"год"},{text:"вид товара",value:"вид товара"}],filter_cond_operations:[{name:" = ",value:"="},{name:" <> ",value:"="},{name:" * ",value:"="},{name:" / ",value:"="}],filter_field_value:0,filter_group:[{name:"field-1"},{name:"field-2"}]},methods:{menuActive:function(e){this.menuActiveIndex=e;for(var t=0;t<this.menu.length;t++)this.menu[t].isActive=t==e},axisXChange:function(e){if(this.axis_x_detail=[],"month"==this.axis_x_select){for(var t=0;t<this.month_list.length;t++)this.axis_x_detail.push(this.month_list[t].name);this.main_chart_obj.xAxis[0].categories=this.axis_x_detail}if("year"==this.axis_x_select)for(var t=0;t<this.year_list.length;t++)this.axis_x_detail.push(this.year_list[t])},sourceFieldClick:function(e){this.data_source[e].isOpen?this.data_source[e].isOpen=!1:this.data_source[e].isOpen=!0},selectFieldAxis:function(e,t,a){},selectFilterField:function(e,t){this.filter_field=this.data_source[e].fields[t].name},setCurDsIndex:function(){for(var e=0;e<this.data_source.length;e++)if(this.data_source[e].id==this.selectedTableId)return void(this.cur_ds_index=e)},selectDatabase:function(e){console.log(e)},selectTableChange:function(e){this.setCurDsIndex()},btnLoadClick:function(){alert("Загрузка данных...")},initMainChart:function(e){app.$data.main_chart_obj=new Highcharts.Chart(e)},changeMainGraphType:function(e){this.main_chart_obj.options.chart.type=e,this.main_chart_obj.series[0].update({type:e})},clientTypeSelect:function(){console.log(this.client_type)},goodsTypeSelect:function(){console.log(this.goods_type)},clearGroupFields:function(){for(var e=0;e<this.data_source.length;e++)for(var t=this.data_source[e].fields,a=0;a<t.length;a++)t[a].groupSelectedName="";this.selectedFields.group=[]},clearFilterFields:function(e){for(var t=0;t<this.data_source.length;t++)for(var a=this.data_source[t].fields,i=0;i<a.length;i++)a[i].filterSelectedName="";this.selectedFields.filter=[],"all"==e&&(this.filter_field="",this.filter_field_value=0)},clearAxisFields:function(){for(var e=0;e<this.data_source.length;e++)for(var t=this.data_source[e].fields,a=0;a<t.length;a++)t[a].isAxisSelect=!1,t[a].axisSelectedName="";this.selectedFields.axis_x=[],this.selectedFields.axis_y=[],this.clearFilterFields("all"),this.clearGroupFields()},allowDrop:function(e){e.preventDefault()},fieldDrag:function(e){e.dataTransfer.setData("text",e.target.id)},fieldDrop:function(e){e.preventDefault();var t=e.dataTransfer.getData("text"),a=t.split("_")[1],i=t.split("_")[2],s={base_name:this.cur_base_name,table_name:this.data_source[this.selectedTableId].name,field_name:this.data_source[a].fields[i].name};this.data_source[a].fields[i].isAxisSelect=!0,"drop_x"==e.target.id&&(this.data_source[a].fields[i].axisSelectedName="x",this.selectedFields.axis_x.push(s)),"drop_y"==e.target.id&&(this.data_source[a].fields[i].axisSelectedName="y",this.selectedFields.axis_y.push(s))},fieldFilterDrop:function(e){e.preventDefault();var t=e.dataTransfer.getData("text"),a=t.split("_")[1],i=t.split("_")[2],s={base_name:this.cur_base_name,table_name:this.data_source[this.selectedTableId].name,field_name:this.data_source[a].fields[i].name};this.clearFilterFields("field"),this.data_source[a].fields[i].filterSelectedName=this.data_source[a].fields[i].name,this.selectFilterField(a,i),this.selectedFields.filter.push(s)},fieldGroupDrop:function(e){e.preventDefault();var t=e.dataTransfer.getData("text"),a=t.split("_")[1],i=t.split("_")[2],s={base_name:this.cur_base_name,table_name:this.data_source[this.selectedTableId].name,field_name:this.data_source[a].fields[i].name};this.data_source[a].fields[i].groupSelectedName=this.data_source[a].fields[i].name,this.selectedFields.group.push(s)}}}),app.initMainChart(app.$data.main_chart_options),app.$on("fixWorkingData",function(e){this.data_source=[],this.clearAxisFields();for(var t=0;t<e.length;t++){for(var a={id:t,name:e[t].table_name,fields:e[t].fields},i=0;i<a.fields.length;i++)a.fields[i].isAxisSelect=!1,a.fields[i].axisSelectedName="",a.fields[i].filterSelectedName="",a.fields[i].groupSelectedName="";this.data_source.push(a)}app.$refs.settings.fixedWorkingData()})}),document.addEventListener("DOMContentLoaded",function(){}),jQuery(document.body).on("DOMReady","#chart1",function(e){});