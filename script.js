(() => {
  'use strict';
  const arena = document.getElementById('answer-arena');
  const yes = document.getElementById('yes-button');
  const maybe = document.getElementById('no-button');
  const decline = document.getElementById('decline-button');
  const status = document.getElementById('response-message');
  const invite = document.getElementById('invite');
  if (!arena || !yes || !maybe || !decline) return;

  const jokes = ['Nice try 😏', 'Too slow 😂', 'Catch me first 🏃‍♀️', 'Your cardio for today 💪'];
  let dodges = 0;
  let keyboardMode = false;
  let lastTouch = -Infinity;

  function resetMaybe() {
    maybe.style.left = '';
    maybe.style.top = '';
    maybe.style.right = '';
  }

  function moveAway(event, force = false, fromTouch = false) {
    if (arena.hidden || keyboardMode || (!fromTouch && Date.now() - lastTouch < 1000)) return;
    if (!Number.isFinite(event.clientX) || !Number.isFinite(event.clientY)) return;
    const button = maybe.getBoundingClientRect();
    const dx = Math.max(button.left - event.clientX, 0, event.clientX - button.right);
    const dy = Math.max(button.top - event.clientY, 0, event.clientY - button.bottom);
    if (!force && Math.hypot(dx, dy) > 85) return;

    const bounds = arena.getBoundingClientRect();
    const yesBounds = yes.getBoundingClientRect();
    const maxX = Math.max(0, bounds.width - button.width);
    const maxY = Math.max(0, bounds.height - button.height);
    let best;
    for (let col = 0; col <= 12; col++) {
      for (let row = 0; row <= 8; row++) {
        const x = maxX * col / 12;
        const y = maxY * row / 8;
        const left = bounds.left + x;
        const top = bounds.top + y;
        const right = left + button.width;
        const bottom = top + button.height;
        if (left < yesBounds.right + 12 && right > yesBounds.left - 12 && top < yesBounds.bottom + 12 && bottom > yesBounds.top - 12) continue;
        const gapX = Math.max(left - event.clientX, 0, event.clientX - right);
        const gapY = Math.max(top - event.clientY, 0, event.clientY - bottom);
        const gap = Math.hypot(gapX, gapY);
        const distance = Math.hypot(left + button.width / 2 - event.clientX, top + button.height / 2 - event.clientY);
        const score = gap * 4 + distance;
        if (!best || score > best.score) best = { x, y, score, gap };
      }
    }
    if (!best || best.gap < 20) return;
    maybe.style.right = 'auto';
    maybe.style.left = `${best.x}px`;
    maybe.style.top = `${best.y}px`;
    status.textContent = jokes[dodges++ % jokes.length];
    invite.classList.add('chasing');
  }

  function pass() {
    arena.hidden = true;
    decline.hidden = true;
    status.textContent = 'All good. See you at the gym 🤝';
    invite.classList.remove('chasing');
    invite.classList.add('passed');
  }

  document.addEventListener('mousemove', event => {
    keyboardMode = false;
    moveAway(event);
  });
  maybe.addEventListener('mouseenter', event => moveAway(event, true));
  maybe.addEventListener('mousedown', event => {
    if (!keyboardMode && event.button === 0 && Date.now() - lastTouch >= 1000) {
      event.preventDefault();
      moveAway(event, true);
    }
  });
  function dodgeTouch(event) {
    if (event.cancelable) event.preventDefault();
    keyboardMode = false;
    lastTouch = Date.now();
    const touch = event.touches[0] || event.changedTouches[0];
    if (touch) moveAway(touch, event.type === 'touchstart', true);
  }
  maybe.addEventListener('touchstart', dodgeTouch, { passive: false });
  maybe.addEventListener('touchmove', dodgeTouch, { passive: false });
  maybe.addEventListener('touchend', event => {
    if (event.cancelable) event.preventDefault();
    lastTouch = Date.now();
  }, { passive: false });
  maybe.addEventListener('click', event => {
    if (Date.now() - lastTouch < 1000 || event.pointerType === 'touch') {
      event.preventDefault();
      return;
    }
    if (keyboardMode || event.detail === 0) pass();
    else {
      event.preventDefault();
      moveAway(event, true);
    }
  });
  decline.addEventListener('click', pass);
  document.addEventListener('keydown', event => {
    if (event.key === 'Tab') keyboardMode = true;
  });
  document.addEventListener('touchstart', () => { lastTouch = Date.now(); }, { passive: true });
  window.addEventListener('resize', resetMaybe);
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#accepted') {
      const accepted = document.getElementById('accepted');
      if (accepted) accepted.focus({ preventScroll: true });
      window.scrollTo(0, 0);
    }
  });
})();
