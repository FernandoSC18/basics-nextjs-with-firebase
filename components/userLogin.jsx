import React, {useState} from 'react' 
import firebaseAuth from '../firebase/firebase_auth.js';
import firebaseManage from '../firebase/firebase_manage.js';
 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,  
     Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap'; 


export default function UserLogin({loginType}) { 

    const [showRegistrer, setShowRegistrer] = useState(loginType)
    
    const [logEmail, setLogEmail] = React.useState('')    
    const [logPass, setLogPass] = React.useState('')
 
    const [regEmail, setRegEmail] = React.useState('')
    const [regPass, setRegPass] = React.useState('') 

    
    const modalStyle = {
        width: '500px',
        maxWidth: '90%',
        maxHeight: '50vh', 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'auto',
        boxShadow: '0px 0px 50px 0px #999999', 
    }

    
    return <>  
        {showRegistrer !== 'registrer' ? <div style={modalStyle}> 
            <ModalHeader >
                Iniciar sesión
            </ModalHeader> 
            <ModalBody>
                <Form >
                    <FormGroup>
                        <Label> Email </Label>
                        <Input placeholder="write your email here" 
                        type="email" value={logEmail}
                        onChange={(e) => setLogEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label> Password </Label>
                        <Input placeholder="write your password here" 
                        type="password" value={logPass} 
                        onChange={(e)=> setLogPass(e.target.value)}
                        />
                    </FormGroup>    
                    <Button color="primary" onClick={async ()=> {
                        const {error, user} = await firebaseAuth.signWithEmail(logEmail, logPass)
                        
                        if (error){
                            console.log(error)
                            alert('error: ', error)
                        } 
                    }}>
                        Submit
                    </Button>
                    {' '}
                    <Button onClick={()=> setShowRegistrer('registrer')}>
                        Registrarse
                    </Button>

                </Form > 
            </ModalBody>
         </div> : null} 
        
        {showRegistrer === 'registrer' ? <div style={modalStyle}>
            <ModalHeader >
                Registrarse con correo
            </ModalHeader>
            <ModalBody>
                <Form >
                    <FormGroup>
                        <Label> Email </Label>
                        <Input placeholder="Write your email here"
                        type="email" value={regEmail} 
                        onChange={(e)=> setRegEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label> Password </Label>
                        <Input placeholder="Write your password here" 
                        type="password" value={regPass} 
                        onChange={(e)=> setRegPass(e.target.value)}
                        />
                    </FormGroup>   
                    <Button color="primary" onClick={async ()=> { 
                        const {user, error} = await firebaseAuth.registrerWithEmail(regEmail, regPass)                    
     
                        if(error != null){
                            console.log('error', error)
                            alert('error: ', error)
                        }else{  
                            await firebaseManage.addNewUser( user)
                            
                            var url = window.location.href;    
                            if (url.indexOf('?') > -1){
                                url = url.substring(0, url.indexOf('?') ) 
                            } 
                            url += '?loginType=login' 
                            window.location.href = url;
                        } 
    

                    }}>
                        Submit
                    </Button>
                    {' '}
                    <Button onClick={()=> setShowRegistrer('login')}>
                        Iniciar sesion
                    </Button>
                </Form> 
            </ModalBody>
        </div> : null
        }
    </>

}