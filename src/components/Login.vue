<template>
    <div class="body">
        <div class="form">
            <img src="../assets/avatar.png" width="200px" height="200px" style="border-radius:50%; border:2px solid #17AFB8">
            <div class="form-group">
                <input class="form-control" type="text" v-model="user.email" placeholder="email">
            </div>
            <div class="form-group">
                <input class="form-control" type="password" v-model="user.password" placeholder="password">
            </div>
            <small class="text-danger" v-if="incorrectCredential">Incorrect login credentials</small><br>
            <button type="submit" class="btn" style="width:300px; background-color:#17A2B8; color:white" v-on:click="post">Login</button><br>
            <small class="text-primary forgot" style="cursor:pointer" v-b-modal.modal-1><a>Forgot your password?</a></small>  
            <div>

                <b-modal id="modal-1" title="BootstrapVue">
                    <div slot="modal-header"><b><h3>Forgot Password</h3></b></div>
                    <h5>Enter your email</h5>
                    <input type="text" style="width:100%; border:2px solid rgb(120,120,120); border-radius:5px; height:40px" v-model="forgotPasswordEmail">
                    <small class="text-danger">A new password will be sent to your mail</small>
                    <div slot="modal-footer"><button class="btn" style="background-color:#17A2B8; color:white" v-on:click="resetPassword">Change password</button></div>
                </b-modal>
            </div>     
       </div>
    </div>
</template>


<script>
export default {
    data(){
        return{
            user:{
                email:'test',
                password:'7030'
            },
            incorrectCredential:false,
            forgotPasswordEmail:''
        }
    },
    methods:{
        post(){
            if(this.user.email.length>0 && this.user.password.length>0){
                let user = {
                    email:this.user.email,
                    password:this.user.password
                }
                console.log(user)
                let url = 'http://localhost:3000/users/login'
                    this.$http.post(url,user)
                    .then(data=>{console.log(data)
                    if(data.body.success){
                        localStorage.setItem('user',JSON.stringify(data.body.data))
                        this.$router.push('/allaccounts')
                    }
                    else if(!data.body.success){
                        this.incorrectCredential=true
                    }
                    })
                    .catch(this.incorrectCredential=true)
            }
        },
        resetPassword(){
            let user = {
                email: this.forgotPasswordEmail
            }
            let url = 'http://localhost:3000/users/resetpassword'
                    this.$http.post(url,user)
                    .then(data=>{console.log(data)
                    if(data.body.success){
                       this.$bvModal.msgBoxOk(`Your new password is ${data.body.password}`, {
                        title: 'Confirmation',
                        size: 'md',
                        //buttonSize: 'sm',
                        okVariant: 'primary',
                        headerClass: 'p-2 border-bottom-0',
                        footerClass: 'p-2 border-top-0',
                        centered: true
                       }) 
                    }
                    })
                    .catch(
                            this.$bvModal.msgBoxOk('Something went wrong', {
                                title: 'Confirmation',
                                size: 'md',
                                //buttonSize: 'sm',
                                okVariant: 'primary',
                                headerClass: 'p-2 border-bottom-0',
                                footerClass: 'p-2 border-top-0',
                                centered: true
                            }) 
                       )
            
        }
    }
}

</script>

<style scoped>
.body {
  height: 90vh;
  position: relative;
}

.form {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
/* .body{
    background-image: url('../assets/wallet.png')
} */
.body::after {
  content: "";
  background: url('../assets/image3.jpg');
  opacity: 0.3;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;   
}

.forgot:hover{
    color:red
}



</style>
    
