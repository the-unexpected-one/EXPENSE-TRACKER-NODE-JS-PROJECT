window.addEventListener("DOMContentLoaded",()=>
{
    const token=localStorage.getItem('token')
   axios.get("http://localhost:8000/expenses",{headers: {'Authorization':token}})
   .then((response)=>{
       console.log(response)
       for(var i=0;i<response.data.length;i++){
           printExpenses(response.data[i])
       }
   }).catch((err)=>{
       document.body.innerHTML="<h4>Something went wrong<h4>"
       console.log(err)})

       axios.get("http://localhost:8000/leaderboard",{headers: {'Authorization':token}})
       .then(res=>{
        if(res.data!='Nothing to show'){
            const division=document.getElementById("division")
            const unorder=document.getElementById("header");
            const head=document.createElement('h1');
            // head.setAttribute(style="text-align:center")
            head.innerHTML="Leaderboard";
            head.setAttribute("style","text-align:center;color:white")
            // head.setAttribute("style","color:yellow")

            unorder.prepend(head)
            const arr=Object.keys(res.data)
            for(let i=0;i<arr.length;i++){
                const ID =arr[i]
                // console.log(id)
                const addboard=document.createElement("li");
                const button=document.createElement("button")
                addboard.setAttribute('id','button');
                button.setAttribute('onclick',`userData(${ID})`)
                button.setAttribute('style','background-color:white; color:black; margin:1px;border-radius:3px; border-color:black')
                
                button.innerHTML=`${arr[i]}:${res.data[arr[i]]}`;
               
                addboard.appendChild(button)
                unorder.appendChild(addboard);
            }
        }
        
       })
       .catch(err=>{
        console.log(err)
       })
}

)
function userData(id){
    axios.get(`http://localhost:8000/userData/${id}`)
    .then(res=>{
        const userDetails=document.getElementById('user')
        user.innerHTML="";
        const H1tagUserDetails=document.createElement('h3');
        H1tagUserDetails.setAttribute('style','color:black')
        H1tagUserDetails.innerHTML=`User ${id} details`;
        user.appendChild(H1tagUserDetails)
        for(let i=0;i<res.data.length;i++){
            
            const user=document.createElement('li')
            user.setAttribute('style','color:black');
            const id=res.data[i].id;
            const amount=res.data[i].amount;
            const category=res.data[i].category;
            user.innerHTML=`id=${id} amount=${amount} category=${category}`
            userDetails.appendChild(user)

        }
    })
    .catch(err=>{
        console.log(err)
    })
}



function printExpenses(exp){
    let formNODE = document.getElementById("formList");
    // console.log(exp)
    // let p=exp.amount;
    // console.log(p)
    let childNODE=`<li id=${exp.id} style="color:black">${exp.amount}-${exp.category}-${exp.description}<button onclick=deleteUser('${exp.id}') style="background-color:white;color:black;margin:5px; border-radius:3px; border-color:black">Delete expenses</button><button onclick=editUser('${exp.id}','${exp.amt}','${exp.cat}','${exp.man}') style="background-color:white;color:black;margin:5px; border-radius:3px; border-color:black">Edit expenses</button></li>`
console.log(childNODE)
    formNODE.innerHTML=formNODE.innerHTML+childNODE;
    

}  

function addExpense(event){
    // alert("Helo")
    event.preventDefault();
    const amt=event.target.fname.value;
    const cat=event.target.desc.value;
    const man=event.target.categ.value;
    let exp={
        amt,
         cat,
         man


    };
    // localStorage.setItem(exp.amt,JSON.stringify(exp))
    const token=localStorage.getItem('token')
    axios.post("http://localhost:8000/addexpense",exp,{headers: {'Authorization':token}})
    .then((response)=>{
        console.log(response)
        var a=response.data
        printExpenses(a.pop());
        console.log(response.data) 
    }).catch((err)=>{
        console.log(err);
    })
    //printExpenses(exp);
}


function deleteUser(Id){
    //    console.log(emailId)
    //     localStorage.removeItem(emailId);

        axios.delete(`http://localhost:8000/delete/${Id}`)
        .then(removeUserFromScreen(Id)).catch((err)=>console.log(err))
         //removeUserFromScreen(Id);
}
    function removeUserFromScreen(expID){
       
        //console.log(p);
        //localStorage.removeItem(expID);
        const parentNode=document.getElementById("formList");
        console.log(parentNode)
        // console.log(parentNode.innerHTML)
        let child=document.getElementById(`${expID}`);
        console.log(expID)
        console.log(child)
        parentNode.removeChild(child);
        //localStorage.removeItem(expID);
        //deleteUser(expID)

    }

    document.getElementById('rzp-button1').onclick = async function (e) {
        const token=localStorage.getItem('token')
        const response  = await axios.get('http://localhost:8000/premiummembership', { headers: {"Authorization" : token} });
        console.log(response);
        var options =
        {
         "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
         "name": "SALONI MILIND PATIL",
         "order_id": response.data.order.id, // For one time payment
         "prefill": {
           "name": "Test User",
           "email": "test.user@example.com",
           "contact": "7003442036"
         },
         "theme": {
          "color": "#3399cc"
         },
         // This handler function will handle the success payment
         "handler": function (response) {
             console.log(response);
             axios.post('http://localhost:8000/updatetransactionstatus',{
                 order_id: options.order_id,
                 payment_id: response.razorpay_payment_id,
             }, { headers: {"Authorization" : token} }).then(() => {
                 alert('You are a Premium User Now')
             }).catch(() => {
                 alert('Something went wrong. Try Again!!!')
             })
         },
      };
      const rzp1 = new Razorpay(options);
      rzp1.open();
      e.preventDefault();
    
      rzp1.on('payment.failed', function (response){
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
     });
    }