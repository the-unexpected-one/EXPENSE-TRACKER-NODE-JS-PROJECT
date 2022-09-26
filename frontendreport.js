window.addEventListener("DOMContentLoaded",()=>{
    const token=localStorage.getItem('token');
    axios.get("http://localhost:8000/backendreport",{headers: {'Authorization':token}})
    .then((response)=>{
        let dailyTable=document.getElementById('daily');
        let monthlyTable=document.getElementById('monthly');
        console.log(monthlyTable)
        let weeklyTable=document.getElementById('weekly');

        console.log(response.data.weekly[0])
        let weekly1=response.data.weekly
        for(let i=0;i<weekly1.length;i++){
            let row=document.createElement('tr')
            let date=document.createElement('td')
            date.innerHTML=weekly1[i].createdAt
            let desc=document.createElement('td');
            desc.innerHTML=weekly1[i].description;
            let category=document.createElement('td');
            category.innerHTML=weekly1[i].category;
            let expense=document.createElement('td');
            expense.innerHTML=weekly1[i].amount;
            row.appendChild(date);
            row.appendChild(desc);
            row.appendChild(category);

            row.appendChild(expense);

weeklyTable.appendChild(row)


        }




let monthly1=response.data.monthlyExpenses;
        for(let i=0;i<monthly1.length;i++){
            let row1=document.createElement('tr')
            let date1=document.createElement('td')
            date1.innerHTML=monthly1[i].createdAt
            let desc1=document.createElement('td');
            desc1.innerHTML=monthly1[i].description;
            let category1=document.createElement('td');
            category1.innerHTML=monthly1[i].category;
            let expense1=document.createElement('td');
            expense1.innerHTML=monthly1[i].amount;
            row1.appendChild(date1);
            row1.appendChild(desc1);
            row1.appendChild(category1);

            row1.appendChild(expense1);

monthlyTable.appendChild(row1)


        }




        let daily1=response.data.daily;
        for(let i=0;i<daily1.length;i++){
            let row2=document.createElement('tr')
            let date2=document.createElement('td')
            date2.innerHTML=daily1[i].createdAt
            let desc2=document.createElement('td');
            desc2.innerHTML=daily1[i].description;
            let category2=document.createElement('td');
            category2.innerHTML=daily1[i].category;
            let expense2=document.createElement('td');
            expense2.innerHTML=daily1[i].amount;
            row2.appendChild(date2);
            row2.appendChild(desc2);
            row2.appendChild(category2);

            row2.appendChild(expense2);

dailyTable.appendChild(row2)


        }

        console.log(response)
})
.catch(err=>{
    console.log(err)
})
})

