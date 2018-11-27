<template>
    <div>
      <div class="accountSettings">
        <span class="headerTitle">账户设置</span>
        <el-button type="primary" plain @click="dialogFormVisible = true">更改密码</el-button>
        <el-dialog title="更改密码" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="原密码" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="修改密码" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
        <el-button type="primary" plain @click="dialogFormVisible2 = true">更改邮箱</el-button>
        <el-dialog title="更改邮箱" :visible.sync="dialogFormVisible2">
          <el-form :model="form2">
            <el-form-item label="原邮箱" :label-width="formLabelWidth2">
              <el-input v-model="form2.name2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="修改邮箱" :label-width="formLabelWidth2">
              <el-input v-model="form2.name2" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="notify">
        <span class="notifyTitle">隐私相关</span>
        <el-switch
          v-model="value3"
          active-text="允许其他人看到我的在线状态">
        </el-switch>
      </div>
    </div>
</template>

<script>
    export default {
        name: "UserSetting",
        data(){
          return{
            value3:true,
            dialogFormVisible: false,
            dialogFormVisible2: false,
            form: {
              name: '',
            },
            form2: {
              name2: '',
            },
            formLabelWidth: '120px',
            formLabelWidth2: '120px',
          }
        }
    }
</script>

<style scoped>
.accountSettings{
  width: 100%;
  margin-bottom: 50px;
}
.headerTitle{
  color: #000;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  display: inherit;
}
  .notifyTitle{
    color: #000;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
    display: inherit;
  }
</style>
