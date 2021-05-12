const delBtns3 = document.querySelectorAll(".sideDelBtn");


//Buttons for deleting cards on sidebar
delBtns3.forEach(button=> {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const idToDel = button.getAttribute('data-id');
        fetch(`/api/cards/${idToDel}`, {
            method: "DELETE"
        }).then(res => {
        if(!res.ok) {
            alert("No card to delete")
        } else {
            console.log(res)
            location.replace('/profile');
        }
        })
    })
});