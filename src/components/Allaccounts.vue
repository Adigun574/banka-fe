<template>
    <div>

        <div class="accountdetails">
            <!-- <vc-donut
                background="white" foreground="grey"
                :size="200" unit="px" :thickness="30"
                hasLegend legendPlacement="top"
                :sections="sections" :total="100"
            >
                <h3>Total:{{accounts.length}}</h3>
            </vc-donut> -->
            <div class="form-row">
                <div class="form-group mt-4" style="width:60%; margin-right:auto; margin-left:auto">
                    <input type="search" placeholder="Type a search keyword" class="form-control searchInput" 
                    v-on:input="filterTable()" v-model="searchTerm">
                </div>
                <div class="form-group" style="width:30%; margin-right:auto; margin-left:auto; margin-top:25px">
                    <select class="form-control" v-model="filterType" v-on:change="filterTableByStatus">
                        <option>All Accounts</option>
                        <option>Active Accounts</option>
                        <option>Inactive Accounts</option>
                    </select>
                </div>
            </div>
        </div>

        <b-tabs content-class="mt-3" fill
                active-nav-item-class="activetabtitle"
                active-tab-class=""
                style="margin-top:20px"
                >
                <b-tab title="Transaction History" active>
                    <div class="table table-striped table-responsive table-bordere table-hover" 
                        style="width:100vw; border-lef:5px solid #17A2B8; margin-to:0; display:flex; justify-content:space-around
                        box-shadow:2px 2px 2px black">
                            <table>
                                <thead style="background-color:#17A2B8; color:white">
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
                                <tr style="cursor:pointer" v-on:click="viewAccount(account.id)" v-for="(account,index) in filteredAccounts" v-bind:key="account.id">
                                    <td><router-link v-bind:to="'/viewaccount/'+account.id">{{index+1}}</router-link></td>
                                    <td><router-link v-bind:to="'/viewaccount/'+account.id">{{account.owner}}</router-link></td>
                                    <td><router-link v-bind:to="'/viewaccount/'+account.id">{{account.accountnumber}}</router-link></td>
                                    <td><router-link v-bind:to="'/viewaccount/'+account.id">{{account.balance}}</router-link></td>
                                    <td><router-link v-bind:to="'/viewaccount/'+account.id">{{account.createdon}}</router-link></td>
                                    <td><router-link v-bind:to="'/viewaccount/'+account.id"><button class="btn mr-1" style="background-color:#17A2B8; color:white">Transact</button></router-link>
                                    <button v-on:click="deactivate(account)" v-if="account.status=='active'" class="btn btn-danger" style="width:100px">deactivate</button><button class="btn btn-success" style="width:100px" v-on:click="activate(account)" v-if="account.status=='inactive'">activate</button></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>  
                </b-tab>
                <b-tab title="Post Money">
                        <vc-donut
                            background="white" foreground="grey"
                            :size="200" unit="px" :thickness="30"
                            hasLegend legendPlacement="top"
                            :sections="sections" :total="100"
                        >
                        <h3>Total:{{accounts.length}}</h3>
                        </vc-donut>
                </b-tab>
                <b-tab title="Lorem ipsum">
                    <p>Lorem ipsum</p>
                </b-tab>
        </b-tabs>
    </div>
</template>


<script>
export default {
    data(){
        return{
            accounts:[],
            selectedAccount:null,
            activeAccounts:[],
            user:JSON.parse(localStorage.getItem("user")),
            sections: [
                { label: 'Inactive Accounts', value: null, color: '#DC3545' },
                { label: 'Active Accounts', value: null, color: '#28A745' },
            ],
            searchTerm:'',
            filteredAccounts:[],
            filterType:''
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
                this.filteredAccounts=data.body.data
                this.activeAccounts=this.accounts.filter(x=>{return x.status=="active"})
                this.sections[0].value=(this.accounts.length-this.activeAccounts.length)/this.accounts.length*100
                this.sections[1].value=this.activeAccounts.length/this.accounts.length*100
                this.sections[0].label=`Inactive Accounts(${this.accounts.length-this.activeAccounts.length})`
                this.sections[1].label=`Active Accounts(${this.activeAccounts.length})`
                })
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
        },
        filterTable(){
            console.log("searcterm",this.searchTerm)
            if(this.searchTerm==''){
                this.filteredAccounts=this.accounts
            }
            this.filteredAccounts=this.accounts.filter(account=>{return account.owner.toLowerCase().includes(this.searchTerm.toLowerCase())})
        },
        filterTableByStatus(){
            if(this.filterType=="Active Accounts"){
                this.filteredAccounts=this.accounts.filter(x=>{return x.status=="active"})
            }
            else if(this.filterType=="Inactive Accounts"){
                this.filteredAccounts=this.accounts.filter(x=>{return x.status=="inactive"})
            }
            else{
                this.filteredAccounts=this.accounts
            }
        }
    },
    created(){
        this.getAccounts()
        let getCredentials=()=>{
                if(localStorage.getItem('user')){
                    return true
                }
                else{
                    return false
                }
            }
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
    border-bottom:1px solid #17A2B8;
    display:fle;
    justify-content: space-aroun
}
.details{
    color:#17A2B8
}
.card{
    width:100%;
    border-left: 5px solid #17A2B8;
    box-shadow:2px 2px 2px rgb(185, 181, 181);
    font-weight:bold
}
.card-body{
   color:#17A2B8;
   font-size: 2rem 
}
.searchInput, select{
    border:2px solid #17A2B8
}
tr:nth-child(even){
    border-left:2px solid #17A2B8;
    border-right:2px solid #17A2B8
}
</style>