const quotes = [
    {
        text: "The secret of getting ahead is getting started.",
        author: "Mark Twain"
    },
    {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        text: "It always seems impossible until it's done.",
        author: "Nelson Mandela"
    },
    {
        text: "Dream big and dare to fail.",
        author: "Norman Vincent Peale"
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    },
    {
        text: "Great things are done by a series of small things brought together.",
        author: "Vincent van Gogh"
    },
    {
        text: "Learning never exhausts the mind.",
        author: "Leonardo da Vinci"
    },
    {
        text: "Success is the sum of small efforts, repeated day in and day out.",
        author: "Robert Collier"
    },
    {
        text: "Start where you are. Use what you have. Do what you can.",
        author: "Arthur Ashe"
    },
    {
        text: "Your limitation—it’s only your imagination.",
        author: "Unknown"
    }
];


const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const quoteButton = document.getElementById("quoteBtn");
const copyButton = document.getElementById("copyBtn");
const shareButton = document.getElementById("shareBtn");
const statusElement = document.getElementById("status");
const quoteCard = document.querySelector(".quote-card");

let lastQuoteIndex = 0;


function generateQuote() {

    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
    } while (
        quotes.length > 1 &&
        randomIndex === lastQuoteIndex
    );

    lastQuoteIndex = randomIndex;

    const selectedQuote = quotes[randomIndex];

    quoteElement.textContent = `"${selectedQuote.text}"`;
    authorElement.textContent = `— ${selectedQuote.author}`;

    quoteCard.classList.remove("animate");

    void quoteCard.offsetWidth;

    quoteCard.classList.add("animate");

    showStatus("New quote generated.");
}


async function copyQuote() {

    const text =
        `${quoteElement.textContent} ${authorElement.textContent}`;

    try {

        await navigator.clipboard.writeText(text);

        showStatus("Quote copied to clipboard.");

    } catch (error) {

        showStatus("Unable to copy the quote.");

    }
}


async function shareQuote() {

    const text =
        `${quoteElement.textContent} ${authorElement.textContent}`;

    if (navigator.share) {

        try {

            await navigator.share({
                title: "QuoteFlow",
                text: text
            });

        } catch (error) {

            if (error.name !== "AbortError") {
                showStatus("Sharing was not completed.");
            }
        }

    } else {

        await copyQuote();

    }
}


function showStatus(message) {

    statusElement.textContent = message;

    setTimeout(() => {
        statusElement.textContent = "";
    }, 2500);
}


quoteButton.addEventListener("click", generateQuote);
copyButton.addEventListener("click", copyQuote);
shareButton.addEventListener("click", shareQuote);