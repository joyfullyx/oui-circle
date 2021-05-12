
const imgBtn = document.getElementById('upload_widget');


var myWidget = cloudinary.createUploadWidget(
    {
        cloudName: "kkhunt",
        uploadPreset: "nhww67ae",
        sources: ["local", "facebook", "instagram", "camera", "url"],
        showAdvancedOptions: false,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#ffffff",
            sourceBg: "#f4f4f5",
            windowBorder: "#90a0b3",
            tabIcon: "#000000",
            inactiveTabIcon: "#555a5f",
            menuIcons: "#555a5f",
            link: "#0433ff",
            action: "#339933",
            inProgress: "#0433ff",
            complete: "#339933",
            error: "#cc0000",
            textDark: "#000000",
            textLight: "#fcfffd",
          },
          fonts: { default: null, "sans-serif": { url: null, active: true } },
        },
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      const uploadedImageUrl = result.info.secure_url;
      var input = document.createElement("input");

      input.setAttribute("type", "hidden");

      input.setAttribute("name", "hidden uploaded url");
      input.setAttribute("id", "uploadedImageUrl");

      input.setAttribute("value", uploadedImageUrl);

      //append to form element that you want .
      document.getElementById("newCardForm").appendChild(input);
    }
  }

);

imgBtn.addEventListener('click', event => {
  event.preventDefault();
  myWidget.open();
})
