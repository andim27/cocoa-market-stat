<template>
    <div>
        <h2 class="title is-3 has-text-centered">Установки системы</h2>
        <div class="tabs is-boxed">

            <ul>
                <li v-bind:class="{'is-active':(this.tabActiveIndex==0)}" v-on:click="tabSelect(0)">
                    <a>
                        <span class="icon is-small"><i class="fa fa-bars"></i></span>
                        <span>Рабочие таблицы</span>
                    </a>
                </li>
                <li v-bind:class="{'is-active':(tabActiveIndex==1)}"  v-on:click="tabSelect(1)">
                    <a>
                        <span class="icon is-small"><i class="fa fa-database"></i></span>
                        <span>Базы данных</span>
                    </a>
                </li>
                <li v-bind:class="{'is-active':(tabActiveIndex==2)}"  v-on:click="tabSelect(2)">
                    <a>
                        <span class="icon is-small"><i class="fa fa-picture-o"></i></span>
                        <span>Параметры</span>
                    </a>
                </li>

            </ul>
        </div>
        <!--B:Рабочие таблицы-->
        <div class="columns" v-show="tabActiveIndex==0">
            <div class="column">
                <div class="field">
                    <!--<label class="label">Рабочие таблицы:</label>-->

                    <div class="field has-addons">
                        <label class="title">Рабочие таблицы:</label>
                        <button type="submit" class="button is-primary" v-on:click="fixWorkingTables">Зафиксировать</button>
                        <button type="submit" class="button is-warning" v-on:click="clearWorkingTables">Очистить</button>
                    </div>
                    <p class="control">
                    <div ondrop="app.$refs.settings.dbTableNameDrop(event)"  ondragover="app.$refs.settings.allowDrop(event)" class="column is-11" style="background-color: #c7ddef;min-height: 200px;">
                        <table class="table">
                            <tr v-for="(item,index) in working_data">
                                <td>
                                    <span v-text="item.base_name+'.'+item.table_name"></span>
                                </td>
                                <td v-show="item.isFixed">
                                    <i class="fa fa-check" aria-hidden="true"></i>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="column">
                        <p><span class="tag is-info">*</span>Перетащите сюда названия таблицы для анализа</p>
                    </div>


                    </p>
                </div>

            </div>
            <div class="column" >

                <div class="field has-addons">
                    <!--<p class="control is-expanded">-->

                        <p class="control">
                            <label class="title">База:</label>
                          <span class="select">
                              <select name="bases" v-model="db_selected_id">
                                   <option v-for="option in db_data" v-bind:value="option.id">
                                      {{ option.base_name }}
                                   </option>

                              </select>
                          </span>
                          <button type="submit" class="button is-primary">Обновить</button>
                        </p>
                    <!--</p>-->
                </div>
                <p class="control">
                    <div class="column" style="min-height: 200px;">
                        <!--background-color: #d3d6db;-->
                        <table class="table">
                            <tr v-for="table in db_data[db_selected_id].tables">
                                <td class="db-table-name">
                                    <span v-bind:id="'dbtablename_'+db_selected_id+'_'+table.id" v-text="table.name" draggable="true"  ondragstart="app.$refs.settings.dbTableNameDragStart(event)" ></span>
                                </td>
                                <td v-show="table.isWorking">
                                    <i class="fa fa-check" aria-hidden="true"></i>
                                </td>
                            </tr>
                        </table>
                    </div>
                </p>
            </div>
            <!--<div class="columns">-->
                <!--<div class="column" ></div>-->
            <!--</div>-->
        </div>
        <!--E:Рабочие таблицы-->

        <!--B:Databases-->
        <div class="columns" v-show="tabActiveIndex==1">
            <div class="field" style="background-color: #f5f7fa;padding:10px;">
                <!--<label class="radio">-->
                    <!--<input type="radio" name="bases" checked v-on:click="selectDatabase(0)">-->
                    <!--Documents-->
                <!--</label>-->
                <!--<label class="radio">-->
                    <!--<input type="radio" name="bases" v-on:click="selectDatabase(1)">-->
                    <!--Sbcnts-->
                <!--</label>-->
                <button type="submit" class="button is-primary">Загрузить Базы</button>
            </div>
        </div>
        <!--E:Databases-->
    </div>
</template>

<script>
   app.$on('fixedWorkingData',function(){
        console.log("!!!! ON VUE !!!");
        self.fixedWorkingData();
    });
