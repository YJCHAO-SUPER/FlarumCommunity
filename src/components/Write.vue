<template>
  <div style="position: fixed;height: 100vh;width: 100vw;z-index: 10;" :style="{'display': topic?'block':'none'}">
    <div class="all"></div>
    <div class="write" >
      <el-form>
        <div class="head">
          <el-select v-model="category" clearable value="" placeholder="请选择" class="select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input v-model="title" placeholder="请输入文章标题" class="title"></el-input>
        </div>
        <div class="editor-box">
          <div id="editor">
            <p>Hello World!</p>
            <p>Some initial <strong>bold</strong> text</p>
            <p><br></p>
          </div>
        </div>
      </el-form>
      <el-row>
        <el-button type="danger" @click="topicClose">取消</el-button>
        <el-button type="primary" @click="submit()">发布话题</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {getCategory} from "@/js/api";
  import {sendTopicInfo} from "../js/api";

  export default {
      name: "write",
      props:["topic"],
    data(){
        return {
          dynamicTags: [],
          options: [],
          category: null,
          title: '',
          content: ''
        }
      },
      methods:{
        topicClose(){
          this.$emit('topicBox',false)
        },
        submit(){
          let para = {
              categoryId: this.category,
              title: this.title,
              topicContent: this.content
          }
          sendTopicInfo(para).then((res)=>{
              if(res.data.state == true){
                alert(res.data.msg)
                this.$router.push("/topic/"+res.data.topicId)
              }else{
                alert(res.data.msg)
              }
          })
        }
      },
      mounted : function(){

        getCategory({}).then((res)=>{
          // console.log(res.data)
          for (let i=0;i<res.data.length;i++){
            this.options.push({
              label : res.data[i].category_name,
              value : res.data[i].id
            })
          }
        })

          // 初始化highlight
          hljs.initHighlightingOnLoad();
          // 配置高亮代码语言
          hljs.configure({   // optionally configure hljs
            languages: ['javascript', 'php', 'python','java','html','css']
          });
          let toolbarOptions = [
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

            // [{ 'font': fonts }],
            // [{ 'direction': 'rtl' }],                         // text 反向

            [{ 'header': [1, 2, 3, 4, 5, 6,false] }],

            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons

            ['blockquote', 'code-block'],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

            [{ 'list': 'ordered'}, { 'list': 'bullet' }],

            [{ 'script': 'sub'}, { 'script': 'super' }],      // 上标 下标

            [{ 'indent': '-1'}, { 'indent': '+1' }],          // 缩进

            [{ 'align': [] }],

            ['link','image'],

            ['clean']                                         // remove formatting button
          ];
          let quill = new Quill('#editor', {
            theme: 'snow',
            modules: {
              toolbar: toolbarOptions,
              syntax: true
            }
          });


          quill.on('editor-change', (eventName, ...args) => {
            if (eventName === 'text-change') {
              //文本变化
            } else if (eventName === 'selection-change') {
              //选择变化
            }
            this.content = quillGetHTML(quill.getContents());
          });
          //将delta对象转为html
          function quillGetHTML(inputDelta) {
            let tempCont = document.createElement("div");
            (new Quill(tempCont)).setContents(inputDelta);
            return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
          }

      }
    }
</script>

<style scoped>
  .el-row{
    float: right;
    margin-top: 20px;
  }
  .all{
    width: 100vw;
    height: 100vh;
    background-color: #000;
    position: fixed;
    opacity: 0.7;
    z-index: 9;
  }
  .editor-box {
    margin-top: 20px;
    -moz-box-shadow:1px 1px 10px #DCDFE6;
    -webkit-box-shadow:1px 1px 10px #DCDFE6;
    box-shadow:1px 1px 10px #DCDFE6;
    font-size: 14px;
  }
  .write{
    width: 70%;
    margin: 0 auto;
    position: relative;
    z-index: 11;
  }
  #editor {
    background-color: #fff;
    height: 500px;
    overflow: hidden;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    font-size: 1.5em;
  }
  .give{
    margin-top: 20px;
    float: right;
  }
  .head{
    margin-top: 40px;
  }
  .select{
    width: 20%;
    -moz-box-shadow:1px 1px 10px #DCDFE6;
    -webkit-box-shadow:1px 1px 10px #DCDFE6;
    box-shadow:1px 1px 10px #DCDFE6;
  }
  .title{
    width: 79%;
    float: right;
    -moz-box-shadow:1px 1px 10px #DCDFE6;
    -webkit-box-shadow:1px 1px 10px #DCDFE6;
    box-shadow:1px 1px 10px #DCDFE6;
  }
</style>
<style>
  .ql-toolbar.ql-snow {
    background-color: #fff;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
  }
  em {
    font-style: italic;
  }
</style>
