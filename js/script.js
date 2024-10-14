// deklarasi inputan dan tombol
const userInputField = document.getElementById("user-input");
const generateButton = document.getElementById("generate-password");
const hasilPasswordElement = document.getElementById("hasil-password");

// deklarasi untuk password
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-={}:<>?";

//generate password unik
function generatePassword(input) {
  const password = [];
  const inputLength = input.length;
  const passwordLength = Math.max(12, inputLength);

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * 4);
    let char;

    switch (randomIndex) {
      case 0:
        char = uppercaseLetters.charAt(
          Math.floor(Math.random() * uppercaseLetters.length)
        );
        break;
      case 1:
        char = lowercaseLetters.charAt(
          Math.floor(Math.random() * lowercaseLetters.length)
        );
        break;
      case 2:
        char = numbers.charAt(Math.floor(Math.random() * numbers.length));
        break;
      case 3:
        char = symbols.charAt(Math.floor(Math.random() * symbols.length));
        break;
    }

    //random mix pw
    if (i < inputLength) {
      password.push(input.charAt(i));
    } else {
      password.push(char);
    }
  }

  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join("");
}

// button dan sweet alert
generateButton.addEventListener("click", () => {
  const userInput = userInputField.value;
  if (userInput.length < 1) {
    Swal.fire({
      title: "Error!",
      text: "Masukkan password Anda!",
      icon: "error",
      confirmButtonText: "OK",
    });
  } else {
    const password = generatePassword(userInput);
    hasilPasswordElement.textContent = password;

    // Copy
    const copyButton = document.createElement("button");
    copyButton.textContent = "Salin";
    copyButton.className = "copy-button";
    copyButton.onclick = async () => {
      try {
        await navigator.clipboard.writeText(password);
        Swal.fire({
          title: "Success!",
          text: "Password telah disalin ke clipboard!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Gagal menyalin password ke clipboard!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    // Reset button
    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset";
    resetButton.className = "reset-button";
    resetButton.onclick = () => {
      userInputField.value = "";
      hasilPasswordElement.textContent = "";
      copyButton.remove();
      resetButton.remove();
    };

    hasilPasswordElement.parentNode.appendChild(copyButton);
    hasilPasswordElement.parentNode.appendChild(resetButton);
  }
});
