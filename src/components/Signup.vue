<template>
    <div class="body">
        <div class="form">
        <img src="../assets/avatar.png" v-if="!item.imageUrl" width="150px" height="150px">
        <img v-if="item.imageUrl" :src="item.imageUrl" width="150px" height="150px" style="border-radius:50%"/>
        
        <div class="form-group">
            <input class="form-control" type="text" v-model="user.firstname" placeholder="Firstname">
        </div>
        <div class="form-group">
            <input class="form-control" type="text" v-model="user.lastname" placeholder="Lastname">
        </div>
        <div class="form-group">
            <input class="form-control" type="text" v-model="user.email" placeholder="email">
        </div>
        <!-- <div class="form-group">
            <input class="form-control" type="text" v-model="user.username" placeholder="Username">
        </div> -->
        <div class="form-group">
            <input class="form-control" type="password" v-model="user.password" placeholder="Password">
        </div>
        <div class="form-group">
            <input class="form-control" type="password" v-model="password2" placeholder="Confirm password">
        </div>
        <div class="form-group">
            <input type="file" accept="image/*" @change="selectImage" />
        </div>
        <small class="text-danger" v-if="passwordsMatch">Passwords do not match</small><br>
        <div class="loader" v-if="showLoader"></div>
        <button type="subimt" class="btn signup" v-on:click="createUser">Create User</button>
        </div>


        <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide>
            User has been created
        </b-toast>  
        <b-toast id="example-toast2" title="BootstrapVue" static no-auto-hide>
            Oops!!! Something went wrong
        </b-toast>            

    </div>
    
</template>


<script>
import axios from 'axios'
const api = require('../app')
    export default {
        data(){
            return {
                user: {
                    // firstname:"Ibrahim",
                    // lastname:"Adigun",
                    // email:"test",
                    // username:"adigun",
                    // password:"0000",
                    // img:''
                    firstname:"",
                    lastname:"",
                    email:"",
                    username:"",
                    password:"",
                    img:''
                },
                password2 :'',
                passwordsMatch:false,
                item:{
                    image : null,
                    imageUrl: null
                },
                showLoader:false
            };
        },
        methods: {
            createUser(){
                this.showLoader=true
                if(this.user.password===this.password2){
                    this.passwordsMatch=false
                    let newUser = {
                        firstName:this.user.firstname,
                        lastName:this.user.lastname,
                        email:this.user.email,
                        //userName:this.user.username,
                        password:this.user.password,
                        type:"staff",
                        isAdmin:true,
                        imgUrl:this.user.imgUrl
                    }
                    // let url = 'http://localhost:3000/users/add'
                    let url = `${api}users/add`
                    if(this.image){
                        //image upload
                        const CLOUDINARY_URL="https://api.cloudinary.com/v1_1/dk0ydrw94/upload"
                        const CLOUDINARY_UPLOAD_PRESET="ym00sgsu"
                        let formData = new FormData()
                        formData.append('file',this.image)
                        formData.append('upload_preset',CLOUDINARY_UPLOAD_PRESET)
                        axios({
                            url:CLOUDINARY_URL,
                            method:'post',
                            headers:{
                                'Content-Type':'application/x-www-form-urlencoded'
                            },
                            data:formData
                        })
                        .then(res=>{
                            //console.log(res)
                            //console.log(newUser)
                            this.user.imgUrl=res.data.secure_url
                            this.$http.post(url,newUser)
                            .then(data=>{
                                //console.log(data)
                                this.showLoader=false
                                this.user.firstname=null,
                                this.user.lastname=null,
                                this.user.email=null,
                                this.user.username=null,
                                this.user.password=null,
                                this.user.img=null,
                                this.item.imageUrl=null
                                this.$bvToast.toast(`User Created`, {
                                title: 'Success',
                                autoHideDelay: 5000,
                                })
                            })
                            .catch(err=>{
                                this.$bvToast.toast(`User not Created`, {
                                title: 'Failed',
                                autoHideDelay: 5000,
                                })
                            })
                        })
                        .catch(err=>{
                            //console.log(err)
                            this.$bvToast.toast(`User not Created`, {
                            title: 'Failed',
                            autoHideDelay: 5000,
                            })                        
                        })
                    }
                    else{
                      this.$http.post(url,newUser)
                      .then(data=>{
                          this.showLoader=false
                            this.user.firstname=null,
                            this.user.lastname=null,
                            this.user.email=null,
                            this.user.username=null,
                            this.user.password=null,
                            this.user.img=null
                          //console.log(data)
                            this.$bvToast.toast(`User Created`, {
                                title: 'Success',
                                autoHideDelay: 5000,
                            })
                          })  
                        .catch(err=>{
                            this.$bvToast.toast(`User not Created`, {
                                title: 'Failed',
                                autoHideDelay: 5000,
                            
                            })
                            }
                        )
                    }
                }
                else{
                    this.passwordsMatch=true
                }
             
            },
            selectImage(e){
                const file = e.target.files[0]
                this.image = file
                this.item.imageUrl = URL.createObjectURL(file)
            },
            // uploadImage(){
            //     const CLOUDINARY_URL="https://api.cloudinary.com/v1_1/dk0ydrw94/upload"
            //     const CLOUDINARY_UPLOAD_PRESET="ym00sgsu"
            //     let formData = new FormData()
            //     formData.append('file',this.image)
            //     formData.append('upload_preset',CLOUDINARY_UPLOAD_PRESET)
            //     axios({
            //         url:CLOUDINARY_URL,
            //         method:'post',
            //         headers:{
            //             'Content-Type':'application/x-www-form-urlencoded'
            //         },
            //         data:formData
            //     })
            //     .then(res=>{console.log(res)})
            //     .catch(err=>{console.log(err)})

            // }
        }
    }

</script>

<style scoped>
.body {
  height: 100vh;
  position: relative;
  background-color: #F5F5F5
}

.form {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
img{
    border:1px solid #17A2B8;
    border-radius:50%
}
.signup{
    width:300px; 
    background-color:#17A2B8; 
    color:white
}
.signup:hover{
    color:#17A2B8;
    background-color:white;
    border: 1px solid #17A2B8
}
.loader {
  border: 10px solid #f3f3f3; /* Light grey */
  border-top: 10px solid #17A2B8; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  margin-right:auto;
  margin-left:auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
    
