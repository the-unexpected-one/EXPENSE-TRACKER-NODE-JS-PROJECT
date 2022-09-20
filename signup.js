function onSubmit(event){
    event.preventDefault();
    const name=event.target.name.value;
    const emailid=event.target.emailid.value;
    const password=event.target.password.value;
    const obj={
        name,
        emailid,
        password
    }
   
    axios.post("http://localhost:8000/signUp",obj).then(res=>{
        console.log(res.status)
       //abhi response aa nhi raha
    }).catch(err=>{
        console.log(err)
        // alert("User exists")
        if(err.response.status==404){
            alert("User exists")
        }
        
    })
}