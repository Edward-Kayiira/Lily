const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("sendBtn");
const resetBtn = document.getElementById("resetBtn");

function appendMessage(sender, message) {
    const msg = document.createElement("div");
    msg.classList.add(sender);
    msg.textContent = message;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

let stage = 0;

function showLoadingIndicator() {
    const loadingMsg = document.createElement("div");
    loadingMsg.classList.add("loading");
    loadingMsg.textContent = "Bot is typing...";
    chatBox.appendChild(loadingMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
    return loadingMsg;
}

function hideLoadingIndicator(loadingMsg) {
    chatBox.removeChild(loadingMsg);
}

function handleUser Input() {
    const userMessage = input.value.trim();
    if (!userMessage) {
        appendMessage("bot", "Please enter a message.");
        return;
    }

    appendMessage("user", userMessage);
    input.value = "";

    const loadingMsg = showLoadingIndicator();

    setTimeout(() => {
        hideLoadingIndicator(loadingMsg);

        if (stage === 0 && userMessage.toLowerCase() === "hi") {
            appendMessage("bot", "Hi there! How can I assist you?");
            appendMessage("bot", "1. Transaction\n2. Account Info\n3. Talk to Agent");
            stage = 1;
        } else if (stage === 1) {
            if (userMessage === "1") {
                appendMessage("bot", "You chose Transaction. What do you want to do?");
                appendMessage("bot", "1. Send Money \n2. Check Balance");
                stage = 2;
            } else if (userMessage === "2") {
                appendMessage("bot", "You chose Account Info. Here's your balance: UGX 50,000");
            } else if (userMessage === "3") {
                appendMessage("bot", "Lily is Connecting you to an agent... Please Be Patient");
                setTimeout(() => {
                    appendMessage("bot", "You are now connected to an agent. Open WhatsApp to chat with them.");
                    const phone = "256746838046"; // your WhatsApp number
                    const message = encodeURIComponent("Hello, I selected Option 3 and need to talk to an agent.");
                    const waLink = `https://wa.me/${phone}?text=${message}`;
                    window.open(waLink, "_blank");
                }, 1000);
                stage = 0; // Reset to start
            } else {
                appendMessage("bot", "Please choose a valid option: 1, 2, or 3.");
            }
        } else if (stage === 2) {
            if (userMessage === "1") {
                appendMessage("bot", "Enter the amount you want to send:");
                stage = 3;
            } else if (userMessage === "2") {
                appendMessage("bot", "Your current balance is UGX 50,000");
            } else {
                appendMessage("bot", "Please choose a valid transaction option.");
            }
        } else if (stage === 3) {
            const amount = parseFloat(userMessage);
            if (!isNaN(amount) && amount > 0) {
                appendMessage("bot", `You are sending UGX ${amount}. Transaction complete, Thanks for using LilyBot`);
                stage = 0; // Reset to start
            } else {
                appendMessage("bot", "Please enter a valid amount.");
            }
        } else {
            appendMessage("bot", "Say 'Hi' to start again.");
            stage = 0;
        }
    }, 1000); // Simulate bot thinking time
}

// Reset chat functionality
resetBtn.addEventListener("click", () => {
    chatBox.innerHTML = ""; // Clear the chat box
    stage = 0; // Reset the stage
    appendMessage("bot", "Say 'Hi' to start again."); // Prompt the user
});

// Enter key functionality
input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault(); // prevents line breaks in input if it's a textarea
        sendBtn.click(); // triggers your send button
    }
});