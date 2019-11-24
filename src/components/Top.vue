<template>
    <div>

<div>
            <b-navbar toggleable="lg" type="dark" variant="info">
                <b-navbar-brand>Banka</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                <!-- <b-navbar-nav>
                    <b-nav-item href="#">Link</b-nav-item>
                    <b-nav-item href="#" disabled>Disabled</b-nav-item>
                </b-navbar-nav> -->

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search" type="search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>

                    <b-nav-item-dropdown text="User" right>
                    <b-dropdown-item><router-link to="/login" exact class="links">Login</router-link></b-dropdown-item>
                    <hr>
                    <!-- <b-dropdown-item><router-link to="/signup" exact class="links">Create User</router-link></b-dropdown-item> -->
                    <!-- <hr> -->
                    <b-dropdown-item v-on:click="logout"><router-link to="/" exact class="links">Logout</router-link></b-dropdown-item>
                    </b-nav-item-dropdown>

                    <!-- <b-nav-item-dropdown right> -->
                    <!-- Using 'button-content' slot -->
                    <!-- <template v-slot:button-content>
                        <em>User</em>
                
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown> -->
                        <b-nav-item><router-link to="/customersignup" exact><span class="navitem">Customer signup</span></router-link></b-nav-item>
                        <b-nav-item><router-link to="/signup" exact><span class="navitem">Create User</span></router-link></b-nav-item>
                        <b-nav-item><router-link to="/account" exact><span class="navitem">Create Account</span></router-link></b-nav-item>
                        <b-nav-item><router-link to="/allaccounts" exact><span class="navitem">All Accounts</span></router-link></b-nav-item>
                </b-navbar-nav>
                </b-collapse>
            </b-navbar>
</div>

        <!-- <h1>Banking App</h1>
        <nav>
            <ul>
                <li><router-link to="/" exact>login</router-link></li>
                <li><router-link to="/signup" exact>signup</router-link></li>
                <li><router-link to="/account" exact>account</router-link></li>
                <li><router-link to="/allaccounts" exact>allaccount</router-link></li>
                <li><router-link to="/viewaccount/:id" exact>viewaccount</router-link></li>
            </ul>
        </nav> -->

    </div>
</template>


<script>
    export default{
        methods:{
            logout(){
                localStorage.removeItem('user')
                this.$router.push('/')
                this.getCredentials()
            },
        },
        created(){
        }
    }

</script>

<style scoped>
    /* h1{
        color:white;
        background-color: black}
    li{
        display:inline-block;
        margin-right:5px
    } */
    .router-link{
        text-decoration: none !important
    }
    .router-link-active{
        background-color:#6C757D;
        color:white;
        padding:6px 5px;
        border-radius:5px;
        text-decoration:none
    }
    .navitem{
        color:white;
        text-decoration:none !important
    }
    .links{
        color:#17A2B8 !important
    }
    .links:hover{
        color:white !important;
        background-color:#17A2B8 !important;
        padding:5px;
        text-decoration: none !important;
        border-radius:5px
    }
</style>
    
