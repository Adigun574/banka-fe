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
    export default{
        data(){
            return{
                account:{
                    firstname:"",
                    lastname:"",
                    openingbalance:"",
                    type:"",
                    email:""
                },
                item:{
                    image : null,
                    imageUrl: null
                },
                imgUrl:null

            }
        },
        methods:{
            post(){
             let account = {
                 firstname:this.account.firstname,
                 lastname:this.account.lastname,
                 balance:parseInt(this.account.openingbalance),
                 type:this.account.type,
                 email:this.account.email,
                 imgUrl:null,
                 password:null
             }
             console.log(account)
             let url = 'http://localhost:3000/accounts/add'
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
                    //this.imgUrl=res.data.secure_url
                    account.imgUrl=res.data.secure_url
                    console.log(res)
                    console.log(account)
                    console.log("image url",res.data.secure_url)                    
                    this.$http.post(url,account)
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
                this.$http.post(url,account)
                .then(data=>{
                    console.log(data)
                    $bvToast.show('example-toast')
                })
                .catch(err=>{
                    $bvToast.show('example-toast2')
                })  
             }
                    // this.$http.post(url,account)
                    // .then(data=>{
                    //     console.log(data)
                    //     $bvToast.show('example-toast')
                    // })
                    // .catch(err=>{
                    //     $bvToast.show('example-toast2')
                    // })
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
</style>