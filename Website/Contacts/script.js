document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const contactSubmitButton = document.getElementById('contact-submit');
  const contactModal = document.getElementById('contact-modal');
  const contactCloseModalButton = document.getElementById('contact-closeModal');

  if (nameInput && phoneInput && contactSubmitButton && contactModal && contactCloseModalButton) {
      nameInput.addEventListener("input", function () {
          this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, "").replace(/\s/g, "");
          this.style.color = this.value ? "#000000" : "#ffffff66";
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
          this.style.color = cleaned.length ? "#000000" : "#ffffff66";
      });

      contactSubmitButton.addEventListener('click', async function() {
          const name = nameInput.value;
          const phone = phoneInput.value;

          const response = await fetch('http://localhost:3000/api/requests', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name, phone })
          });

          if (response.ok) {
              // Очистить поля ввода
              nameInput.value = '';
              phoneInput.value = '';

              // Показать модальное окно
              contactModal.style.display = 'block';
          } else {
              alert('Ошибка при отправке заявки');
          }
      });

      contactCloseModalButton.addEventListener('click', function() {
          contactModal.style.display = 'none';
      });
  } else {
      console.error('Some elements for modal handling not found');
  }
});
