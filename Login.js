import React from 'react';

const Login = (props) => {
    const {email, setEmail, password, setPassword, handleLogin,handleSignup,
         fullname, setFullName, numtele, adresse ,setAdresse , setNumTele,
         hasAccount, setHasAccount, emailError, passwordError} = props ;

    return(
        <section className="login">
         <div className="loginContainer">

            <label>UserEmail</label>
            <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
            <p className="errorMsg">{emailError}</p>

            <label>Password</label>
            <input type="text" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} />
            <p className="errorMsg">{passwordError}</p>

            <label>FullName</label>
            <input type="text" autoFocus  value={fullname} onChange={(e) => setFullName(e.target.value)} />
            <p className="">(not necessary to sign in)</p>

            <label>Numero de telephone</label>
            <input type="text" autoFocus  value={numtele} onChange={(e) => setNumTele(e.target.value)} />
            <p className="">(not necessary to sign in)</p>

            <label>Adresse</label>
            <input type="text" autoFocus  value={adresse} onChange={(e) => setAdresse(e.target.value)} />
            <p className="">(not necessary to sign in)</p>
            

            <div className="btnContainer">
                {hasAccount ? (
                  <>
                  <button onClick={handleLogin}>Sign in</button>
                  <p>don't have an account ?
                  <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
                  </p>
                  </>
                ) : (
                  <>
                  <button onClick={handleSignup}>Sign up</button>
                  <p>have an account ?
                  <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
                  </p>
                  </>  
                )}
            </div>
         </div>
        </section>
    )
}

export default Login;