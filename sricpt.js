import sendMail from "./send_mail_api.js";

document.addEventListener("DOMContentLoaded", function (e) {
  document
    .querySelector(".CONTACT_FORM__SUBMIT")
    .addEventListener("click", submitFormCallback);
});

// add status to the request
let status;
const form = document.querySelector(".CONTACT_FORM");

// abort the request when cancelled or when reinitialized during pending submission
function cancelFormSubmission(controller) {
    // prevents sending further requests to the api if one is already being processed
  if (status === "pending") {
    status = "";
    controller.abort("Aborted to prevent spam submission");
  }
  status = "";
}

function submitFormCallback(e) {
  e.preventDefault(); // prevent form submission
  // set animation timer
  let animation_time;
  // AbortController api to cancel fetch request when user clicks off page
  let controller = new AbortController();
  let signal = controller.signal;
  // cleanup of pending animation
  clearInterval(animation_time);
  // initialize email feild
  const email = document.getElementById("email");
  const fieldSet = document.querySelector("fieldset");
  // clear any fetch responses
  document.getElementById("response_message") &&
    document.getElementById("response_message").remove();
  // abort last fetch request when submit is spammed
  cancelFormSubmission(controller);
  // validation of email value
  if (email.value === "") {
    // initialize error message
    const p_warning = document.createElement("p", {});
    p_warning.textContent = "Please enter some value for email";
    p_warning.style.color = "red";
    p_warning.id = "email_warning";
    // only add error message if it doesent already exist
    if (document.querySelector("#email_warning") === null) {
      email.parentElement.append(p_warning);
    }
    // add animation to email field
    email.classList.add("shake");
    // remove animation class after it is completed
    animation_time = setTimeout(() => {
      email.classList.remove("shake");
    }, 500);
  } else {
    // clear previous error message if any
    document.querySelector("#email_warning") &&
      document.querySelector("#email_warning").remove();
    // add loading indicator
    const email_processing = document.createElement("p", {});
    email_processing.id = "response_message";
    email_processing.innerHTML = "Loading &hellip;";
    status = "pending";
    fieldSet.prepend(email_processing);
    // need to use promise resolution syntax on async function
    sendMail(signal)
      // rethrow any errors in response
      .then((resp) => {
        if (!(resp instanceof Error)) {
          // add success indicator
          email_processing.innerHTML = "Email sent successfully! &#128512;";
          email_processing.style.color = "green";
        } else {
          throw new Error(resp.message);
        }
        status = "resolved";
      })
      .catch((err) => {
        // add fail indicator
        email_processing.innerHTML = "Failed to send email. &#128577;";
        email_processing.style.color = "red";
      });
  }
}
