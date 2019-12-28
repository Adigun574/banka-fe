<template>
  <div style="padding-top:20px">
    <md-steppers>
      <md-step id="first" md-label="Step One">
          <div class="well">
            <h3 class="underline">Staff</h3>
            Ask the admin to create an account for you.<br>
            <hr>
            <h3 class="underline">Customer</h3>
            Click on customer signup and create an account. Go to the bank to complete your registration.
          </div>
      </md-step>

      <md-step id="second" md-label="Step Two">
        <div class="well">
          <h3 class="underline">Staff</h3>
          Login with your credentials and start carrying out transactions!!!<br>
          <hr>
          <h3 class="underline">Customer</h3>
          Login with your credentials to view your transactions!!!
        </div>
      </md-step>
    </md-steppers>
  </div>
</template>

<script>
  export default {
    name: 'StepperHorizontal'
  }
</script>

<style #scoped>
.well{
    background-color:rgb(204, 200, 200);
    color:#17A2B8;
    height:60vh;
    width:60vw;
    padding:20px;
    margin-right:auto;
    margin-left:auto;
    margin-top:30px;
    font-size:15px;
    border-radius:10px;
}
.underline{
  text-decoration: underline
}

</style>