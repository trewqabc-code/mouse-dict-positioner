(function () {
  'use strict';

  const OFFSET_X = 18;
  const OFFSET_Y = 12;

  let mouseX = 0;
  let mouseY = 0;
  let popup  = null;
  let popupObserver = null;
  let hasMousePosition = false;
  let lastContent = '';
  let lastVisible = false;
  let pendingReposition = false;

  // ── マウス位置を常時記録 ──────────────────────────────────────────
  document.addEventListener('mousemove', (e) => {
    const firstMove = !hasMousePosition;
    mouseX = e.clientX;
    mouseY = e.clientY;
    hasMousePosition = true;
    if (firstMove && popup && lastVisible) scheduleReposition();
  }, { passive: true });

  // ── マウス近くに再配置（空のときは非表示） ───────────────────────
  function repositionNearMouse() {
    pendingReposition = false;
    if (!popup || !popup.isConnected || !hasMousePosition) return;

    // 翻訳結果が空 → ポップアップを隠す
    if (popup.textContent.trim() === '') {
      popup.style.setProperty('visibility', 'hidden', 'important');
      pendingReposition = false;
      return;
    }

    // 内容あり → 可視にしてマウス近くに移動
    popup.style.setProperty('visibility', 'visible', 'important');

    const pw = popup.offsetWidth  || 350;
    const ph = popup.offsetHeight || 200;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let left = mouseX + OFFSET_X;
    let top  = mouseY + OFFSET_Y;

    if (left + pw > vw - 10) left = mouseX - pw - OFFSET_X;
    if (top  + ph > vh - 10) top  = mouseY - ph - OFFSET_Y;

    left = Math.max(6, left);
    top  = Math.max(6, top);

    popup.style.setProperty('left',   left + 'px', 'important');
    popup.style.setProperty('top',    top  + 'px', 'important');
    popup.style.setProperty('right',  'auto',       'important');
    popup.style.setProperty('bottom', 'auto',       'important');

    pendingReposition = false;
  }

  function scheduleReposition() {
    if (pendingReposition) return;
    pendingReposition = true;
    setTimeout(repositionNearMouse, 0);
  }

  // ── ポップアップを監視 ────────────────────────────────────────────
  function watchPopup(el) {
    if (popupObserver) popupObserver.disconnect();
    popup = el;

    // 初期状態を記録
    lastContent = popup.textContent.trim();
    lastVisible = popup.style.visibility !== 'hidden';

    popupObserver = new MutationObserver(() => {
      const currentContent = popup.textContent.trim();
      const currentVisible = popup.style.visibility !== 'hidden';

      const contentChanged = currentContent !== lastContent;
      const becameVisible  = currentVisible && !lastVisible;

      lastContent = currentContent;
      lastVisible = currentVisible;

      // 内容が変わった or 表示された → repositionNearMouse に判断を委ねる
      // （空なら非表示、内容あれば位置調整）
      if (contentChanged || becameVisible) {
        scheduleReposition();
      }
    });

    popupObserver.observe(popup, {
      childList:     true,
      subtree:       true,
      characterData: true,
      attributes:    true,
      attributeFilter: ['style', 'class'],
    });

    if (lastVisible && hasMousePosition) scheduleReposition();
  }

  // ── Shadow DOM 内の Mouse Dictionary ポップアップを探す ──────────
  function findPopup() {
    // ホスト要素: id に "MOUSE_DICTIONARY" を含み "_SH" で終わる div
    const host = document.querySelector('[id*="MOUSE_DICTIONARY"][id$="_SH"]');
    if (!host || !host.shadowRoot) return null;

    // Shadow root 内の div.notranslate がポップアップ本体
    return host.shadowRoot.querySelector('div.notranslate') ||
           host.shadowRoot.querySelector('[data-mouse-dictionary-hidden]');
  }

  // ── 遅れて起動・再起動した辞書も検出する ──────────────────────────
  function ensurePopup() {
    if (popup && popup.isConnected) return;

    if (popupObserver) {
      popupObserver.disconnect();
      popupObserver = null;
    }
    popup = null;

    const el = findPopup();
    if (el) watchPopup(el);
  }

  ensurePopup();
  setInterval(ensurePopup, 500);
})();
