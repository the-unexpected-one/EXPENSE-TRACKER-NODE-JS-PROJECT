function login(event){
    event.preventDefault();
    const emailid=event.target.emailid.value;
    const password=event.target.password.value;
    const obj={
        emailid,
        password
    }
    axios.post("http://localhost:8000/login",obj).then((res)=>{
        alert('Logged in Succesfully')
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
}