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

// A function called on form submission
function userMessage(event) {
    event.preventDefault();

    var userSubmittedMessage = $("#cb-compose-message-field").val();

    $("#cb-conversation").append(`
        <div class="cb-user_message">
            ${userSubmittedMessage}
        </div>
    `)

    disableInput();
    sendMessage(userSubmittedMessage);
    botResponse();
}

function disableInput() {
    var textArea = "#cb-compose textarea";
    var submitButton = "#cb-send-message-btn";

    $(textArea).addClass("disabled");
    $(textArea).attr("disabled", true);
    $(textArea).val("To continue using the chatbot, please sign up using the link above.")

    $(submitButton).attr("disabled", true)
    $(submitButton).css("cursor", "not-allowed")
}

function botResponse() {
    $("#cb-conversation").append(`
        <div class="cb-bot_message">
            To get detailed, personalized assistance, please sign up for BuildBuddy. It's quick, easy, and opens up a world of tailored advice for your project.
        </div>
    `);

    $("#cb-conversation").append(`
        <a id="cb-bot_response-btn" href="https://app.buildbuddy.co/register">Sign Up</a>
    `);
}

function sendMessage(userMessage) {

    $.ajax({
            headers: {
                'Content-Type': 'application/json',
            },
            type: 'POST',
            url: 'http://localhost:3000/saveMessage',
            data: JSON.stringify({user_message: userMessage})

        })

        // .done((data) => {
        //     console.log({
        //         data
        //     });
        // })
        .fail((err) => {
            console.error(err);
        })
        // .always(() => {
        //     console.log('always called');
        // });

}