(() => {
  'use strict';
  const button = document.getElementById('copy-button');
  const message = document.getElementById('message-text');
  const status = document.getElementById('copy-status');
  if (!button || !message || !status) return;
  button.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(message.textContent);
      status.textContent = 'Copied! Now send it to me 😌';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(message);
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Message selected. Copy it and send it to me.';
    }
  });
})();
