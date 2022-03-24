

function getAllOrders(event){
    event.preventDefault();

    document.getElementById('response').innerHTML = "";


    console.log("Getting all orders")
    fetch("http://localhost:5000/orders", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }).then((res) => {

        res.json().then(json => {

            for(i in json){
                const row = document.createElement('tr')

                let th1 = document.createElement('td')
                th1.innerHTML = json[i].bookname;
                
                let th2 = document.createElement('td')
                th2.innerHTML = json[i].amount;
                
                let th3 = document.createElement('td')
                th3.innerHTML = json[i].date;

                row.appendChild(th1)
                row.appendChild(th2)
                row.appendChild(th3)

                document.getElementById('response').appendChild(row);

            }

        });
    })

}

function submitOrder(event){


    event.preventDefault();
    console.log(document.getElementById("amount").value)

    console.log("Submitting an orders")
    fetch("http://[::1]:5000/order", {
        
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "bookname" : document.getElementById("bookname").value,
            "amount" : document.getElementById("amount").value
        })

    }).then((res) => {
        if (res.ok) {

            if (res.ok) {
                console.log(res)
                document.getElementById("amount").value = ""
                document.getElementById("bookname").value = ""
            } else{
                document.getElementById("result").innerHTML = "Failed, try again"
            }


        }
    })

}

