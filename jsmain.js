document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('.animate-container');
  const step1Els = document.querySelectorAll('.animate-step-1');
  const step2Els = document.querySelectorAll('.animate-step-2');

  let step1Triggered = false;
  let step2Triggered = false;

  window.addEventListener('scroll', () => {
    const rect = container.getBoundingClientRect();
    const vh = window.innerHeight;

    // Этап 1
    if (rect.top < vh * 0.6 && !step1Triggered) {
      step1Els.forEach(el => el.classList.add('active'));
      step1Triggered = true;
    } else if (rect.top >= vh * 0.6 && step1Triggered) {
      step1Els.forEach(el => el.classList.remove('active'));
      step1Triggered = false;
    }

    // Этап 2
    if (rect.top < vh * 0.4 && !step2Triggered) {
      step2Els.forEach(el => el.classList.add('active'));
      step2Triggered = true;
    } else if (rect.top >= vh * 0.4 && step2Triggered) {
      step2Els.forEach(el => el.classList.remove('active'));
      step2Triggered = false;
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const containerPartners = document.querySelector('.animate-container-partners');
  const step1ElsPartners = containerPartners.querySelectorAll('.animate-step-partners-1');
  const step2ElsPartners = containerPartners.querySelectorAll('.animate-step-partners-2');

  let step1TriggeredPartners = false;
  let step2TriggeredPartners = false;

  window.addEventListener('scroll', () => {
    const rect = containerPartners.getBoundingClientRect();
    const vh = window.innerHeight;

    if (rect.top < vh * 0.6 && !step1TriggeredPartners) {
      step1ElsPartners.forEach(el => el.classList.add('active'));
      step1TriggeredPartners = true;
    } else if (rect.top >= vh * 0.6 && step1TriggeredPartners) {
      step1ElsPartners.forEach(el => el.classList.remove('active'));
      step1TriggeredPartners = false;
    }

    if (rect.top < vh * 0.4 && !step2TriggeredPartners) {
      step2ElsPartners.forEach(el => el.classList.add('active'));
      step2TriggeredPartners = true;
    } else if (rect.top >= vh * 0.4 && step2TriggeredPartners) {
      step2ElsPartners.forEach(el => el.classList.remove('active'));
      step2TriggeredPartners = false;
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');

  // Дублируем содержимое дважды для бесшовности
  track.innerHTML += track.innerHTML + track.innerHTML;

  let position = 0;
  const speed = 1; // регулируй скорость

  function animate() {
    position -= speed;
    if (Math.abs(position) >= track.scrollWidth / 3) {
      position = 0;
    }
    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }

  animate();
});

document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.quiz-step');
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');
  const countEl = document.querySelector('.quiz-step-count');
  const progressFill = document.querySelector('.quiz-progress-fill');
  const errorEl = document.getElementById('quizError');

  let currentStep = 0;
  const totalSteps = steps.length;

  function updateStep() {
    steps.forEach((step, i) => {
      step.classList.toggle('active', i === currentStep);
    });

    countEl.textContent = `${currentStep + 1}/${totalSteps}`;
    progressFill.style.width = `${((currentStep + 1) / totalSteps) * 100}%`;

    prevBtn.disabled = currentStep === 0;
    errorEl.textContent = '';

    if (currentStep === totalSteps - 1) {
      nextBtn.textContent = 'Узнать результат';
    } else {
      nextBtn.textContent = 'Далее →';
    }
  }

  nextBtn.addEventListener('click', () => {
    errorEl.textContent = '';

    const current = steps[currentStep];

    // Проверка радиокнопок
    const radios = current.querySelectorAll('input[type="radio"]');
    if (radios.length) {
      const checked = Array.from(radios).some(r => r.checked);
      if (!checked) {
        errorEl.textContent = 'Пожалуйста, заполните все обязательные поля';
        return;
      }
    }

// Проверка select
const select = current.querySelector('select');
if (select) {
  if (!select.value || select.value === "") {
    errorEl.textContent = 'Пожалуйста, заполните все обязательные поля';
    return;
  }
}


    // Последний шаг с именем и телефоном
    const nameInput = current.querySelector('#userName');
    const phoneInput = current.querySelector('#userPhone');
    if (nameInput && phoneInput) {
      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();

      if (!name || !phone) {
        errorEl.textContent = 'Пожалуйста, заполните все обязательные поля';
        return;
      }

      // Отправка на сервер
      fetch('send.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name, phone })
      })
      .then(res => {
        if (res.ok) {
          alert('Спасибо! Ваша заявка отправлена.');
        } else {
          alert('Ошибка при отправке.');
        }
      })
      .catch(() => alert('Ошибка при отправке.'));

      return;
    }

    // Переход на следующий шаг
    if (currentStep < totalSteps - 1) {
      currentStep++;
      updateStep();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      updateStep();
    }
  });

// Маска для телефона
document.addEventListener('input', (e) => {
  if (e.target.id === 'userPhone') {
    let v = e.target.value.replace(/\D/g, '');
    v = v.substring(0, 11);

    let result = '+';
    if (v.length > 0) result += v[0];
    if (v.length > 1) result += ' (' + v.slice(1, 4);
    if (v.length > 4) result += ') ' + v.slice(4, 7);
    if (v.length > 7) result += '-' + v.slice(7, 9);
    if (v.length > 9) result += '-' + v.slice(9, 11);

    e.target.value = result;
  }
});


  updateStep();
});

document.addEventListener("DOMContentLoaded", () => {
  const containerProduction = document.querySelector('.animate-container-production');
  if (!containerProduction) return;

  const step1ElsProduction = containerProduction.querySelectorAll('.animate-step-production-1');
  const step2ElsProduction = containerProduction.querySelectorAll('.animate-step-production-2');

  let step1TriggeredProduction = false;
  let step2TriggeredProduction = false;

  window.addEventListener('scroll', () => {
    const rect = containerProduction.getBoundingClientRect();
    const vh = window.innerHeight;

    // Trigger step 1 at ~60% of viewport
    if (rect.top < vh * 0.6 && !step1TriggeredProduction) {
      step1ElsProduction.forEach(el => el.classList.add('active'));
      step1TriggeredProduction = true;
    } else if (rect.top >= vh * 0.6 && step1TriggeredProduction) {
      step1ElsProduction.forEach(el => el.classList.remove('active'));
      step1TriggeredProduction = false;
    }

    // Trigger step 2 at ~50% of viewport
    if (rect.top < vh * 0.5 && !step2TriggeredProduction) {
      step2ElsProduction.forEach(el => el.classList.add('active'));
      step2TriggeredProduction = true;
    } else if (rect.top >= vh * 0.5 && step2TriggeredProduction) {
      step2ElsProduction.forEach(el => el.classList.remove('active'));
      step2TriggeredProduction = false;
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector('.production-video-element');
  const playButton = document.querySelector('.production-play-button');

  playButton.addEventListener('click', () => {
    video.play();
    playButton.style.display = 'none';
  });
});

const track = document.querySelector('.slider-track');
const btnPrev = document.querySelector('.slider-btn.prev');
const btnNext = document.querySelector('.slider-btn.next');
let offset = 0;
const cardWidth = 300 + 16; // width + gap

btnNext.addEventListener('click', () => {
  offset -= cardWidth * 2;
  maxScroll();
  track.style.transform = `translateX(${offset}px)`;
});

btnPrev.addEventListener('click', () => {
  offset += cardWidth * 2;
  maxScroll();
  track.style.transform = `translateX(${offset}px)`;
});

function maxScroll() {
  const maxOffset = -(track.scrollWidth - document.querySelector('.slider').clientWidth);
  if (offset < maxOffset) offset = maxOffset;
  if (offset > 0) offset = 0;
}

// Drag to scroll
let isDown = false;
let startX;
let scrollX;

track.addEventListener('mousedown', (e) => {
  isDown = true;
  track.classList.add('dragging');
  startX = e.pageX - offset;
});

track.addEventListener('mouseleave', () => {
  isDown = false;
  track.classList.remove('dragging');
});

track.addEventListener('mouseup', () => {
  isDown = false;
  track.classList.remove('dragging');
});

track.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  offset = e.pageX - startX;
  maxScroll();
  track.style.transform = `translateX(${offset}px)`;
});

document.addEventListener("DOMContentLoaded", () => {
  const containerLabels = document.querySelector('.animate-container-labels');
  const step1ElsLabels = containerLabels.querySelectorAll('.animate-step-labels-1');
  const step2ElsLabels = containerLabels.querySelectorAll('.animate-step-labels-2');

  let step1TriggeredLabels = false;
  let step2TriggeredLabels = false;

  window.addEventListener('scroll', () => {
    const rect = containerLabels.getBoundingClientRect();
    const vh = window.innerHeight;

    if (rect.top < vh * 0.6 && !step1TriggeredLabels) {
      step1ElsLabels.forEach(el => el.classList.add('active'));
      step1TriggeredLabels = true;
    } else if (rect.top >= vh * 0.6 && step1TriggeredLabels) {
      step1ElsLabels.forEach(el => el.classList.remove('active'));
      step1TriggeredLabels = false;
    }

    if (rect.top < vh * 0.4 && !step2TriggeredLabels) {
      step2ElsLabels.forEach(el => el.classList.add('active'));
      step2TriggeredLabels = true;
    } else if (rect.top >= vh * 0.4 && step2TriggeredLabels) {
      step2ElsLabels.forEach(el => el.classList.remove('active'));
      step2TriggeredLabels = false;
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const containerContacts = document.querySelector('.animate-container-contacts');
  if (!containerContacts) return;

  const step1ElsContacts = containerContacts.querySelectorAll('.animate-step-contacts-1');
  const step2ElsContacts = containerContacts.querySelectorAll('.animate-step-contacts-2');

  let step1TriggeredContacts = false;
  let step2TriggeredContacts = false;

  window.addEventListener('scroll', () => {
    const rect = containerContacts.getBoundingClientRect();
    const vh = window.innerHeight;

    // Trigger step 1 at ~60% of viewport
    if (rect.top < vh * 0.6 && !step1TriggeredContacts) {
      step1ElsContacts.forEach(el => el.classList.add('active'));
      step1TriggeredContacts = true;
    } else if (rect.top >= vh * 0.6 && step1TriggeredContacts) {
      step1ElsContacts.forEach(el => el.classList.remove('active'));
      step1TriggeredContacts = false;
    }

    // Trigger step 2 at ~50% of viewport
    if (rect.top < vh * 0.5 && !step2TriggeredContacts) {
      step2ElsContacts.forEach(el => el.classList.add('active'));
      step2TriggeredContacts = true;
    } else if (rect.top >= vh * 0.5 && step2TriggeredContacts) {
      step2ElsContacts.forEach(el => el.classList.remove('active'));
      step2TriggeredContacts = false;
    }
  });
});


// Плавный скролл к секции "Викторина"
document.addEventListener('DOMContentLoaded', () => {
  const scrollButtons = document.querySelectorAll('.shine-button');

  scrollButtons.forEach(button => {
    button.addEventListener('click', () => {
      const quizSection = document.getElementById('quiz');
      if (quizSection) {
        quizSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
