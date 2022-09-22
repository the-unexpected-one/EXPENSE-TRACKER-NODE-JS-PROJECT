window.addEventListener("DOMContentLoaded",()=>
{
    const token=localStorage.getItem('token')
   axios.get("http://localhost:8000/expenses",{headers: {'Authorization':token}}).then((response)=>{
       console.log(response)
       for(var i=0;i<response.data.length;i++){
           printExpenses(response.data[i])
       }
   }).catch((err)=>{
       document.body.innerHTML="<h4>Something went wrong<h4>"
       console.log(err)})
})

function printExpenses(exp){
    let formNODE = document.getElementById("formList");
    // console.log(exp)
    let p=exp.amount;
    // console.log(p)
    let childNODE=`<li id=${exp.id}>${exp.amount}-${exp.category}-${exp.description}<button onclick=deleteUser('${exp.id}')>Delete expenses</button><button onclick=editUser('${exp.id}','${exp.amt}','${exp.cat}','${exp.man}')>Edit expenses</button></li>`
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
        const childNODE=document.getElementById(expID);
        parentNode.removeChild(childNODE);
        //localStorage.removeItem(expID);
        //deleteUser(expID)

    }