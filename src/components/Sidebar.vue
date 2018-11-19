<template>
    <div class="sideNav">
        <ul>
            <li class="item-newDiscussion App-primaryControl">
              <button class="Button Button--primary IndexPage-newDiscussion hasIcon" itemclassname="App-primaryControl" type="button" title="新的话题">
                <i class="icon fa fa-fw fa-edit Button-icon"></i>
                <span class="Button-label">新的话题</span>
              </button>
            </li>
            <li class="item-nav">
              <ul>
                <li  class="selectHeader">所有话题</li>
                <li  class="selectHeader">分类</li>
                <br>
                <li  class="select">求助</li>
                <li  class="select">开发</li>
                <li  class="select">UX</li>
                <li  class="select">插件扩展</li>
                <li  class="select">翻译</li>
                <li  class="select">FAQ</li>
                <li  class="select">需求</li>
                <li  class="select">公共</li>
                <li  class="select">反馈BUG</li>
                <li  class="select">发展建议</li>
                <li  class="select">灌水</li>
                <li  class="select">其他</li>
                <li  class="select">Flarum</li>
                <li  class="select">异常</li>
                <li  class="select">咨询</li>
                <li  class="select">更多</li>
              </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Sidebar"
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
