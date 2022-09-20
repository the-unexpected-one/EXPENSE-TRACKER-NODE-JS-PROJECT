function login(event){
    event.preventDefault();
    const emailid=event.target.emailid.value;
    const password=event.target.password.value;
    const obj={
        emailid,
        password
    }
    axios.post("http://localhost:8000/login",obj).then((res)=>{
        alert(res.data.message)
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