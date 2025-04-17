const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault(); 

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (name && email && message) {
    // Сохранение данных в LocalStorage
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("message", message);

    alert("Ваше сообщение успешно сохранено!");
    contactForm.reset(); // Очищаем форму
  } else {
    alert("Пожалуйста, заполните все поля формы");
  }
});

// Получаем ссылку на элемент, который будет анимироваться
const aboutText = document.querySelector('.about-text'); 

// Создаем анимацию
aboutText.classList.add("animated-text"); 

// Определение стилей анимации
const animatedText = document.createElement('style'); 
animatedText.innerHTML = `
  .animated-text {
    animation: move-text 3s linear infinite; 
  }
  @keyframes move-text {
    0% { transform: translateX(0); } 
    50% { transform: translateX(10px); }
    100% { transform: translateX(0); } 
  }
`;
document.head.appendChild(animatedText);


const form = document.getElementById('feedback-form');
const responseDiv = document.getElementById('feedback-response');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Предотвращаем стандартную отправку формы

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Отображаем уведомление о том, что данные отправлены
  responseDiv.innerHTML = 'Спасибо за ваш отзыв! Мы скоро свяжемся с вами.';

  // Очищаем форму (необязательно)
  form.reset(); 
});


$(document).ready(function() {
  // Эффект изменения прозрачности
  $('#fade-button').click(function() {
      $('#fade-text').fadeToggle(1000); // Изменяем прозрачность текста
  });

  // Анимация увеличения текста
  $('#scale-button').click(function() {
      $('#scale-text').animate({ fontSize: '40px' }, 500).animate({ fontSize: '24px' }, 500); // Увеличиваем и возвращаем размер текста
  });

  // Изменение цвета текста по клику
  $('#color-text').click(function() {
      $(this).css('color', getRandomColor()); // Меняем цвет текста на случайный
  });

  // Эффект "печати"
  $('#typing-button').click(function() {
      const text = "Это текст с эффектом печати.";
      $('#typing-effect').text(''); // Очищаем предыдущий текст
      let index = 0;

      function type() {
          if (index < text.length) {
              $('#typing-effect').append(text.charAt(index)); // Добавляем один символ
              index++;
              setTimeout(type, 100); // Задержка между символами
          }
      }

      type();
  });

  // Перемещение изображения
  $('#move-button').click(function() {
      $('#move-image').animate({ left: '+=100px' }, 1000); // Перемещаем изображение вправо
  });

  // Функция для генерации случайного цвета
  function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }

  // Обработка события наведения на элемент
  $('.text-effect').hover(
      function() {
          $(this).css('font-size', '28px'); // Увеличиваем размер текста при наведении
      },
      function() {
          $(this).css('font-size', '24px'); // Возвращаем размер текста при уходе
      }
  );

  // Изменение масштаба изображения при наведении
  $('#move-image').hover(
      function() {
          $(this).css('transform', 'scale(1.1)'); // Увеличиваем изображение
      },
      function() {
          $(this).css('transform', 'scale(1)'); // Возвращаем размер изображения
      }
  );
});
