<template>
    <div>

        <div class="accountdetails">
            <h5><b>Total Number of Accounts: <span class="details">{{accounts.length}}</span></b></h5>
            <h5><b>Inactive Accounts: <span class="details">{{accounts.length-activeAccounts.length}}</span></b></h5>
            <h5><b>Active Accounts: <span class="details">{{activeAccounts.length}}</span></b></h5>
            <h6><b>Logged in as:<i>{{user.firstname +" " +user.lastname}}</i></b></h6>
        </div>
        
        <div class="table table-striped table-responsiv table-bordere table-hover" style="width:90vw">
            <table>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Account Holder</th>
                        <th>Account Number</th>
                        <th>Account Balance</th>
                        <th>Date Created</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                <tr style="cursor:pointer" v-on:click="viewAccount(account.id)" v-for="(account,index) in accounts" v-bind:key="account.id">
                    <td><router-link v-bind:to="'/viewaccount/'+account.id">{{index+1}}</router-link></td>
                    <td><router-link v-bind:to="'/viewaccount/'+account.id">{{account.owner}}</router-link></td>
                    <td><router-link v-bind:to="'/viewaccount/'+account.id">{{account.accountnumber}}</router-link></td>
                    <td><router-link v-bind:to="'/viewaccount/'+account.id">{{account.balance}}</router-link></td>
                    <td><router-link v-bind:to="'/viewaccount/'+account.id">{{account.createdon}}</router-link></td>
                    <td><router-link v-bind:to="'/viewaccount/'+account.id"><button class="btn mr-1" style="background-color:#17A2B8; color:white">Transact <v-icon name="credit-card" style="width:20px; height:20px"></v-icon></button></router-link>
                    <button v-on:click="deactivate(account)" v-if="account.status=='active'" class="btn btn-danger" style="width:100px">deactivate</button><button class="btn btn-success" style="width:100px" v-on:click="activate(account)" v-if="account.status=='inactive'">activate</button></td>
                    <!-- <td><router-link v-bind:to="'/transactions/viewtransaction/'+account.id"><button>view transactions</button></router-link></td> -->
                </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>


<script>
export default {
    data(){
        return{
            accounts:[],
            selectedAccount:null,
            activeAccounts:[],
            user:JSON.parse(localStorage.getItem("user"))
        }
    },
    methods:{
        viewAccount(id){
            this.selectedAccount=this.accounts.find(x=>{return x.id==id})
        },
        getAccounts(){
            this.$http.get('http://localhost:3000/accounts')
            .then(data=>{
                console.log(data.body)
                this.accounts=data.body.data
                this.activeAccounts=this.accounts.filter(x=>{return x.status=="active"})})
        },
        deactivate(account){
            let acc = {
                accountid:account.id,
                status:'inactive'
            }
            this.$http.post('http://localhost:3000/transactions/deactivate',acc)
            .then(data=>{
                console.log(data)
                this.getAccounts()})
        },
        activate(account){
           let acc = {
                accountid:account.id,
                status:'active'
            }
            this.$http.post('http://localhost:3000/transactions/deactivate',acc)
            .then(data=>{
                console.log(data)
                this.getAccounts()}) 
        }
    },
    created(){
        // let getAccounts=()=>{
        //     this.$http.get('http://localhost:3000/accounts')
        //     .then(data=>{
        //         console.log(data.body)
        //         this.accounts=data.body.data
        //         this.activeAccounts=this.accounts.filter(x=>{return x.status=="active"})})
        // }
        // getAccounts()
        this.getAccounts()
    }
}

</script>

<style scoped>
.table{
    margin-top:50px;
    margin-left:auto;
    margin-right:auto
}
.accountdetails{
    background-color:rgb(232, 230, 235);
    margin-top:0px;
    padding-top:20px;
    padding-bottom:20px;
    border-bottom:1px solid #17A2B8
}
.details{
    color:#17A2B8
}
</style>