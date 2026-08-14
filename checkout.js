document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("checkoutForm");
    const orderButton = document.querySelector(".place-order-btn");
    const message = document.getElementById("orderMessage");

    const requiredFields = [
        {
            id: "firstName",
            message: "Please enter your first name."
        },
        {
            id: "lastName",
            message: "Please enter your last name."
        },
        {
            id: "country",
            message: "Please select your country."
        },
        {
            id: "address",
            message: "Please enter your street address."
        },
        {
            id: "city",
            message: "Please enter your town / city."
        }
    ];


    /* =========================================
       CLEAR ERROR
    ========================================= */

    function clearError(input) {

        const group = input.closest(".form-group");

        if (!group) return;

        group.classList.remove("has-error");

        const error = group.querySelector(".error-message");

        if (error) {
            error.textContent = "";
        }
    }


    /* =========================================
       SHOW ERROR
    ========================================= */

    function showError(input, text) {

        const group = input.closest(".form-group");

        if (!group) return;

        group.classList.add("has-error");

        const error = group.querySelector(".error-message");

        if (error) {
            error.textContent = text;
        }
    }


    /* =========================================
       VALIDATION
    ========================================= */

    function validateForm() {

        let isValid = true;

        requiredFields.forEach(field => {

            const input = document.getElementById(field.id);

            if (!input) return;

            clearError(input);

            const value = input.value.trim();

            if (!value) {

                showError(input, field.message);

                isValid = false;

                return;
            }


            /* Name validation */

            if (
                field.id === "firstName" ||
                field.id === "lastName"
            ) {

                if (value.length < 2) {

                    showError(
                        input,
                        "Please enter at least 2 characters."
                    );

                    isValid = false;
                }
            }

        });

        return isValid;
    }


    /* =========================================
       LIVE ERROR CLEARING
    ========================================= */

    requiredFields.forEach(field => {

        const input = document.getElementById(field.id);

        if (!input) return;

        input.addEventListener("input", () => {
            clearError(input);
        });

        input.addEventListener("change", () => {
            clearError(input);
        });

    });


    /* =========================================
       PAYMENT RADIO
    ========================================= */

    const paymentOptions =
        document.querySelectorAll(".payment-option");

    paymentOptions.forEach(option => {

        const radio = option.querySelector("input");

        radio.addEventListener("change", () => {

            paymentOptions.forEach(item => {
                item.classList.remove("active");
            });

            option.classList.add("active");

        });

    });


    /* =========================================
       PLACE ORDER
    ========================================= */

    form.addEventListener("submit", event => {

        event.preventDefault();

        message.textContent = "";

        message.className = "order-message";


        if (!validateForm()) {

            message.textContent =
                "Please complete the required fields.";

            message.classList.add("error");

            const firstError =
                document.querySelector(
                    ".form-group.has-error input, .form-group.has-error select"
                );

            if (firstError) {
                firstError.focus();
            }

            return;
        }


        /* Button loading */

        const originalText =
            orderButton.textContent;

        orderButton.disabled = true;

        orderButton.textContent = "Processing...";


        setTimeout(() => {

            orderButton.disabled = false;

            orderButton.textContent =
                originalText;

            message.textContent =
                "Your order has been placed successfully.";

            message.classList.add("success");

        }, 900);

    });

});