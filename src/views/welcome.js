import { escapeHtml } from '../lib/html.js';

// First visit only: a full-page language choice. Both languages are shown at once,
// since we don't know yet which one the visitor reads.

function usFlag() {
  const w = 60;
  const h = 40;
  const stripe = h / 13;
  let stripes = '';
  for (let i = 0; i < 13; i += 2) {
    stripes += `<rect y="${(i * stripe).toFixed(2)}" width="${w}" height="${stripe.toFixed(2)}" fill="#B22234"/>`;
  }
  const cantonW = 24;
  const cantonH = stripe * 7;
  let stars = '';
  for (let row = 0; row < 9; row += 1) {
    const cols = row % 2 === 0 ? 6 : 5;
    const offset = row % 2 === 0 ? 2 : 4;
    for (let col = 0; col < cols; col += 1) {
      stars += `<circle cx="${offset + col * 4}" cy="${(1.2 + row * (cantonH - 2.4) / 8).toFixed(2)}" r="0.75" fill="#ffffff"/>`;
    }
  }
  return `<svg class="flag" viewBox="0 0 ${w} ${h}" aria-hidden="true" focusable="false"><rect width="${w}" height="${h}" fill="#ffffff"/>${stripes}<rect width="${cantonW}" height="${cantonH.toFixed(2)}" fill="#3C3B6E"/>${stars}</svg>`;
}

function spainFlag() {
  return '<svg class="flag" viewBox="0 0 60 40" aria-hidden="true" focusable="false"><rect width="60" height="40" fill="#AA151B"/><rect y="10" width="60" height="20" fill="#F1BF00"/></svg>';
}

export function welcomeView() {
  return `
    <div class="welcome">
      <span class="brand">SECURE FAMILY</span>
      <div class="welcome__body">
        <h1 class="welcome__title" tabindex="-1">
          <span lang="en">Choose your language</span>
          <span class="welcome__title-es" lang="es">Elige tu idioma</span>
        </h1>
        <div class="welcome__options">
          <button type="button" class="lang-choice" data-action="choose-lang" data-lang="en" data-key="choose-en" lang="en">
            ${usFlag()}
            <span>English</span>
          </button>
          <button type="button" class="lang-choice" data-action="choose-lang" data-lang="es" data-key="choose-es" lang="es">
            ${spainFlag()}
            <span>Español</span>
          </button>
        </div>
      </div>
      <p class="welcome__note">${escapeHtml('You can change it later · Puedes cambiarlo después')}</p>
    </div>`;
}
