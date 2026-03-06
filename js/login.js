document.getElementById('login-btn').addEventListener('click',function(){
    const userName=document.getElementById('username');
    const passWord=document.getElementById('password');
    
    
    if(userName.value==='admin' &&passWord.value==='admin123'){
          
        window.location.assign('home.html');
         userName.value="";
        passWord.value="";
    }
    else{
        alert('invalid username or password');
    }
})