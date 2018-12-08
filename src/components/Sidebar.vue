<template>
    <div class="sideNav">
        <ul>
            <li class="item-newDiscussion App-primaryControl">
              <button @click="addTopic" class="Button Button--primary IndexPage-newDiscussion hasIcon" itemclassname="App-primaryControl" type="button" title="新的话题">
                <i class="icon fa fa-fw fa-edit Button-icon"></i>
                <span class="Button-label" >新的话题</span>
              </button>
            </li>
            <li class="item-nav">
              <ul>
                <li  class="selectHeader">★&nbsp;&nbsp;所有话题</li>
                <li  class="selectHeader">★&nbsp;&nbsp;关注</li>
                <li  class="selectHeader">★&nbsp;&nbsp;分类</li>
                <br>
                <li  class="select" v-for="item in categoryGroup">{{ item.name }}</li>
                <li  class="selectHeader">更多. . .</li>
              </ul>
            </li>
        </ul>
    </div>
</template>

<script>
  import {getCategory} from "@/js/api";

  export default {
        name: "Sidebar",
        data(){
          return{
            categoryGroup:[]
          }
        },
        created:function (){

        },
        methods:{
          addTopic(){
            this.$emit('topicBox',true)
          }
        },
        mounted:function () {
          getCategory({}).then((res)=>{
            // console.log(res.data)
            for (let i=0;i<res.data.length;i++){
              this.categoryGroup .push({
                name : res.data[i].category_name
              })
            }
          })
        }
    }
</script>

<style scoped>
  .sideNav{
    width: 100%;
    float: left;
  }
  .sideNav > ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: list-item;
    text-align: -webkit-match-parent;
  }
  .sideNav .item-newDiscussion {
    margin-bottom: 20px;
  }
  .sideNav .item-newDiscussion .Button {
    display: block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .Button--primary {
    color: #fff;
    background: #4d698e;
    font-weight: bold;
    padding-left: 20px;
    padding-right: 20px;
  }
  .Button {
    display: inline-block;
    margin-bottom: 0;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    white-space: nowrap;
    line-height: 20px;
    padding: 8px 13px;
    border-radius: 4px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 0;
  }
  .Button--primary .Button-icon {
    display: none;
  }
  .Button-icon, .Button-caret {
    font-size: 14px;
  }
  .Button-icon {
    margin-right: 3px;
  }
  .fa-fw {
    width: 1.28571429em;
    text-align: center;
  }
  .selectHeader{
    display: block;
    padding: 8px 0 8px 30px;
    color: #667c99;
    font-size: 15px;

  }
  .select{
    padding: 8px 0 8px 30px;
    color: #667c99;
    font-size: 15px;
  }
</style>
