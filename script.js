/* =========================================================
   LOGIN DETAILS
========================================================= */

const VALID_APPLICATION_NUMBER = "260413113383";
const VALID_PASSWORD = "Pass@1234";


/* =========================================================
   ELEMENTS
========================================================= */

const loginForm =
    document.getElementById("loginForm");

const applicationNumber =
    document.getElementById("applicationNumber");

const password =
    document.getElementById("password");

const captchaInput =
    document.getElementById("captchaInput");

const captchaDisplay =
    document.getElementById("captchaDisplay");

const refreshCaptcha =
    document.getElementById("refreshCaptcha");

const togglePassword =
    document.getElementById("togglePassword");

const messageBox =
    document.getElementById("messageBox");

const forgotPassword =
    document.getElementById("forgotPassword");


/* =========================================================
   VARIABLE
========================================================= */

let currentCaptcha = "";


/* =========================================================
   GENERATE CAPTCHA
========================================================= */

function generateCaptcha() {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let generatedCaptcha = "";

    for (let i = 0; i < 6; i++) {

        const randomIndex =
            Math.floor(
                Math.random() * characters.length
            );

        generatedCaptcha +=
            characters.charAt(randomIndex);

    }

    currentCaptcha = generatedCaptcha;

    captchaDisplay.textContent =
        generatedCaptcha;

}


/* =========================================================
   SHOW MESSAGE
========================================================= */

function showMessage(message, type) {

    messageBox.textContent = message;

    messageBox.className =
        "message-box show " + type;

}


/* =========================================================
   CLEAR MESSAGE
========================================================= */

function clearMessage() {

    messageBox.textContent = "";

    messageBox.className =
        "message-box";

}


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        generateCaptcha();

        applicationNumber.focus();

        sessionStorage.removeItem(
            "portalLoggedIn"
        );

        sessionStorage.removeItem(
            "applicationNumber"
        );

    }
);


/* =========================================================
   REFRESH CAPTCHA
========================================================= */

refreshCaptcha.addEventListener(
    "click",
    function () {

        generateCaptcha();

        captchaInput.value = "";

        clearMessage();

        captchaInput.focus();

    }
);


/* =========================================================
   SHOW / HIDE PASSWORD
========================================================= */

togglePassword.addEventListener(
    "click",
    function () {

        if (password.type === "password") {

            password.type = "text";

            togglePassword.textContent =
                "Hide";

            togglePassword.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            password.type = "password";

            togglePassword.textContent =
                "Show";

            togglePassword.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    }
);


/* =========================================================
   APPLICATION NUMBER - NUMBERS ONLY
========================================================= */

applicationNumber.addEventListener(
    "input",
    function () {

        this.value =
            this.value.replace(
                /[^0-9]/g,
                ""
            );

        clearMessage();

    }
);


/* =========================================================
   CAPTCHA INPUT
========================================================= */

captchaInput.addEventListener(
    "input",
    function () {

        this.value =
            this.value.toUpperCase();

        clearMessage();

    }
);


/* =========================================================
   PASSWORD INPUT
========================================================= */

password.addEventListener(
    "input",
    function () {

        clearMessage();

    }
);


/* =========================================================
   LOGIN FORM
========================================================= */

loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        clearMessage();


        const enteredApplication =
            applicationNumber.value.trim();

        const enteredPassword =
            password.value;

        const enteredCaptcha =
            captchaInput.value.trim();


        /* APPLICATION NUMBER EMPTY */

        if (enteredApplication === "") {

            showMessage(
                "Please enter Application Number.",
                "error"
            );

            applicationNumber.focus();

            return;

        }


        /* APPLICATION NUMBER LENGTH */

        if (enteredApplication.length < 8) {

            showMessage(
                "Please enter a valid Application Number.",
                "error"
            );

            applicationNumber.focus();

            return;

        }


        /* PASSWORD EMPTY */

        if (enteredPassword === "") {

            showMessage(
                "Please enter Password.",
                "error"
            );

            password.focus();

            return;

        }


        /* CAPTCHA EMPTY */

        if (enteredCaptcha === "") {

            showMessage(
                "Please enter CAPTCHA.",
                "error"
            );

            captchaInput.focus();

            return;

        }


        /* CAPTCHA CHECK */

        if (
            enteredCaptcha !==
            currentCaptcha
        ) {

            showMessage(
                "Invalid CAPTCHA. Please try again.",
                "error"
            );

            generateCaptcha();

            captchaInput.value = "";

            captchaInput.focus();

            return;

        }


        /* LOGIN DETAILS CHECK */

        if (
            enteredApplication !==
            VALID_APPLICATION_NUMBER ||
            enteredPassword !==
            VALID_PASSWORD
        ) {

            showMessage(
                "Invalid Application Number or Password.",
                "error"
            );

            password.value = "";

            captchaInput.value = "";

            generateCaptcha();

            password.focus();

            return;

        }


        /* LOGIN SUCCESS */

        showMessage(
            "Login successful. Opening scorecard...",
            "success"
        );


        /* SAVE LOGIN SESSION */

        sessionStorage.setItem(
            "portalLoggedIn",
            "true"
        );

        sessionStorage.setItem(
            "applicationNumber",
            enteredApplication
        );


        /* OPEN SCORECARD PAGE
           NO AUTO DOWNLOAD
        */

        setTimeout(
            function () {

                window.location.href =
                    "scorecard.html";

            },
            700
        );

    }
);


/* =========================================================
   FORGOT PASSWORD
========================================================= */

forgotPassword.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        showMessage(
            "Please contact the examination help desk for password recovery.",
            "error"
        );

    }
);


/* =========================================================
   ENTER KEY SUPPORT
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter" &&
            document.activeElement !== togglePassword &&
            document.activeElement !== refreshCaptcha
        ) {

            loginForm.requestSubmit();

        }

    }
);