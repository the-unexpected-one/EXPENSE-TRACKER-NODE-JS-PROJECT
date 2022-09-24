function forgotPass1(event){
    
    event.preventDefault()
    const email=event.target.input.value;
    console.log(email)
    const obj={email:email}
    axios.post('http://localhost:8000/password/forgotpassword',obj)
    .then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
}