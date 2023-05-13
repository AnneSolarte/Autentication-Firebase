import { dispatch } from "../../store";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/navigation";
import Firebase from "../../utils/firebase";

const credentials = { email: "", password: "" };

export default class SignUp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  async handleLoginButton() {
    Firebase.registerUser(credentials);
    dispatch(navigate(Screens.LOGIN));
  }

  render() {
    const title = this.ownerDocument.createElement("h1");
    title.innerText = "Welcome noob! please sign up";
    this.shadowRoot?.appendChild(title);

    const email = this.ownerDocument.createElement("input");
    email.placeholder = "email";
    email.type = "email";
    email.addEventListener(
      "change",
      (e: any) => (credentials.email = e.target.value)
    );
    this.shadowRoot?.appendChild(email);

    const password = this.ownerDocument.createElement("input");
    password.placeholder = "*********";
    password.type = "password";
    password.addEventListener(
      "change",
      (e: any) => (credentials.password = e.target.value)
    );
    this.shadowRoot?.appendChild(password);

    const loginBtn = this.ownerDocument.createElement("button");
    loginBtn.innerText = "login";
    loginBtn.addEventListener("click", this.handleLoginButton);
    this.shadowRoot?.appendChild(loginBtn);
  }
}

customElements.define("app-signup", SignUp);
