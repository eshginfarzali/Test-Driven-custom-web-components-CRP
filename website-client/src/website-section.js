class WebsiteSection extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
          }
          .app-title {
            font-size: 3.25rem;
            line-height: 3.2rem;
            text-align: center;
          }
          .app-subtitle {
            font-size: 1.5rem;
            line-height: 1.625rem;
            font-weight: 300;
            text-align: center;
            font-family: "Source Sans Pro", sans-serif, Arial;
          }
          .join-team-title {
            width: 262px;
            height: 125px;
            flex-shrink: 0;
            color: #464547;
            font-family: Oswald;
            font-size: 48px;
            font-style: normal;
            font-weight: 700;
            line-height: 64px;
          }
          .join-team-info {
            width: 441px;
            height: 127px;
            flex-shrink: 0;
            color: #666;
            font-family: Source Sans Pro;
            font-size: 24px;
            font-style: normal;
            font-weight: 400;
            line-height: 32px;
          }
          .btn-join {
            margin: auto;
            display: flex;
            justify-content: center;
          }
          .btn-join > .order2 {
            order: 1;
          }
          .join-team-btn {
            width: 144px;
            height: 36px;
            flex-shrink: 0;
            border-radius: 18px;
            background: #55c2d8;
            color: #fff;
            text-align: center;
            font-family: Oswald;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 26px;
            letter-spacing: 1.4px;
            border: none;
            cursor: pointer;
          }
          @media only screen and (max-width: 768px) {
            .join-team-title {
              width: 100%;
              text-align: center;
            }
            .join-team-info {
              width: 95%;
              text-align: center;
            }
            .join-team-btn {
              display: flex;
              justify-content: center;
              align-content: center;
              align-items: center;
              margin: auto;
              margin-top: 20px;
            }
          }
        </style>

        ${
	this.getAttribute("data-status") === "liberating" 
          
		? `
            ${
	this.getAttribute("data-lib") === "one-lib"
		? "<slot></slot>"
		: ""
}    
              <div>
                <h1 class="join-team-title">
                  ${this.getAttribute("title")}
                </h1>
                <h2 class="join-team-info">
                  ${this.getAttribute("description")}
                </h2>
                <div class="btn-join">
                  <button class="join-team-btn">JOIN OUR TEAM</button>
                </div>
              </div>
              ${
	this.getAttribute("data-lib") === "two-lib"
		? "<slot></slot>"
		: ""
}
            `
//other components          
		:` ${this.getAttribute("data-heart")==="true"
			?"<slot></slot>"
			:""
		}
          <h1 class="app-title">
            ${this.getAttribute("title")}
          </h1>
          ${
	this.getAttribute("data-status") === "true"
		? "<slot></slot>"
		: ""}
        
          <h2 class="app-subtitle">
            ${this.getAttribute("description")}
          </h2>
          <slot></slot>
        `
}
      `;
	}
}
  
customElements.define("website-section", WebsiteSection);