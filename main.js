// password container
const passwordContainer = document.querySelector(".password-container");
const passwordElement = passwordContainer.querySelector("#password");
const copyIcon = passwordContainer.querySelector("img");

//character length text container
const characterLengthContainer = document.querySelector(
  ".character-length-container"
);
let passwordLength = characterLengthContainer.querySelector("#password-length");
let passwordLengthInput = characterLengthContainer.querySelector("input");
console.log(passwordLengthInput);

// checkbox container
const checkboxContainer = document.querySelector(".checkbox-container");
const upperCaseCheck = checkboxContainer.querySelector("#include-upper-case");
const lowerCaseCheck = checkboxContainer.querySelector("#include-lower-case");
const numbersCheck = checkboxContainer.querySelector("#include-numbers");
const symbolsCheck = checkboxContainer.querySelector("#include-symbols");

//strength container
const strengthContainer = document.querySelector(".strength-container");
const strengthElement = strengthContainer.querySelector("#strength");
const strengthVisual = strengthContainer.querySelectorAll(".visual-item");

//buttons
const generateButton = document.querySelector("#generate-button");
const copyButton = document.querySelector("#copy-icon");
const copyMessage = document.querySelector("#copied");

//character length set up
var setCharacterLength = (e) => {};

passwordLengthInput.addEventListener("input", (e) => {
  passwordLength.textContent = e.currentTarget.value;
});

//generate password
var generatePassword = (selectedCheckboxes) => {
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/`~";

  let password = "";

  passwordLength = parseInt(passwordLengthInput.value);
  let range = 0;
  console.log(passwordLength);

  selectedCheckboxes.forEach((checkbox) => {
    if (checkbox.id === "include-numbers") {
      range += 10;
    } else if (checkbox.id === "include-symbols") {
      range += 36;
    } else {
      range += 20;
    }
  });
  for (let i = 0; i < passwordLength; i++) {
    let randomIndex = Math.floor(Math.random() * selectedCheckboxes.length);
    let randomCheckbox = selectedCheckboxes[randomIndex];
    console.log(randomCheckbox);
    if (randomCheckbox.id === "include-upper-case") {
      password += getRandomCharFromString(uppercaseLetters);
    } else if (randomCheckbox.id === "include-lower-case") {
      password += getRandomCharFromString(lowercaseLetters);
    } else if (randomCheckbox.id === "include-numbers") {
      password += getRandomCharFromString(numbers);
    } else {
      password += getRandomCharFromString(symbols);
    }
  }
  console.log(password);
  passwordElement.textContent = password;
  passwordElement.classList.add("generated");
  setStrength(passwordLength, range);
};

//method that resets the strength back to defautl
var resetStrength = () => {
  strengthVisual.forEach((item) => {
    item.classList.remove(...item.classList);
    item.classList.add("visual-item");
  });
};
//checking password strength using my own algorithm
var setStrength = (passwordLength, range) => {
  resetStrength();
  const strength = passwordLength * Math.log2(range);
  if (strength <= 35) {
    for (let i = 0; i <= 3; i++) {
      strengthVisual[i].classList.add("red");
      if (i >= 1) {
        strengthVisual[i].classList.add("empty");
      }
    }
    strengthElement.textContent = "TOO WEAK!";
  } else if (strength <= 59) {
    for (let i = 0; i <= 3; i++) {
      strengthVisual[i].classList.add("orange");
      if (i >= 2) {
        strengthVisual[i].classList.add("empty");
      }
    }
    strengthElement.textContent = "WEAK";
  } else if (strength <= 119) {
    for (let i = 0; i <= 3; i++) {
      strengthVisual[i].classList.add("yellow");
      if (i >= 3) {
        strengthVisual[i].classList.add("empty");
      }
    }
    strengthElement.textContent = "MEDIUM";
  } else {
    for (let i = 0; i <= 3; i++) {
      strengthVisual[i].classList.add("green");
    }
    strengthElement.textContent = "STRONG";
  }
};

//method that retuns a random char from a string
var getRandomCharFromString = (string) => {
  const index = Math.floor(Math.random() * string.length);
  return string.charAt(index);
};

//handle generate button
var handleGenerateButton = (e) => {
  const selectedCheckboxes =
    checkboxContainer.querySelectorAll("input:checked");
  console.log(selectedCheckboxes);
  generatePassword(selectedCheckboxes);
  copyMessage.add("hidden");
};
generateButton.addEventListener("click", handleGenerateButton);

//handle copy link button
var handleCopyButton = (e) => {
  const tempTextarea = document.createElement("textarea");
  tempTextarea.value = passwordElement.textContent;
  document.body.appendChild(tempTextarea);
  tempTextarea.select();
  tempTextarea.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(tempTextarea);
  copyMessage.classList.remove("hidden");
};

copyIcon.addEventListener("click", handleCopyButton);
