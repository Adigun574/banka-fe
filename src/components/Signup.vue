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
        <button type="subimt" class="btn signup" v-on:click="createUser">Signup</button>
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
    export default {
        data(){
            return {
                user: {
                    firstname:"Ibrahim",
                    lastname:"Adigun",
                    email:"test",
                    username:"adigun",
                    password:"0000",
                    img:''
                },
                password2 :'0000',
                passwordsMatch:false,
                item:{
                    image : null,
                    imageUrl: null
                }
            };
        },
        methods: {
            createUser(){
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
                        imgUrl:null
                    }
                    let url = 'http://localhost:3000/users/add'
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
                            console.log(res)
                            console.log(newUser)
                            this.newUser.imgUrl=res.data.secure_url
                            this.$http.post(url,newUser)
                            .then(data=>{console.log(data)
                                $bvToast.show('example-toast')
                            })
                            .catch(err=>{
                                $bvToast.show('example-toast2')
                            })
                        })
                        .catch(err=>{console.log(err)
                            $bvToast.show('example-toast2')
                        })
                    }
                    else{
                      this.$http.post(url,newUser)
                      .then(data=>{console.log(data)})  
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
</style>
    
