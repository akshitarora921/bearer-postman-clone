import axios from "axios";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const form = document.querySelector("[data-form]");
const queryParamsContainer = document.querySelector("[data-query-params]");
const requestHeadersContainer = document.querySelector(
  "[data-request-headers]"
);
const keyValuePairTemplate = document.querySelector(
  "[data-key-value-template]"
);

document
  .querySelector("[data-add-query-params-btn]")
  .addEventListener("click", (e) => {
    queryParamsContainer.append(createKeyValuePair());
  });
document
  .querySelector("[data-add-request-headers-btn]")
  .addEventListener("click", (e) => {
    requestHeadersContainer.append(createKeyValuePair());
  });
queryParamsContainer.append(createKeyValuePair());
requestHeadersContainer.append(createKeyValuePair());

form.addEventListener("submit", (e) => {
  e.preventDefault();
  axios({
    url: document.querySelector("[data-url]").value,
    method: document.querySelector("[data-method]").value,
    params: keyValuePairToObject(queryParamsContainer),
    headers: keyValuePairToObject(requestHeadersContainer),
  }).then((data) => console.log(data));
});

function createKeyValuePair() {
  const element = keyValuePairTemplate.content.cloneNode(true);
  element.querySelector("[data-remove-btn]").addEventListener("click", (e) => {
    e.target.closest("[data-key-value-pair]").remove();
  });
  return element;
}

function keyValuePairToObject(container) {
  const pairs = container.querySelectorAll("[data-key-value-pair]");
  return [...pairs].reduce((data, pair) => {
    const key = pair.querySelector("[data-key]").value;
    const value = pair.querySelector("[data-value]").value;
    if (key === "") return data;
    return { ...data, [key]: value };
  }, {});
}
