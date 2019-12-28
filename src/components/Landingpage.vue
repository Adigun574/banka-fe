<template>
    <div class="body">
        <!-- <div class="content">
            <h3 class="banka"><strong>BANKA</strong></h3>
            <h3 class="text">{{fullText}}<span class="cursor"></span></h3>
            <h3 class="login" v-on:click="goToLogin"><strong>Login <v-icon name="send" style="width:20px; height:20px"></v-icon></strong></h3>
       </div> -->
       <div id="parent">
            <div id="child">
                <h3 class="banka"><strong>BANKA</strong><span class="cursor">|</span></h3>
                <h3 class="login" v-on:click="goToLogin"><strong>Login <v-icon name="send" style="width:20px; height:20px"></v-icon></strong></h3>
            </div>
        </div>
    </div>
</template>


<script>

export default {
    data(){
        return{
            text:"",
            fullText:"Your number one app for managing banking transactions."
        }
    },
    methods:{
        animateText(){
            let i = 0
            setInterval(()=>{
                if(i<this.fullText.length){
                    this.text+=this.fullText.charAt(i)
                    i++
                }
            },100)
        },
        goToLogin(){
            this.$router.push('login')
        }
    },
    created(){
        this.animateText()
        //alert("username:test,password:7030")
    }
}

</script>

<style scoped>

#parent {
  /* height: 200px; */
  height: 80vh;
  position: relative;
}

#child {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.content {
  height: 10vh;
  position: relative;
  top:15vh
}

.form {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.body{
    /* background-image: url('../assets/wallet.png'); */
    background-image: url('../assets/image3.jpg');
    height:92vh;
}
.body::after {
  content: "";
  background: url('../assets/image3.jpg');
  opacity: 0.7;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;   
}
.banka{
    font-size: 3rem;
    color:#17A2B8;
    width:5em;
    margin-left:auto;
    margin-right:auto;
    text-shadow: 2px 2px 2px red;
    font-family:courier,arial,helvetica;
}
.banka:hover{
    color:white;
    text-shadow: 2px 2px 2px #17A2B8
}
.login{
    color:white;
    background-color: rgb(6, 216, 6);
    cursor: pointer;
    width:6em;
    margin-left:auto;
    margin-right:auto;
    border-radius:10px;
    padding:0.5rem 1rem;
    border: 1px solid white
}
.login:hover{
    color:rgb(6, 216, 6);
    background-color: white;
    border: 1px solid rgb(6, 216, 6)
}

.cursor{
    animation: blink 0.5s linear 1s infinite alternate-reverse;
}

.text{
    color:white;
    width:30vw;
    margin:1em auto;
    text-shadow: 2px 2px 1px black;
    text-align: center
}
.text:hover{
    color:black;
    width:30vw;
    margin:1em auto;
    text-shadow: 2px 2px 1px white;
    text-align:center;
}

@keyframes blink{
    from{
        opacity:1
    }
    to{
        opacity:0
    }
}

@-webkit-keyframes blink {
  from{
      opacity:1
  }
  to{
      opacity:0
  }
}

.router-link{
    text-decoration:none
}


</style>
    
