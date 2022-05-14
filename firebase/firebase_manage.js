import firebase from './firebase.js'
import { query, where, limit, getFirestore, collection, doc, addDoc, setDoc, getDocs, getDoc } from "firebase/firestore";


const addNewUser = async ( user) => { 
    const db = getFirestore(); 

    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        created_date: new Date(),
        updated_date: new Date()
    }) 
}


const addImage = async ( imageData, uid) => { 
    const db = getFirestore(); 
    // images/all_user_images/uid/randomIDFirebase/{created_date, updated_date}
    const imagesRef = doc(db, "images", 'all_user_images');
    await addDoc(collection(imagesRef, uid), { 
        image: imageData, 
        created_by: uid,
        created_date: new Date(),
        updated_date: new Date() 
    }) 
}


const getAllImage = async ( uid) => { 
    const result = [] 
    const db = getFirestore(); 
    const queryImages = query(collection(db, "images", 'all_user_images', uid), where("created_by", "==", uid));
    const querySnapshot = await getDocs(queryImages);
    querySnapshot.forEach((doc) => { 
        result.push(doc.data());
    }); 

    return result
}


const addPost = async ( postData, uid) => { 
    const db = getFirestore();
    const newCityRef = doc(collection(db, "blog"));

    await setDoc(newCityRef, {  
        document_id: newCityRef.id,
        title: postData.title,
        paragraph: postData.paragraph, 
        created_by: uid,
        created_date: new Date(),
        updated_date: new Date() 
    }); 
}

const getUserPosts = async ( uid) => { 
    const result = []
    const db = getFirestore();  
    
    const queryPosts = query(collection(db, "blog"), where("created_by", "==", uid));
    const querySnapshot = await getDocs(queryPosts); 
    querySnapshot.forEach((doc) => {  
        result.push(doc.data());
    });

    return result 
}


const getAllPosts = async ( ) => { 
    const result = []
    const db = getFirestore(); 

    const queryPosts = query(collection(db, "blog") );
    const querySnapshot = await getDocs(queryPosts);  
    querySnapshot.forEach((doc) => {  
        result.push(doc.data());
    }); 

    return result 
}


const getPostById = async ( document_id ) => { 
    var result = {}
    const db = getFirestore(); 

    const queryPosts = query(collection(db, "blog"), where("document_id", "==", document_id), limit(1)); 
    const querySnapshot = await getDocs(queryPosts);  
    querySnapshot.forEach((doc) => {  
        result = doc.data()
    }); 

    return result 
}


export default {
    addNewUser,
    addImage,
    getAllImage,
    addPost,
    getUserPosts,
    getAllPosts,
    getPostById
}
