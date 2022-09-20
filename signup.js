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
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
}