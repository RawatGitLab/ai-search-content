import { GoogleGenerativeAI } from "@google/generative-ai";

let button = document.querySelector("button");
let input = document.querySelector("input[type='text']");
let responseDiv = document.getElementById("gemini-response");

async function getGeminiResponse() {
    let api_key = "AIzaSyCkJSS039VfpLf4DnzTflgV24Qum5NwKlc";
    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const query = input.value;
    if (!query.trim()) {
        responseDiv.innerText = "Please enter a question first.";
        responseDiv.style.color = "#ffa726";
        return;
    }
    responseDiv.innerText = "Thinking...";
    responseDiv.style.color = "#21cba8";
    try {
        const result = await model.generateContent(query);
        let response = result.response.text();
        responseDiv.innerText = response;
        responseDiv.style.color = "#ddd";
    } catch (e) {
        responseDiv.innerText = "Sorry, there was an error: " + e.message;
        responseDiv.style.color = "#ec4444";
    }
}

button.addEventListener("click", getGeminiResponse);
input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") getGeminiResponse();
});

// Add subtle animation to input focus
input.addEventListener("focus", function() {
    this.parentElement.style.transform = "scale(1.01)";
});
input.addEventListener("blur", function() {
    this.parentElement.style.transform = "scale(1)";
});
