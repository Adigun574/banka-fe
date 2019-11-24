<template>
    <div>
        <div style="display:flex; justify-content:center" class="accountdetails">
            <img v-bind:src="account.imgurl" width="100px" height="100px" class="ml-2">
            <div style="width:100%; margin-left:auto; margin-right:auto">
                <b class="key">Account Number: </b><b class="details">{{account.accountnumber}}</b> || 
                <b class="key">Account Name: </b><b class="details">{{account.owner}}</b><br>
                <b class="key">Account Balance: </b><b class="details">N{{account.balance}}.00</b>  ||   
                <b class="key">Type: </b><b class="details">{{account.type}}</b><br>
                <b class="key">Status: </b><b class="details">{{account.status}}</b>  ||
                <b class="key">Date-Time Created: </b><b class="details">{{account.createdon}}</b><br>
                <b-button v-b-modal.modal-center class="btn btn-danger">Delete this account</b-button>

            </div>
        </div>   
        <div>
            <b-tabs content-class="mt-3" fill
                active-nav-item-class="activetabtitle"
                active-tab-class=""
                style="margin-top:20px"
                >
                <b-tab title="Transaction History" active>
                    <div class="account">
                        <div class="table table-striped table-responsive table-bordere table-hover accounttable">
                            <table>
                                    <thead>
                                    <tr>
                                        <th>S/N</th>
                                        <th>Type</th>
                                        <th>Amount</th>
                                        <th>Cashier</th>
                                        <th>Old balance</th>
                                        <th>New balance</th>
                                        <th>Sender</th>
                                        <th>Date/Time</th>
                                    </tr>
                                    </thead>
                                <tbody>
                                <tr v-for="(transaction,index) in transactions" v-bind:key="transaction.id">
                                    <td>{{index+1}}</td>
                                    <td>{{transaction.type}}</td>
                                    <td>{{transaction.amount}}</td>
                                    <td>{{transaction.cashier}}</td>
                                    <td>{{transaction.oldbalance}}</td>
                                    <td>{{transaction.newbalance}}</td>
                                    <td>{{transaction.sender}}</td>
                                    <td>{{transaction.datetime}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>                    
                </b-tab>
                <b-tab title="Post Money">
                    <div class="body">
                        <div class="form">
                            <div class="form-group" style="display:flex; margin-left:70px">
                            <label class="form-label">Debit:</label>
                            <input type="radio" name="transaction" v-model="transactionType" value="Debit" class="form-control mr-2" style="height:25px; width:25px">
                            <label class="form-label">Credit:</label>
                            <input type="radio" name="transaction" v-model="transactionType" value="Credit" class="form-control mr-2" style="height:25px; width:25px">
                            </div>
                            <div class="form-group">
                            <label class="form-label"><b>Amount:</b></label>
                            <input class="form-control" type="number" v-model="amount">
                            </div>
                            <div class="form-group" v-if="transactionType=='Credit'">
                            <label class="form-label"><b>Sender:</b></label>
                            <input class="form-control" type="text" v-model="transaction.sender">
                            </div>
                            <button type="submit" class="btn post" v-on:click="post" :disabled="account.status!=='active'">Post <v-icon name="send" style="width:20px; height:20px"></v-icon></button>
                        </div>
                    </div>
                </b-tab>
                <b-tab title="Lorem ipsum">
                    <p>Lorem ipsum</p>
                </b-tab>
                <!-- <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab> -->
            </b-tabs>
        </div>

                
    <!--delete modal-->
        <div>
            <b-modal id="modal-center" centered title="DeleteAccount!!!">
            <p class="my-4">Are you sure you want to delete this account?</p>
            <div slot="modal-footer">
                <div style="display:flex"><button @click="deleteAccount" class="btn btn-danger  mr-2" style="width:13.5em; float:left">Yes</button>
                <button @click="hideModal" class="btn btn-secondary ml-2" style="width:13.5em; float-right">No</button></div>
            </div>
            </b-modal>
        </div>
        
        
        <div>
  
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return{  
            account:{
                owner:'',
                balance:'',
                type:'',
                status:'',
                createdon:'',
                accountnumber:''
            },
            amount:null,
            transactionType:"Debit",
            transaction:{
                cashier:null,
                type:this.transactionType,
                accountnumber:null,
                amount:this.amount,
                oldbalance:null,
                newbalance:null,
                sender:null
            },
            transactions:[],
            user:JSON.parse(localStorage.getItem('user'))
        }
    },
    methods:{
       post(){
           let newbal = null
           if(this.transactionType==="Debit"){
               newbal=parseInt(this.account.balance)-parseInt(this.amount)
           }
           else if(this.transactionType==="Credit"){
               newbal=parseInt(this.account.balance)+parseInt(this.amount)
           }
           let transaction = {
               cashier:`${this.user.firstname} ${this.user.lastname}`,
               type:this.transactionType,
               accountnumber:this.account.accountnumber,
               amount:parseInt(this.amount),
               oldbalance:parseInt(this.account.balance),
               newbalance:newbal,
               sender:this.transaction.sender,
               accountid:this.account.id
           }
           this.transaction.type=this.transactionType
           this.transaction.accountnumber=this.account.accountnumber
           this.transaction.balance=this.account.balance
           this.transaction.amount=this.amount
           this.oldbalance=this.account.balance
           console.log(transaction)
           let url = 'http://localhost:3000/transactions/add'
                    this.$http.post(url,transaction)
                    .then(data=>{console.log(data)})
       },
       deleteAccount(){
         let url = 'http://localhost:3000/accounts/deleteaccount'
         let accounttobedeleted ={
             id:this.account.id
         }
         this.$http.post(url,accounttobedeleted)
         .then(data=>{
            console.log(data)
            this.$router.push('/allaccounts')
            this.$bvModal.hide('modal-center')
         })
         .catch(err=>{
             console.log(err)
         })  
       },
       hideModal() {
        this.$bvModal.hide('modal-center')
      }
    },
    beforeCreate(){
        let id = this.$route.params.id
        let getSingleAccount=()=>{
            this.$http.get(`http://localhost:3000/accounts/${id.toString()}`)
            .then(data=>{console.log("account",data)
            this.account = data.body.data[0]})
        }
        getSingleAccount()
        let viewTransactions=()=>{
            this.$http.get(`http://localhost:3000/transactions/viewtransaction/${id.toString()}`)
            .then(data=>{
                console.log("transactions",data)
                this.transactions=data.body.data
                }) 
        }
        viewTransactions()
    }
}

</script>

<style scoped>
.details{
    color:rgb(39, 171, 247)
}
.accountdetails{
    background-color:rgb(232, 230, 235);
    margin-top:0px;
    padding-top:20px;
    padding-bottom:20px;
    border-bottom:1px solid #17A2B8
}
.body {
  height: 50vh;
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

.accounttable {
  width:90vw;
  margin-left:auto;
  margin-right:auto;
}
.activetabtitle{
    color:white;
    background-color:#17A2B8;
    border-radius:5px
}
.active-nav-item-class{
    color:white;
    background-color:#17A2B8;
    border-radius:5px
}
.post{
    width:300px; 
    background-color:#17A2B8; 
    color:white
}
.post:hover{
    color:#17A2B8;
    background-color:white;
    border: 1px solid #17A2B8
}
</style>