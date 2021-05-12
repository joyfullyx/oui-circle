document.querySelector("#loginForm").addEventListener("submit",event=>{
    event.preventDefault();
    const fetchObj = {
        email:document.querySelector("#loginEmail").value,
        password:document.querySelector("#loginPassword").value,
    }
    console.log(fetchObj);
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(fetchObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        console.log(res);
        if(res.ok){
            console.log("logged in successfully!")
            location.reload();
        } else {
            alert("Login failed!")
        }
    })
});
