/* =========================================================
   CONTACT FORM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");
    const formStatus = document.getElementById("formStatus");

    if (!form) {
        return;
    }


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }


    /* =====================================================
       ERROR HANDLER
    ===================================================== */

    function showError(input, message) {

        const group = input.closest(".form-group");

        if (!group) {
            return false;
        }

        group.classList.add("has-error");

        const error = group.querySelector(".error-message");

        if (error) {
            error.textContent = message;
        }

        return false;
    }


    /* =====================================================
       CLEAR ERROR
    ===================================================== */

    function clearError(input) {

        const group = input.closest(".form-group");

        if (!group) {
            return;
        }

        group.classList.remove("has-error");

        const error = group.querySelector(".error-message");

        if (error) {
            error.textContent = "";
        }
    }


    /* =====================================================
       VALIDATE FORM
    ===================================================== */

    function validateForm() {

        let valid = true;

        formStatus.textContent = "";
        formStatus.className = "form-status";


        /* NAME */

        if (nameInput.value.trim() === "") {

            showError(
                nameInput,
                "Please enter your name."
            );

            valid = false;

        } else {

            clearError(nameInput);

        }


        /* EMAIL */

        if (emailInput.value.trim() === "") {

            showError(
                emailInput,
                "Please enter your email."
            );

            valid = false;

        } else if (!isValidEmail(emailInput.value.trim())) {

            showError(
                emailInput,
                "Please enter a valid email."
            );

            valid = false;

        } else {

            clearError(emailInput);

        }


        /* SUBJECT */

        if (subjectInput.value.trim() === "") {

            showError(
                subjectInput,
                "Please enter a subject."
            );

            valid = false;

        } else {

            clearError(subjectInput);

        }


        /* MESSAGE */

        if (messageInput.value.trim() === "") {

            showError(
                messageInput,
                "Please enter your message."
            );

            valid = false;

        } else {

            clearError(messageInput);

        }


        return valid;
    }


    /* =====================================================
       LIVE ERROR REMOVAL
    ===================================================== */

    [
        nameInput,
        emailInput,
        subjectInput,
        messageInput
    ].forEach((input) => {

        input.addEventListener("input", () => {

            if (input.value.trim() !== "") {
                clearError(input);
            }

            formStatus.textContent = "";
            formStatus.className = "form-status";

        });

    });


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    form.addEventListener("submit", (event) => {

        event.preventDefault();


        /* VALIDATE */

        const isValid = validateForm();

        if (!isValid) {
            return;
        }


        /* LOADING */

        submitBtn.disabled = true;

        submitBtn.classList.add("loading");

        const buttonText =
            submitBtn.querySelector(".button-text");

        if (buttonText) {
            buttonText.textContent = "Sending...";
        }


        /* DEMO SUBMISSION */

        setTimeout(() => {

            submitBtn.disabled = false;

            submitBtn.classList.remove("loading");

            if (buttonText) {
                buttonText.textContent = "Submit";
            }


            /* SUCCESS */

            formStatus.textContent =
                "Thank you! Your message has been sent successfully.";

            formStatus.className =
                "form-status success";


            /* RESET */

            form.reset();

        }, 1000);

    });

});