// const token = "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"; 
const token = "iU6Mht1tKWwAtdsMvGIb93X6QIVjJybR"
const inputTxt = document.getElementById("inputtxt");
const image = document.getElementById("img");
const button = document.getElementById("btn");

async function query(input) {
    image.src = "img.gif"; 
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ "inputs": input })
            }
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Checking if the response is an image blob or not
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.startsWith("image/")) {
            const result = await response.blob();
            return result;
        } else {
            // throw new Error("Unexpected content type: Expected an image.");
        }
    } catch (error) {
        console.error("Error querying the model:", error);
        return null; // Return null on error
    }
}

button.addEventListener('click', async function() {
    try {
        const input = inputTxt.value;
        if (!input) {
            console.error("Input text is empty.");
            return;
        }

        const response = await query(input);
        if (response) {
            const objectURL = URL.createObjectURL(response);
            image.src = objectURL;
        } else {
            // image.src = "img/error.png"; // Set to an error image if the response is null
        }
    } catch (error) {
        // console.error("Error processing the response:", error);
        // image.src = "img/error.png"; // Set to an error image on catch block
    }
});
