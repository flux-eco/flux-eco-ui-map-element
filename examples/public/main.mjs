import {FluxEcoUiMapElement} from "./../src/FluxEcoUiMapElement.mjs";
import "./../definitions/types.mjs";


const parentElement = document.createElement("div");
parentElement.style.width = "600px";
parentElement.style.height = "600px";
document.body.appendChild(parentElement);

const jsonComponent = await fetch("component.json");
const component = await jsonComponent.json();
console.log(component.configs);
const configs = await component.configs;

const idPath = "some/id-path";

const element = await FluxEcoUiMapElement.new(idPath, configs);
element.render(parentElement);