document.querySelector('#newCardForm').addEventListener("submit", event => {
    event.preventDefault();
    const eventName = document.querySelector('#newCardName');
    const eventDescription = document.querySelector('#newCardDescription');
    const eventTime = document.querySelector('#newCardTime');
    const eventCat = document.querySelector('#newCardTime');
    let cardImg = document.querySelector('#uploadedImageUrl')
    if (cardImg === null) {
        cardImg = "";
    } 
    const fetchObj = {
        event_name: eventName.value,
        event_description: eventDescription.value,
        event_time: eventTime.value,
        image_path: cardImg?.value,
    }

    axios.post(`/api/cards/`, fetchObj)
    .then((data) => {
        console.log(data);
        location.reload();
    }).catch(console.log)
});