document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. Логика мобильного бургер-меню --- */
  const burgerBtn = document.getElementById('burgerBtn');
  const mainNav = document.getElementById('mainNav');

  if (burgerBtn && mainNav) {
    burgerBtn.addEventListener('click', () => {
      burgerBtn.classList.toggle('active');
      mainNav.classList.toggle('open');
    });

    // Закрываем меню при клике по пункту навигации
    const navLinks = mainNav.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        burgerBtn.classList.remove('active');
        mainNav.classList.remove('open');
      });
    });
  }

  /* --- 2. Логика счётчиков количества («−» и «+») --- */
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const minusBtn = card.querySelector('.counter__btn--minus');
    const plusBtn = card.querySelector('.counter__btn--plus');
    const input = card.querySelector('.counter__input');

    if (minusBtn && plusBtn && input) {
      minusBtn.addEventListener('click', () => {
        let val = parseInt(input.value, 10) || 1;
        if (val > 1) {
          input.value = val - 1;
        }
      });

      plusBtn.addEventListener('click', () => {
        let val = parseInt(input.value, 10) || 1;
        if (val < 99) {
          input.value = val + 1;
        }
      });
    }

    /* --- 3. Кнопка «В корзину» и Toast-уведомление --- */
    const buyBtn = card.querySelector('.card__btn-buy');
    if (buyBtn && input) {
      buyBtn.addEventListener('click', () => {
        const titleEl = card.querySelector('.card__title');
        // Очищаем название от лишних переносов строк
        const productName = titleEl ? titleEl.innerText.replace(/\n+/g, ' ').trim() : 'Товар';
        const qty = parseInt(input.value, 10) || 1;

        // Вывод в консоль
        console.log(`[Корзина] Добавлено: "${productName}" в количестве: ${qty} шт.`);

        // Всплывающее Toast-уведомление
        showToast(`Добавлено: ${productName} (${qty} шт.)`);
      });
    }
  });

  /* --- Функция отображения Toast-уведомления --- */
  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');

    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

});