window.set_cmp=this;
const message = [ 'списаниетмц_шапка', 'входящийплатеж_шапка', 'выдачакредита_шапка', 'заявкапокупателя', 'контракт', 'контрактпок' , 'получениекредита_шапка', 'получениекредита_шапка' ];
module.exports = {
    self:this,
    data: function () {
        return {
            tabActiveIndex: 0,
            list: message.map( (name,index) => {return {name, order: index+1, fixed: false}; }),
            list2:[],
            editable:true,
            isDragging: false,
            delayedDragging:false,
            db_selected_id:0,
            working_data:[],//--{base_name:'documents',table_name:'asdf',isFixed:false,fields:[{name:'sdffg',type:'sdfg'},{}]},{},{}
            db_data:[
                {id:0,base_name:'Documents',tables:[
                    {id:0,name:'СписаниеTмц',isWorking:false,fields:[
                                            {name:'ID',type:'Int'},
                                            {name:'LINENO',type:'Int'},
                                            {name:'Товар',type:'Char'},
                                            {name:'Количество',type:'Int'},
                                            {name:'Статья',type:'Char'},
                                            {name:'Партия',type:'Char'},
                    ]},
                    {id:1,name:'входящийплатеж',isWorking:false,fields:[
                                            {name:'ID',type:'Int'},
                                            {name:'LINENO',type:'Int'},
                                            {name:'ДокументОснование_doctype',type:'Int'},
                                            {name:'ДокументОснование_docid',type:'Int'},
                                            {name:'Сумма',type:'Int'},
                                            {name:'Расходы',type:'Int'},
                                            {name:'ID',type:'Int'}
                    ]},
                    {id:2,name:'контракт',isWorking:false,fields:[
                        {name:'ID',type:'Int'},
                        {name:'LINENO',type:'Int'},
                        {name:'Товар',type:'Int'},
                        {name:'Количество',type:'Int'},
                        {name:'Цена',type:'Int'},
                        {name:'Расходы',type:'Int'},
                        {name:'Сумма',type:'Int'}
                    ]}
                ]},
                {id:1,base_name:'Sncnts',tables:[
                    {id:0,name:'NewВидыТовара',isWorking:false,fields:[
                        {name:'ID',type:'Int'},
                        {name:'CODE',type:'Int'},
                        {name:'DESCR',type:'Char'},
                        {name:'ISMARK',type:'Int'},
                        {name:'VERSTAMP',type:'Char'}
                    ]},
                    {id:1,name:'newконтрагенты',isWorking:false,fields:[
                        {name:'ID',type:'Int'},
                        {name:'CODE',type:'Int'},
                        {name:'DESCR',type:'Int'},
                        {name:'ISMARK',type:'Int'},
                        {name:'VERSTAMP',type:'Int'},
                        {name:'ISFOLDER',type:'Int'}
                    ]},
                    {id:2,name:'newпроводкихозопераций',isWorking:false,fields:[
                        {name:'ID',type:'Int'},
                        {name:'CODE',type:'Int'},
                        {name:'DESCR',type:'Int'},
                        {name:'ISMARK',type:'Int'},
                        {name:'VERSTAMP',type:'Int'},
                        {name:'ISFOLDER',type:'Int'},
                        {name:'PARENTID',type:'Int'},
                        {name:'PARENTEXT',type:'Int'}
                    ]}
                ]}
            ]

        }
    },
    methods: {
        tabSelect: function (index) {
            console.log(index);
            this.tabActiveIndex = index;
        },
        //--------My----------------------------------
        dbTableNameDragStart: function(ev) {
            //console.log('DRAGstart ',ev);
            ev.dataTransfer.setData("text", ev.target.id);
            ev.dataTransfer.effectAllowed = 'move';
            //ev.dataTransfer.setData("text/html", ev.currentTarget);
        },
        dbTableNameDrop: function(ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");

            var ds_index = data.split("_")[1];
            var table_index = data.split("_")[2];
            if (this.db_data[this.db_selected_id].tables[table_index].isWorking ==true) {
                return;
            }
            var field_obj = {
                base_name: this.db_data[this.db_selected_id].base_name,
                table_id:  this.db_data[this.db_selected_id].tables[table_index].id,
                table_name:this.db_data[this.db_selected_id].tables[table_index].name,
                fields:this.db_data[this.db_selected_id].tables[table_index].fields,
                isFixed:false
            };
            this.working_data.push(field_obj);
            this.db_data[this.db_selected_id].tables[table_index].isWorking = true;
        },
        allowDrop: function (ev) {
            ev.preventDefault();
        },
        clearWorkingTables:function() {
            this.working_data=[];
            for (var i=0;i < this.db_data.length;i++) {
                for (var j=0;j < this.db_data[i].tables.length;j++) {
                    this.db_data[i].tables[j].isWorking=false;
                }
            }
        },
        fixWorkingTables: function() {
            //console.log(this.working_data);
            //this.$emit('fixWorkingData');
            this.$parent.$emit('fixWorkingData',this.working_data);
        },
        fixedWorkingData: function () {
            for (var i=0;i < this.working_data.length;i++) {
                this.working_data[i].isFixed = true;
            }
            console.log('!!! fixed !!!');
        }
    },
    computed: {

        dragOptions: function () {
            return  {
                animation: 0,
                group: 'description',
                disabled: !this.editable,
                ghostClass: 'ghost'
            }
        },
        listString: function(){
            return JSON.stringify(this.list, null, 2);
        },
        list2String: function(){
            return JSON.stringify(this.list2, null, 2);
        }
    },
    watch: {
        isDragging: function (newValue) {
            if (newValue){
                this.delayedDragging= true;
                return
            }
            this.$nextTick( () =>{
                this.delayedDragging =false
            })
        }
    }



}
</script>

<style>
.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.ghost {
    opacity: .5;
    background: #C8EBFB;
}

.list-group {
    min-height: 20px;
}

.db-table-name {
    cursor: move;
}

.list-group-item i{
    cursor: pointer;
}
</style>