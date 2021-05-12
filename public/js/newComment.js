const newComment = document.querySelector('#newCommentForm');
const delComBtns = document.querySelectorAll(".commentDelBtn");
const delCardBtns = document.querySelectorAll(".cardDelBtn");
const editComBtns = document.querySelectorAll(".editComBtn");
const commitEditBtn = document.querySelector('.editComBtnCommit');

newComment.addEventListener("submit", event => {
    event.preventDefault();
    const textarea = document.querySelector("#newComment");
    const fetchObj = {
        content: textarea.value,
    }
    const dataid = textarea.getAttribute("data-id");
    axios.post(`/api/comments/${dataid}`, fetchObj)
    .then((data) => {
        console.log(data);
        location.reload();
    }).catch(console.log)
});

//Buttons for deleting comments
delComBtns.forEach(button=> {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const idToDel = button.getAttribute('data-id');
        fetch(`/api/comments/${idToDel}`, {
            method: "DELETE"
        }).then(res => {
        if(!res.ok) {
            alert("No comment to delete")
        } else {
        }
        location.reload();
        })
    })
});

//Buttons for deleting cards
delCardBtns.forEach(button=> {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const idToDel = button.getAttribute('data-id');
        console.log(idToDel)
        fetch(`/api/cards/${idToDel}`, {
            method: "DELETE"
        }).then(res => {
        if(!res.ok) {
            alert("No card to delete")
        } else {
            location.replace('/profile');
        }
        })
    })
});

// --Edit Comment Buttons
editComBtns.forEach(button => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const textarea = document.querySelector('#editComment');
        const postedComments = document.querySelector('#commentContainer');
        const editBlock = document.querySelector('#editCommentBlock');
        const idToEdit = button.getAttribute('data-id');

        postedComments.setAttribute("style", "display: none");
        editBlock.setAttribute("style", "display: flex");
        commitEditBtn.setAttribute('style', "display: flex");

        axios.get(`/api/comments/${idToEdit}`)
        .then((data) => {
            const commentText = data.data.content;
            textarea.value += commentText;
            const useId = data.data.id;
            console.log(data);
            console.log(data.data.content);
            
            commitEditBtn.addEventListener("click", (event) => {
                event.preventDefault();
                const textarea = document.querySelector('#editComment');
                const postedComments = document.querySelector('#commentContainer');
                const editBlock = document.querySelector('#editCommentBlock');
                const editBtn = document.querySelector('.editComBtn');
                const idToEdit = editBtn.getAttribute('data-id');
                
                console.log(idToEdit);
                postedComments.setAttribute("style", "display: flex");
                editBlock.setAttribute("style", "display: none");
                editBtn.setAttribute('style', "display: flex");
                commitEditBtn.setAttribute('style', "display: none");
                
                const fetchObj = {
                    content: textarea.value,
                }
                axios.put(`/api/comments/${useId}`, fetchObj)
                .then((data) => {
                    console.log("this be the data", data);
                    location.reload();
                }).catch(console.log)
            })
        }).catch(console.log)
    })
});


// --If Conditional to show Edit/Delete Buttons on individual cards
Handlebars.registerHelper('ifCond', function(currUser, cardUser, options) {
    if(currUser === cardUser) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

