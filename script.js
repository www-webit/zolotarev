// script.js
// ====== ЗАМЕНИТЕ НА СВОИ ДАННЫЕ TELEGRAM ======
const BOT_TOKEN = '8941011307:AAFIRiu5b2zWWRxmbc9AxTMCi-7Rp9ZhKFM';
const CHAT_ID = '8308485818';
// ============================================

(function() {
  // Модальное окно и форма
  const modalOverlay = document.getElementById('modal-overlay');
  const modal = document.getElementById('modal');
  const errorModal = document.getElementById('error-modal');
  const modalTrigger = document.getElementById('modal-trigger');
  const modalClose = document.getElementById('modal-close');
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  function openModal() {
    modalOverlay.classList.add('active');
    modal.style.display = 'block';
    errorModal.style.display = 'none';
    formSuccess.style.display = 'none';
    contactForm.style.display = 'flex';
    contactForm.reset();
  }
  function closeModal() {
    modalOverlay.classList.remove('active');
    modal.style.display = 'none';
    errorModal.style.display = 'none';
  }
  modalTrigger.addEventListener('click', openModal);
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

  // Отправка в Telegram
  async function sendToTelegram(text) {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'HTML'
      })
    });
    if (!res.ok) throw new Error('Telegram API error');
    return res.json();
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';

    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const contact = formData.get('contact').trim();
    const message = formData.get('message').trim();

    const text = `<b>Новая заявка с сайта!</b>\n👤 Имя: ${name}\n📞 Контакт: ${contact}\n📝 Сообщение: ${message || 'не указано'}`;

    try {
      await sendToTelegram(text);
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
    } catch (err) {
      console.error('Ошибка отправки:', err);
      modal.style.display = 'none';
      errorModal.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Отправить';
    }
  });

  // ===== ОСТАЛЬНОЙ ФУНКЦИОНАЛ (кейсы, отзывы, тарифы, анимации) =====
  const cases = [
    { title: "Интернет-магазин автотоваров", desc: "Перезапустили каталог, переработали корзину", img: "https://picsum.photos/id/1072/600/340", metric: "Конверсия в заявку +180%", tech: "Next.js, Stripe" },
    { title: "Лендинг премиальной недвижимости", desc: "Продающий лендинг с виртуальным туром", img: "https://picsum.photos/id/106/600/340", metric: "Заявки выросли в 3,5 раза", tech: "React, Three.js" },
    { title: "Сайт AI-стартапа", desc: "Презентация продукта с интерактивными анимациями", img: "https://picsum.photos/id/201/600/340", metric: "Скорость загрузки 0,8 с", tech: "Next.js, Framer Motion" },
    { title: "Корпоративный сайт клиники", desc: "Многостраничный сайт с онлайн-записью", img: "https://picsum.photos/id/301/600/340", metric: "Записи через сайт +70%", tech: "TypeScript, Node.js" }
  ];
  const reviews = [
    { name: "Алексей Морозов", project: "FinTech", text: "Сайт принёс первых клиентов через 2 дня после запуска.", avatar: "https://i.pravatar.cc/150?img=1" },
    { name: "Елена Смирнова", project: "Real Estate", text: "Профессиональный подход, всё чётко и в срок. Рекомендую.", avatar: "https://i.pravatar.cc/150?img=5" },
    { name: "Дмитрий Ковалёв", project: "AI Startup", text: "Павел глубоко погрузился в продукт. Результат превзошёл ожидания.", avatar: "https://i.pravatar.cc/150?img=3" },
    { name: "Ольга Никитина", project: "E-commerce", text: "Магазин работает идеально, заказы пошли сразу.", avatar: "https://i.pravatar.cc/150?img=9" }
  ];
  const tariffs = [
    {
      title: "Лендинг",
      price: "3 890 ₽",
      oldPrice: "19 900 ₽",
      features: ["Анализ аудитории", "Уникальный дизайн", "Адаптивная вёрстка", "5 правок бесплатно"],
      popular: false
    },
    {
      title: "Бизнес",
      price: "5 499 ₽",
      oldPrice: "35 900 ₽",
      features: ["Всё из «Лендинг»", "До 7 уникальных страниц", "Безлимит правок"],
      popular: true
    },
    {
      title: "Премиум",
      price: "10 000 ₽",
      oldPrice: "65 900 ₽",
      features: ["Всё из «Бизнес»", "Индивидуальный функционал", "Анимации high-end", "Безлимит правок"],
      popular: false
    }
  ];

  function renderCases() {
    document.getElementById('cases-grid').innerHTML = cases.map(c => `
      <div class="case-card">
        <img src="${c.img}" alt="${c.title}" loading="lazy">
        <div class="case-body">
          <h3>${c.title}</h3>
          <p style="opacity:0.8;">${c.desc}</p>
          <div class="case-metric">${c.metric}</div>
          <small style="opacity:0.6;">Стек: ${c.tech}</small>
        </div>
      </div>
    `).join('');
  }

  function renderReviews() {
    document.getElementById('reviews-grid').innerHTML = reviews.map(r => `
      <div class="review-card">
        <div class="review-header">
          <img src="${r.avatar}" alt="${r.name}" class="review-avatar" loading="lazy">
          <div>
            <strong>${r.name}</strong>
            <div style="color:#ffd700">★★★★★</div>
          </div>
        </div>
        <p style="margin:1rem 0; line-height:1.6">«${r.text}»</p>
        <small style="opacity:0.7">Проект: ${r.project}</small>
      </div>
    `).join('');
  }

  function renderPricing() {
    document.getElementById('pricing-grid').innerHTML = tariffs.map(t => `
      <div class="pricing-card ${t.popular ? 'popular' : ''}">
        ${t.popular ? '<span class="popular-badge">Хит продаж</span>' : ''}
        <h3>${t.title}</h3>
        <div><span class="price-current">${t.price}</span><span class="price-old">${t.oldPrice}</span></div>
        <div class="pricing-details">
          <ul>${t.features.map(f => `<li>✓ ${f}</li>`).join('')}</ul>
          <a href="#contact" class="choose-btn">Заказать</a>
        </div>
      </div>
    `).join('');
  }

  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');
  burger.addEventListener('click', () => { navLinks.classList.toggle('active'); burger.classList.toggle('open'); });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { navLinks.classList.remove('active'); burger.classList.remove('open'); }));

  let lastScroll = 0;
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    navbar.classList.toggle('hide', currentScroll > lastScroll && currentScroll > 100 && !navLinks.classList.contains('active'));
    lastScroll = currentScroll;
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    document.getElementById('progress-bar').style.width = (winScroll / height) * 100 + '%';
  });

  function animateCounters() {
    document.querySelectorAll('.count').forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1200;
      const startTime = performance.now();
      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        counter.innerText = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.matches('.case-card, .review-card')) entry.target.classList.add('visible');
        if (entry.target.classList.contains('hero-stats')) animateCounters();
      }
    });
  }, { threshold: 0.15 });

  observer.observe(document.querySelector('.hero-stats'));
  setTimeout(() => document.querySelectorAll('.case-card, .review-card').forEach(card => observer.observe(card)), 100);

  renderCases(); renderReviews(); renderPricing();
})();
