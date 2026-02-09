function setupTryTheseButtons() {
  let tryTheseContainer = document.querySelector("#try-these");
  let tryButtons = tryTheseContainer.querySelectorAll("button");

  tryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let instructionsInput = document.querySelector("#user-instructions");

      instructionsInput.value = button.textContent;

      document.querySelector("#poem-form-generator").requestSubmit();
    });
  });
}

function displayOutPut(response) {
  new Typewriter("#outPutInfo", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

function addToRecent(text) {
  let recentList = document.querySelector("#recent-list");

  let preview = text.length > 35 ? text.slice(0, 35) + "…" : text;

  if (recentList.textContent.includes("No Recent Generations")) {
    recentList.innerHTML = "";
  }

  recentList.innerHTML = `<li>${preview}</li>` + recentList.innerHTML;
}

function generatePoem(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");
  let apiKey = "cfabea60f0eoe0t3bb3e16a70e85e14b";
  let prompt = `User instructions: Generate precise, short information about ${instructionsInput.value}`;
  let context =
    "You are Jobify, an AI job application assistant. " +
    "You help users write simple CVs and cover letters. " +
    "Keep responses short, clear, and professional. " +
    "Always add a Heading " +
    "Start a new sentence on a new line" +
    "Return ONLY HTML. No markdown. No bullet symbols. " +
    "Use <br> for every new line. " +
    "Use simple, clear, professional wording. " +
    "End with: Do you need any more help?";
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  axios.get(apiUrl).then(displayOutPut);

  let headerDescription = document.querySelector("#header-description");
  headerDescription.classList.add("hidden-buttons");
  let tryTheseElement = document.querySelector("#try-these");
  tryTheseElement.classList.add("hidden-buttons");

  let generatingElement = document.querySelector("#outPutInfo");
  generatingElement.innerHTML = `⌛Generating ${instructionsInput.value}...`;
  generatingElement.classList.add("generating");

  let input = document.querySelector(".instructions");
  let text = input.value.trim();

  if (!text) return;

  addToRecent(text);

  input.value = "";
}

let poemFormElement = document.querySelector("#poem-form-generator");
poemFormElement.addEventListener("submit", generatePoem);

setupTryTheseButtons();
