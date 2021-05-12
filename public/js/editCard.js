var cardId;

editCardBtns.forEach((button) => {
  button.onclick = function() {
    const editName = document.querySelector('#editCardName');
    const textarea = document.querySelector('#editCardDescription');
    const idToEdit = button.getAttribute('data-id');

    console.log(this);
    console.log(idToEdit);
    editCardModal.style.display = "block";

    axios.get(`/api/cards/${idToEdit}`)
    .then((data) => {
      const cardName = data.data.event_name;
      const cardText = data.data.event_description;
      cardId = data.data.id;
      editName.value = cardName;
      textarea.value = cardText;
    })
  }
})


document.querySelector('#editCardForm').addEventListener("submit", event => {
    event.preventDefault();
    const eventName = document.querySelector('#editCardName');
    const eventDescription = document.querySelector('#editCardDescription');
    const eventTime = document.querySelector('#editCardTime');
    const thisPost = document.querySelectorAll('.sideCard');

    thisPost.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            console.log(this);
        })
    })
    const fetchObj = {
        event_name: eventName.value,
        event_description: eventDescription.value,
    }
    console.log('fetchObj: ',fetchObj)
    console.log(thisPost);
    console.log(cardId);
    axios.put(`/api/cards/${cardId}`, fetchObj)
    .then((data) => {
        console.log(data);
        location.reload();
    }).catch(console.log)
});