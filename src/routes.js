import Login from './components/Login'
import Signup from './components/Signup'
import Account from './components/Account'
import Allaccounts from './components/Allaccounts'
import Viewaccount from './components/Viewaccount'
import Landingpage from './components/Landingpage'



export default  [
    {path:'/', name:'home', component:Landingpage},
    {path:'/login', component:Login},
    {path:'/signup', component:Signup},
    {path:'/account', component:Account,beforeEnter(to, from, next) {
        let user = localStorage.getItem("user")
        if(user){
            next()
        }
        else{
            next({
                name: "home"
              });
        }
      }},
    {path:'/allaccounts', component:Allaccounts,beforeEnter(to, from, next) {
        let user = localStorage.getItem("user")
        if(user){
            next()
        }
        else{
            next({
                name: "home"
              });
        }
      }},
    {path:'/viewaccount/:id', component:Viewaccount,beforeEnter(to, from, next) {
        let user = localStorage.getItem("user")
        if(user){
            next()
        }
        else{
            next({
                name: "home"
              });
        }
      }}
]