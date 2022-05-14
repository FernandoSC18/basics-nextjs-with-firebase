import firebase from './firebase.js'
import { getAuth
    , signOut
    , onAuthStateChanged
    , signInWithEmailAndPassword
    , createUserWithEmailAndPassword  
} from "firebase/auth";


const registrerWithEmail = async (email, password) => {
    const auth = getAuth(); 
    return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => { 
        const user = userCredential.user;  
          
        return { user }
    }).catch((error) => { 
        const errorCode = error.code;
        const errorMessage = error.message;  
        return { 
            error: errorCode + ': ' + errorMessage
        }
    })

}


const signWithEmail = async (signInEmail, signInPassword) => { 
    const auth = getAuth();
    
    return signInWithEmailAndPassword(auth, signInEmail, signInPassword)
    .then((userCredential) => {  
        const user = userCredential.user; 
        return { user }
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error: ', errorCode + ': ' + errorMessage) 
        return { 
            error: errorCode + ': ' + errorMessage
        }
    })

}


const signOutUser = async () => {  
    const auth = getAuth();
    return signOut(auth).then(() => { 
        return {
            suscess: true
        }
      }).catch((error) => { 
        return {
          error
        }
      })

}

 
const authState = async (userFnc) => {
    const auth = getAuth();
    onAuthStateChanged(auth, userFnc); 
}

const getCurrentUser = () => { 
    const auth = getAuth();
    const user = auth.currentUser; 
    return user 
 }

 
export default { 
    registrerWithEmail,
    signWithEmail,
    signOutUser,
    getCurrentUser,
    authState
}