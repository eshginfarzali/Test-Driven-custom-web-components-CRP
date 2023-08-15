
import  {validate}  from "./email-validator.js";

const JoinUsSection = (function () {
	const createSection = (titleText, buttonText) => {
		const joinProgramSection = document.createElement("section");
		joinProgramSection.id = "join-our-program";
		joinProgramSection.innerHTML = `
      <h2>${titleText}</h2>
      <h3>Sed do eiusmod tempor incididunt <br />ut labore et dolore magna aliqua.</h3>
      <form id="join-form">
        <input type="email" name="email" placeholder="Enter your email" required />
        <button id="subbtn" class="join-team-btn" type="submit">${buttonText}</button>
      </form>
    `;

		const joinForm = joinProgramSection.querySelector("#join-form");
		const joinButton = joinProgramSection.querySelector(".join-team-btn");
		const emailInput = joinForm.querySelector("input[name=\"email\"]");
		joinForm.addEventListener("submit", async function (event) {
			event.preventDefault();

			const enteredEmail = emailInput.value;

			console.log("Entered email:", enteredEmail);

			if (validate(enteredEmail)) {
				try {
					joinButton.disabled = true;
					joinButton.style.opacity = 0.5;

					const response = await fetch("http://localhost:3000/subscribe", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email: enteredEmail })
					});

					if (response.ok) {
						emailInput.style.display = "none";
						joinButton.textContent = "Unsubscribe";
						localStorage.setItem("isSubscribed", "true");
						localStorage.setItem("subscriptionEmail", enteredEmail);
					} else {
						const responseData = await response.json();
						if (response.status === 422 && responseData.error) {
							alert("Error: " + responseData.error);
						} else {
							alert("Server error: " + responseData.message);
						}
					}
				} catch (error) {
					console.error("Error sending email to server:", error);
					alert("An error occurred while sending email to the server.");
				} finally {
					joinButton.disabled = false;
					joinButton.style.opacity = 1;
				}
			} else {
				alert("Invalid email. Please enter a valid email address.");
			}
			emailInput.value = "";
		});

		joinButton.addEventListener("click", async function () {
			if (joinButton.textContent === "Unsubscribe" && !joinButton.disabled) {
				try {
					joinButton.disabled = true;
					joinButton.style.opacity = 0.5;

					const response = await fetch("http://localhost:3000/unsubscribe", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email: emailInput.value })
					});
					if (response.ok) {
						joinForm.style.display = "flex";
						emailInput.style.display = "block";
						joinButton.textContent = "Subscribe";
						localStorage.removeItem("isSubscribed");
						localStorage.removeItem("subscriptionEmail");
					} else {
						const responseData = await response.json();
						if (response.status === 422 && responseData.error) {
							alert("Error: " + responseData.error);
						} else {
							alert("Server error: " + responseData.message);
						}
					}
				} catch (error) {
					console.error("Error unsubscribing:", error);
					alert("An error occurred while unsubscribing.");
				} finally {
					joinButton.disabled = false;
					joinButton.style.opacity = 1;
				}
			}
		});

		const savedEmail = localStorage.getItem("subscriptionEmail");
		if (savedEmail) {
			emailInput.value = savedEmail;
		}

		const isSubscribed = localStorage.getItem("isSubscribed");
		if (isSubscribed === "true") {
			emailInput.style.display = "none";
			joinButton.textContent = "Unsubscribe";
			joinForm.style.display = "flex";
		}

		return {
			section: joinProgramSection,
			removeSection: function () {
				joinProgramSection.remove();
			}
		};
	};

	return {
		createStandardSection: function () {
			return createSection("Join Our Program", "Subscribe");
		},
		createAdvancedSection: function () {
			return createSection(
				"Join Our Advanced Program",
				"Subscribe to Advanced Program"
			);
		}
	};
})();

export default JoinUsSection;
