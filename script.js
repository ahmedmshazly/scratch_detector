function predictImage() {
    var resultDiv = document.getElementById("result");
    var imageDisplay = document.getElementById("imageDisplay");
    resultDiv.innerHTML = ''; // Clear previous results or errors
    imageDisplay.innerHTML = ''; // remove previous image

    var input = document.getElementById("imageInput");
    var file = input.files[0];

    if (!file) {
        resultDiv.innerHTML = "Please select an image to upload.";
        return;
    }

    // Display the uploaded image
    var reader = new FileReader();
    reader.onload = function (e) {
        var img = document.createElement("img");
        img.src = e.target.result;
        img.style.maxWidth = "300px"; // Set the max width of the image
        img.style.maxHeight = "300px"; // Set the max height of the image
        imageDisplay.appendChild(img);
    };
    reader.readAsDataURL(file);

    // loading message ?
    resultDiv.innerHTML = "<p>Processing...</p>";

    var formData = new FormData();
    formData.append("image", file);

    fetch("https://flask-production-f45ca.up.railway.app/predict", {
        method: "POST",
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        displayResult(data);
    })
    .catch(error => {
        console.error("Error:", error);
        resultDiv.innerHTML = "Error processing your request: " + error.message;
    });
}

function displayResult(data) {
    var resultDiv = document.getElementById("result");

    resultDiv.innerHTML = "Predicted Class: " + data.predicted_class;
}

// resultDiv.innerHTML = "Predicted Class: " +  data.predicted_class;