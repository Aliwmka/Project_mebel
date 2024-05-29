document.addEventListener("DOMContentLoaded", function () {
  const questions = document.querySelectorAll(".question");

  questions.forEach((question) => {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      const line = this.previousElementSibling;

      if (answer.style.display === "none") {
        answer.style.display = "block";
        line.style.transform = "translateY(50px)";
      } else {
        answer.style.display = "none";
        line.style.transform = "translateY(0)";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");

  nameInput.addEventListener("input", function () {
    this.value = this.value
      .replace(/[^a-zA-Zа-яА-ЯёЁ]/g, "")
      .replace(/\s/g, "");
    this.style.color = this.value ? "#ffffff" : "#ffffff66";
  });

  phoneInput.addEventListener("input", function () {
    let cleaned = this.value.replace(/\D/g, "");
    let formatted = "";

    if (cleaned.length > 0) {
      formatted += "(" + cleaned.substring(0, 3);
    }
    if (cleaned.length > 3) {
      formatted += ")-" + cleaned.substring(3, 6);
    }
    if (cleaned.length > 6) {
      formatted += "-" + cleaned.substring(6, 8);
    }
    if (cleaned.length > 8) {
      formatted += "-" + cleaned.substring(8, 10);
    }

    this.value = formatted;
    this.style.color = cleaned.length ? "#ffffff" : "#ffffff66";
  });
});


