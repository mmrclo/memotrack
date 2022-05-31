let formElement = document.createElement("form");
formElement.setAttribute("id", "nameform");

let fieldName = document.createElement("input");
fieldName.setAttribute("type", "text");
fieldName.setAttribute("id", "iname");
fieldName.setAttribute("placeholder", "Insert Name");
fieldName.setAttribute("required", "required");

let buttonSub = document.createElement("button");
buttonSub.setAttribute("id", "insertName-btn");
buttonSub.textContent = "Ok";

formElement.appendChild(fieldName);
formElement.appendChild(buttonSub);

export default formElement;