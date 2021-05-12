document.querySelector("#signupForm").addEventListener("submit",event=>{
    event.preventDefault();
    const fetchObj = {
        firstname:(document.querySelector("#signupFirstname").value),
        lastname:(document.querySelector("#signupLastname").value),
        username:document.querySelector("#signupUsername").value,
        email:document.querySelector("#signupEmail").value,
        password:document.querySelector("#signupPassword").value,
        zip:parseInt(document.querySelector("#signupZip").value),
    }
    console.log(fetchObj);
    fetch("/api/users",{
        method:"POST",
        body:JSON.stringify(fetchObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        console.log(res);
        if(res.ok){
            console.log("Signup Successful!");
            location.reload();
        } else {
            console.log("Signup failed!")
        }
    })
})