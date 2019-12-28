<template>
    <div>
        <div class="body">
            <div class="form">
                <img src="../assets/avatar.png" v-if="!item.imageUrl" width="150px" height="150px">
                <img v-if="item.imageUrl" :src="item.imageUrl" width="150px" height="150px" style="border-radius:50%"/>
                <div class="form-group">
                    <input class="form-control" type="text" v-model="account.firstname" placeholder="Firstname">
                </div> 
                <div class="form-group">
                    <input class="form-control" type="text" v-model="account.lastname" placeholder="Lastname">
                </div>  
                <div class="form-group">
                    <input class="form-control" type="email" v-model="account.email" placeholder="email">
                </div>  
                <div class="form-group">
                    <input class="form-control" type="password" v-model="account.password" placeholder="password">
                </div>     
                <div class="form-group">
                    <select class="form-control" v-model="account.type">
                    <option>Savings</option>
                    <option>Current</option>
                    </select>
                </div>
                <div class="form-group">
                    <input type="file" accept="image/*" @change="selectImage"/>
                </div>
                <div class="loader" v-if="showLoader"></div>
                <button type="subimt" class="btn create" v-on:click="post">Create Account</button>
            </div>
        </div> 

        <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide>
            Account has been created
        </b-toast>  
        <b-toast id="example-toast2" title="BootstrapVue" static no-auto-hide>
            Oops!!! Something went wrong
        </b-toast>            

        


    </div>
</template>


<script>
import axios from 'axios'
const api = require('../app')
    export default{
        data(){
            return{
                account:{
                    firstname:"",
                    lastname:"",
                    openingbalance:"",
                    type:"Savings",
                    email:"",
                    password:""
                },
                item:{
                    image : null,
                    imageUrl: null
                },
                imgUrl:null,
                showLoader:false

            }
        },
        methods:{
            post(){
                this.showLoader=true
             let account = {
                 firstname:this.account.firstname,
                 lastname:this.account.lastname,
                 balance:0,
                 type:this.account.type,
                 email:this.account.email,
                 imgUrl:null,
                 password:this.account.password,
                 isAdmin:false
             }
             let user = {
                firstName:this.account.firstname,
                lastName:this.account.lastname,
                balance:parseInt(this.account.openingbalance),
                type:this.account.type,
                email:this.account.email,
                imgUrl:null,
                password:this.account.password,
                isAdmin:false 
             }
             //console.log(account)
            //  let accountsurl = 'http://localhost:3000/accounts/add'
            //  let usersurl = 'http://localhost:3000/users/add'
            let accountsurl = `${api}accounts/add`
             let usersurl = `${api}users/add`
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
                .then(
                    res=>{
                        user.imgUrl=res.data.secure_url 
                        this.$http.post(usersurl,user)
                        .then(data=>{
                            //console.log(data)
                        })
                            .then(res2=>{
                                account.imgUrl=res.data.secure_url                    
                                this.$http.post(accountsurl,account)
                                .then(data=>{
                                    //console.log(data)
                                    this.showLoader=false
                                    this.account.firstname=null,
                                    this.account.lastname=null,
                                    this.account.openingbalance=null,
                                    this.account.email=null,
                                    this.account.password=null,
                                    this.item.imgUrl=null
                                    this.$bvToast.toast(`Account Created`, {
                                    title: 'Success',
                                    autoHideDelay: 5000,
                                    })
                                })
                                .catch(err=>{
                                    //console.log(err)
                                    this.$bvToast.toast(`Account not Created`, {
                                    title: 'Failed',
                                    autoHideDelay: 5000,
                                    })
                                })
                            })
                            .catch(err=>{
                                //console.log(err)
                                this.$bvToast.toast(`Account not Created`, {
                                    title: 'Failed',
                                    autoHideDelay: 5000,
                                })
                            })
                        .catch(err=>{
                            //console.log(err)
                            this.$bvToast.toast(`Account not Created`, {
                                    title: 'Failed',
                                    autoHideDelay: 5000,
                            })
                        })
                    }
                )
             }
             else{
                 //console.log("no image",account)
                this.$http.post(usersurl,user)
                .then(data=>{
                    //console.log(data)
                    this.$http.post(accountsurl,account)
                    .then(data=>{
                        this.showLoader=false
                        this.account.firstname=null,
                        this.account.lastname=null,
                        this.account.openingbalance=null,
                        this.account.email=null,
                        this.account.password=null
                        this.$bvToast.toast(`Account Created`, {
                                    title: 'Success',
                                    autoHideDelay: 5000,
                        })
                    })
                })
                .catch(err=>{
                    //console.log(err)
                    this.$bvToast.toast(`Account not Created`, {
                                    title: 'Failed',
                                    autoHideDelay: 5000,
                    })
                })
                //})
                .catch(err=>{
                    this.$bvToast.toast(`Account not Created`, {
                                    title: 'Failed',
                                    autoHideDelay: 5000,
                    })
                })  
             }
            },
            selectImage(e){
                const file = e.target.files[0]
                this.image = file
                this.item.imageUrl = URL.createObjectURL(file)
            }
        }
    }

</script>

<style scoped>
.body {
  height: 100vh;
  position: relative;
  background-color:#F5F5F5
}

.form {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.create{
    width:300px; 
    background-color:#17A2B8; 
    color:white
}
.create:hover{
    color:#17A2B8;
    background-color:white;
    border: 1px solid #17A2B8
}
img{
    border: 1px solid #17A2B8;
    border-radius:50%
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