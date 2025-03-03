document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const inputField = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    sendBtn.addEventListener("click", sendMessage);
    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });

    function sendMessage() {
        const question = inputField.value.trim();
        if (question === "") return;

        // Append user message to chat box
        appendMessage("You: " + question, "user-message");

        // Send request to Spring Boot chatbot
        fetch("http://localhost:8080/ai/qna/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: question })
        })
        .then(response => response.text())
        .then(answer => {
            appendMessage("Daddy: " + answer, "bot-message");
        })
        .catch(error => {
            appendMessage("Daddy: Oops! Something went wrong. ❌", "bot-message");
            console.error("Error:", error);
        });

        inputField.value = ""; // Clear input field
    }

    function appendMessage(text, className) {
        const messageElement = document.createElement("p");
        messageElement.textContent = text;
        messageElement.classList.add(className);
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
    }
});
