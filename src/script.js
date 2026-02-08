function generatePoem(event) {
  event.preventDefault();

  new Typewriter("#outPutInfo", {
    strings: "Hello Mandi",
    autoStart: true,
    delay: 1,
    cursor: "",
  });

  let tryTheseElement = document.querySelector("#try-these");
  tryTheseElement.classList.add("hidden-buttons");
}

let poemFormElement = document.querySelector("#poem-form-generator");
poemFormElement.addEventListener("submit", generatePoem);
