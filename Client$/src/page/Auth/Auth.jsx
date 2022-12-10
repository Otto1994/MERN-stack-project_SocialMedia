import React ,{useState}from "react";
import './Auth.css'
import logo from "../../img/logo.png"
import {useDispatch,useSelector} from 'react-redux'
import { logIn, signUp } from "../../actions/AuthAction";
const Auth = ()=>{
    const dispatch=useDispatch()
    const loading=useSelector((state)=>state.AuthReducer.loading)
    const [isSignUp,setIsSignUp] = useState(false)
    console.log(loading)
    const [data,setData]=useState({nom:"",prenom:"",email:"",password:"",confirmpassword:""})
    const handleChange =(e)=>{
        setData({...data,[e.target.name]:e.target.value})}
    const [confirmPass,setConfirmPass]=useState(true)

    const resetForm =(e)=>{
        setConfirmPass(true)
        setData({nom:"",prenom:"",email:"",password:"",confirmpassword:""})}

    const handleSubmit =(e)=>{
        e.preventDefault()
        if(isSignUp){ 
            data.password===data.confirmpassword ? dispatch(signUp(data)):setConfirmPass(false);
        }else{
            dispatch(logIn(data))
        }
    }
    
return(
    <div className="Auth">
       <div className="a-left">
          <img src={logo} alt="" />
          <div className="Webname">
          <h1>Otto Code</h1>
           <h6>Faites découvrir le monde en un seul clique</h6>
       </div>
       </div>
       
       <div className="a-right">
    <form action="" className="infoForm authForm" onSubmit={handleSubmit}>
        <h3>{isSignUp ? "Créer un compte":"Connexion"}</h3>
       { isSignUp &&
         <div>
         <input type="text" className="infoInput" name="nom" id="" placeholder="Nom" onChange={handleChange} />
         
         <input type="text" className="infoInput" name="prenom" id="" placeholder="Prénom" onChange={handleChange}  />
         </div>
       }
        <div>
       <input type="email" className="infoInput" name="email" id="" placeholder="Adresse E-mail" onChange={handleChange} value={data.email} />
       </div>
        
        <div>
        <input type="password" className="infoInput" name="password" id="" placeholder="Mot de passe" onChange={handleChange} value={data.password}  />
       {  isSignUp &&
            <input type="password" className="infoInput" name="confirmpassword" id="" placeholder="Confirmer votre mot de passe" onChange={handleChange}  />

       }        
        </div>
       {
        isSignUp &&
        <span style={{display:confirmPass? "none":"block",fontSize:"11px",color:"red",alignSelf:"flex-end",marginRight:"5px"}}>
        Les mots de passe saisis ne sont pas identiques
        </span>
       } 
        <div >
            <span style={{fontSize:"12px"}}>{ isSignUp ? "Vous avez déjà un compte ? ":"Vous n'avez pas de compte? " }
            <a href="#" style={{textDecoration:"none"}} onClick={()=>{setIsSignUp((prev)=>!prev);resetForm()}}>{ isSignUp ? "Se connecter":"S'inscrire"}</a></span>
        </div>
        <button className="button infoButton" type="submit" disabled={loading}> {
        loading?"Chargement": isSignUp ? "S'inscrire":"Se connecter" }</button>
    </form>
</div>
 
    </div>
)
}

export default Auth