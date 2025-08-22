document.addEventListener('DOMContentLoaded', () => {
  const hello = document.getElementById('hello');
  const formContainer = document.getElementById('form-container');
  const form = document.getElementById('search-form');
  const progress = document.getElementById('progress');
  const progressBar = document.getElementById('progress-bar');

  hello.addEventListener('animationend', () => {
    formContainer.classList.remove('hidden');
    formContainer.classList.add('show');
    hello.style.display = 'none';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    progress.classList.remove('hidden');
    let current = 0;
    const total = 100;
    const interval = setInterval(() => {
      current += 10;
      const percent = calculateProgress(total, current);
      progressBar.style.width = `${percent}%`;
      if (percent >= 100) {
        clearInterval(interval);
      }
    }, 200);
  });
});
