<template>
    <div>
        <h2 class="title is-3 has-text-centered">Установки системы</h2>
        <div class="tabs is-boxed">

            <ul>
                <li  v-bind:class="{'is-active':(this.tabActiveIndex==0)}" v-on:click="tabSelect(0)">
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
                        <button type="submit" class="button is-primary">Зафиксировать</button>
                        <button type="submit" class="button is-warning">Очистить</button>
                    </div>
                    <p class="control">
                    <div  class="column is-11" style="background-color: #c7ddef;min-height: 200px;">

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
                          <span class="select">
                          <select name="country">
                            <option value="Documents">Documents</option>
                            <option value="Sbcnts">Sbcnts</option>
                          </select>
                              </span>
                          <button type="submit" class="button is-primary">База</button>
                        </p>
                    <!--</p>-->
                </div>
                <p class="control">
                    <div class="column" style="background-color: #c7ddef;min-height: 200px;">
                        <ul>

                        </ul>
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
const message = [ 'списаниетмц_шапка', 'входящийплатеж_шапка', 'выдачакредита_шапка', 'заявкапокупателя', 'контракт', 'контрактпок' , 'получениекредита_шапка', 'получениекредита_шапка' ];
module.exports = {
    data: function () {
        return {
            tabActiveIndex: 0,
            list: message.map( (name,index) => {return {name, order: index+1, fixed: false}; }),
            list2:[],
            editable:true,
            isDragging: false,
            delayedDragging:false

        }
    },
    methods: {
        tabSelect: function (index) {
            console.log(index);
            this.tabActiveIndex = index;
        },
        orderList () {
            this.list = this.list.sort((one,two) =>{return one.order-two.order; })
        },
        onMove ({relatedContext, draggedContext}) {
            const relatedElement = relatedContext.element;
            const draggedElement = draggedContext.element;
            return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
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

.list-group-item {
    cursor: move;
}

.list-group-item i{
    cursor: pointer;
}
</style>