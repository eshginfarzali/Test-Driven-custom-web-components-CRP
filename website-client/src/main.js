import JoinUsSection from "./join-us-section.js";
//eslint-disable-next-line
import './styles/style.css';
import "./styles/normalize.css";

/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */


document.addEventListener("DOMContentLoaded", async function () {
	const joinSection = JoinUsSection.createStandardSection();

	// eslint-disable-next-line semi
	document.body.appendChild(joinSection.section)

	const heartSection = document.getElementById("heart-section");          
	heartSection.insertAdjacentElement("afterend", joinSection.section);
  
	const cardsContainer = document.querySelector(".app-section_cards");
	try {
		const response = await fetch("http://localhost:3000/community");
		const userData = await response.json();

		userData.forEach(user => {
			const card = document.createElement("div");
			card.classList.add("app-section_cards_card");

			card.innerHTML = `
        <img class="app-section_cards_card--img" src="${user.avatar}" alt="" />
        <p class="app-section_cards_card--p">
        Aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat
        nulla pariatur.
        </p>
        <author class="app-section_cards_card--aut">${user.firstName} ${user.lastName}</author>
        <p class="app-section_cards_card--info">
          ${user.position}
        </p>
      `;

			cardsContainer.appendChild(card);
		});
	} catch (error) {
		console.error("Error fetching data:", error);
	}

});
