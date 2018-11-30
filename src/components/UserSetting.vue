<template>
    <div>
      <div class="accountSettings"  >
        <span class="headerTitle">账户设置</span>
        <el-button type="primary" plain @click="dialogFormVisible = true">更改密码</el-button>
        <el-dialog title="更改密码" :visible.sync="dialogFormVisible">
          <el-form>
            <el-form-item label="原密码" :label-width="formLabelWidth">
              <el-input v-model="originalPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="修改密码" :label-width="formLabelWidth">
              <el-input v-model="changePassword" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="sendPassword">确 定</el-button>
          </div>
        </el-dialog>
        <el-button type="primary" plain @click="dialogFormVisible2 = true">更改邮箱</el-button>
        <el-dialog title="更改邮箱" :visible.sync="dialogFormVisible2">
          <el-form>
            <el-form-item label="原邮箱" :label-width="formLabelWidth2">
              <el-input v-model="originalMailbox" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="修改邮箱" :label-width="formLabelWidth2">
              <el-input v-model="modifyMailBox" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="sendEmail">确 定</el-button>
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
  import {sendChangePassword} from "../js/api";
  import {sendChangeEmail} from "../js/api";

  export default {
        name: "UserSetting",
        data(){
          return{
            value3:true,
            dialogFormVisible: false,
            dialogFormVisible2: false,
            originalPassword: '',
            changePassword: '',
            originalMailbox: '',
            modifyMailBox: '',
            formLabelWidth: '120px',
            formLabelWidth2: '120px',
          }
        },
      methods:{
        sendPassword(){
          let para = {
            oldPassword : this.originalPassword,
            newPassword : this.changePassword
          }
          sendChangePassword(para).then((res)=>{
              this.originalPassword = ''
              this.changePassword = ''
              this.dialogFormVisible = false
              if(res.data.code ==200){
                this.$notify({
                  title: '成功',
                  message:res.data.msg,
                  type: 'success'
                });
              }else {
                this.$notify.error({
                  title: '错误',
                  message: res.data.msg
                });
              }

          })
        },
        sendEmail(){
          let para = {
            oldEmail : this.originalMailbox,
            newEmail : this.modifyMailBox
          }
          sendChangeEmail(para).then((res)=>{
            this.originalMailbox = ''
            this.modifyMailBox = ''
            this.dialogFormVisible2 = false
            if(res.data.code ==200){
              this.$notify({
                title: '成功',
                message:res.data.msg,
                type: 'success'
              });
            }else {
              this.$notify.error({
                title: '错误',
                message: res.data.msg
              });
            }
          })
        },
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
