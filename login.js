function login(event){
    event.preventDefault();
    const emailid=event.target.emailid.value;
    const password=event.target.password.value;
    const obj={
        emailid,
        password
    }
    axios.post("http://localhost:8000/login",obj)
    .then((res)=>{

        alert(res.data.message)
        const token=res.data.token;
        localStorage.setItem('token',token);

        location.replace('/addexpense.html')
        console.log(res)
    }).catch(err=>{

        console.log(err)

        if(err.response.status==401){

            alert(err.response.data.message)
        }
        else if(err.response.status==404){
            alert(err.response.data.message)
        }
        else{
            console.log(err)
        }
        
    })
}

function forgot(){
    
    const forgotpassul=document.getElementById('forgotPass')
    const div=document.createElement('div')
    div.setAttribute('id','formDiv');
    const form=document.createElement('form');
    const inputtag=document.createElement('input');
    const labelTag=document.createElement('label');
    labelTag.setAttribute('for','input');
    inputtag.setAttribute('id','input');
    inputtag.setAttribute('type','email')
    labelTag.innerHTML="Enter E-mail Id";
    form.appendChild(labelTag);
    form.appendChild(inputtag);
    div.appendChild(form);
    forgotpassul.appendChild(div)

}