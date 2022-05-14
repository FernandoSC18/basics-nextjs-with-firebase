
const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file );
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
}); 
 
const base64toBlob = (base64Data) => { 
    
    const arr = base64Data.split(',')
    const mime_type = arr[0].match(/:(.*?);/)[1]
    const decodedStr = window.atob(arr[1])
    const size = decodedStr.length
    var bytesArray = new Uint8Array(size);
        
    while(size--){
        bytesArray[size] = decodedStr.charCodeAt(size);
    }
    
    return new File([bytesArray], null, {type:mime_type});
}


export default {
    getBase64,
    base64toBlob
}