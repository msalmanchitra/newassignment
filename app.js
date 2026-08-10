const toggle = document.getElementById('toggle');
const menu = document.getElementById('menu');

if (toggle && menu) {
  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = menu.classList.toggle('show');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('.icon-wrap').forEach((wrap) => {
  const button = wrap.querySelector('.icon-btn');
  if (!button) return;

  button.addEventListener('click', (event) => {
    event.stopPropagation();
    document.querySelectorAll('.icon-wrap.open').forEach((openWrap) => {
      if (openWrap !== wrap) {
        openWrap.classList.remove('open');
      }
    });
    wrap.classList.toggle('open');
  });
});

const searchForm = document.querySelector('.search-form');
if (searchForm) {
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = searchForm.querySelector('input');
    if (input) {
      alert(`Search for: ${input.value}`);
    }
  });
}

document.addEventListener('click', () => {
  document.querySelectorAll('.icon-wrap.open').forEach((wrap) => wrap.classList.remove('open'));
  if (menu) {
    menu.classList.remove('show');
  }
  if (toggle) {
    toggle.setAttribute('aria-expanded', 'false');
  }
});

if (menu) {
  menu.addEventListener('click', (event) => event.stopPropagation());
}
