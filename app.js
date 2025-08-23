document.addEventListener('DOMContentLoaded', async () => {
  const hello = document.getElementById('hello');
  const formContainer = document.getElementById('form-container');
  const form = document.getElementById('search-form');
  const progress = document.getElementById('progress');
  const progressBar = document.getElementById('progress-bar');
  const startSelect = document.getElementById('start');
  const destinationSelect = document.getElementById('destination');

  function populateSelect(select, countries, placeholder) {
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = placeholder;
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    countries.forEach((country) => {
      const option = document.createElement('option');
      option.value = country.code;
      option.textContent = `${country.flag} ${country.name}`;
      select.appendChild(option);
    });
  }

  const response = await fetch('countries.json');
  const { sourceCountries, destinationCountries } = await response.json();
  populateSelect(startSelect, sourceCountries, 'Select source country');
  populateSelect(destinationSelect, destinationCountries, 'Select destination country');

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
