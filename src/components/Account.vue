<template>
    <div>
        <div class="body">
            <div class="form">
                <img src="../assets/avatar.png" v-if="!item.imageUrl" width="150px" height="150px">
                <img v-if="item.imageUrl" :src="item.imageUrl" width="150px" height="150px" style="border-radius:50%"/>
                <!-- <img src="../assets/wallet.png" width="250px" height="150px"> -->
                <div class="form-group">
                    <input class="form-control" type="text" v-model="account.firstname" placeholder="Firstname">
                </div> 
                <div class="form-group">
                    <input class="form-control" type="text" v-model="account.lastname" placeholder="Lastname">
                </div>  
                <div class="form-group">
                    <input class="form-control" type="number" v-model="account.openingbalance" placeholder="Opening Balance">
                </div>
                <div class="form-group">
                    <input class="form-control" type="email" v-model="account.email" placeholder="email">
                </div>     
                <div class="form-group">
                    <select class="form-control" v-model="account.type">
                    <option>Savings</option>
                    <option>Current</option>
                    </select>
                </div>
                <div class="form-group">
                    <!-- <label class="form-label">Select Account Picture</label><br> -->
                    <input type="file" accept="image/*" @change="selectImage"/>
                </div>
                <button type="subimt" class="btn create" v-on:click="post">Create</button>
            </div>
        </div>             

        


    </div>
</template>


<script>
    export default{
        data(){
            return{
                account:{
                    firstname:"Ibrahim",
                    lastname:"Adigun",
                    openingbalance:"100000",
                    type:"Savings",
                    email:"adigunibrahim574@gmail.com"
                },
                item:{
                    image : null,
                    imageUrl: null
                }

            }
        },
        methods:{
            post(){
             let account = {
                 firstname:this.account.firstname,
                 lastname:this.account.lastname,
                 balance:parseInt(this.account.openingbalance),
                 type:this.account.type,
                 email:this.account.email
             }
             console.log(account)
             let url = 'http://localhost:3000/accounts/add'
                    this.$http.post(url,account)
                    .then(data=>{console.log(data)})
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