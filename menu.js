
  const menuBtn = document.getElementById('menuBtn');
  const sideMenu = document.getElementById('sideMenu');
  const closeBtn = document.getElementById('closeBtn');
  const overlay = document.getElementById('overlay');

  function openMenu() {
    sideMenu.classList.add('open');
    overlay.classList.add('show');
  }

  function closeMenu() {
    sideMenu.classList.remove('open');
    overlay.classList.remove('show');
  }

  menuBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  (() => {
  const slider = document.getElementById("activitySlider");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".activity-slide"));
  const prevBtn = document.getElementById("activityPrev");
  const nextBtn = document.getElementById("activityNext");

  let idx = 0;

  function mod(n, m){ return (n % m + m) % m; }

  function render() {
    slides.forEach(s => s.classList.remove("is-prev","is-active","is-next"));

    const prev = mod(idx - 1, slides.length);
    const next = mod(idx + 1, slides.length);

    slides[prev].classList.add("is-prev");
    slides[idx].classList.add("is-active");
    slides[next].classList.add("is-next");
  }

  function go(d){
    idx = mod(idx + d, slides.length);
    render();
  }

  prevBtn.addEventListener("click", () => go(-1));
  nextBtn.addEventListener("click", () => go(1));

  slides.forEach((s, i) => s.addEventListener("click", () => { idx = i; render(); }));

  render();
})();

const form = document.getElementById("contactForm");
    const note = document.getElementById("formNote");

    const nameEl = document.getElementById("name");
    const contactEl = document.getElementById("contact");
    const msgEl = document.getElementById("message");

    const errName = document.getElementById("err-name");
    const errContact = document.getElementById("err-contact");
    const errMsg = document.getElementById("err-message");

    function setError(el, errEl, message) {
      errEl.textContent = message;
      el.setAttribute("aria-invalid", message ? "true" : "false");
    }

    function isEmailLike(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }
    function isPhoneLike(v) {
      return /^[0-9+\-\s()]{9,}$/.test(v);
    }

    form.addEventListener("submit", (e) => {
      note.textContent = "";
      let ok = true;

      if (!nameEl.value.trim()) {
        setError(nameEl, errName, "お名前を入力してください。");
        ok = false;
      } else {
        setError(nameEl, errName, "");
      }

      const c = contactEl.value.trim();
      if (!c) {
        setError(contactEl, errContact, "連絡先（メール or 電話）を入力してください。");
        ok = false;
      } else if (!(isEmailLike(c) || isPhoneLike(c))) {
        setError(contactEl, errContact, "メールアドレスか電話番号の形式で入力してください。");
        ok = false;
      } else {
        setError(contactEl, errContact, "");
      }

      if (!msgEl.value.trim()) {
        setError(msgEl, errMsg, "ご要望を入力してください。");
        ok = false;
      } else {
        setError(msgEl, errMsg, "");
      }

      if (!ok) {
        e.preventDefault();
        note.textContent = "入力内容を確認してください。";
        return;
      }

      if (!form.getAttribute("action")) {
        e.preventDefault();
        form.reset();
        note.textContent = "送信しました（※デモ表示です。実際の送信先は未設定）";
      }
    });

    