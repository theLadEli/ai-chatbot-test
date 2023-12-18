// Wait until the page has fully loaded before running the script.
$(document).ready(function initialMessage() {

    // Add the initial bot message after a short delay
    setTimeout(function () {
        $("#cb-conversation").append(`
            <div class="cb-bot_message">
                👋 Hello and welcome to BuildBuddy! I'm BuildBot, your personal guide to home extensions. I'm
                here to answer your questions and provide tailored advice for your project. How can I assist you
                today?
            </div>
        `)
    }, 1000);

});

// A function called on form submission to display the users input
function userMessage(event) {
    event.preventDefault();

    var userSubmittedMessage = $("#cb-compose-message-field").val();

    $("#cb-conversation").append(`
        <div class="cb-user_message">
            ${userSubmittedMessage}
        </div>
    `)

    disableInput()
}

function disableInput() {
    $("#cb-compose textarea").addClass("disabled")
}