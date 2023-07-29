document.addEventListener('DOMContentLoaded', function () {
  const billInput = document.getElementById('number');
  const tipButtons = document.querySelectorAll('.btn-tip');
  const customTipInput = document.getElementById('custom');
  const peopleInput = document.getElementById('number-of-people');
  const tipAmountOutput = document.querySelector('.tip-amount');
  const totalAmountOutput = document.querySelectorAll('.tip-amount')[1];
  const resetButton = document.querySelector('.btn-reset');
  const error1 = document.getElementById('error1');
  const error2 = document.getElementById('error2');

  function showError(inputElement, errorMessage) {
    inputElement.classList.add('error');
    errorMessage.classList.remove('hidden');
  }

  function hideError(inputElement, errorMessage) {
    inputElement.classList.remove('error');
    errorMessage.classList.add('hidden');
  }

  function validateAndCalculate() {
    const billAmount = parseFloat(billInput.value);
    const tipPercentage = parseFloat(
      customTipInput.value !== '' ? customTipInput.value : document.querySelector('.btn-tip.active')?.value || '0'
    );
    const numberOfPeople = parseInt(peopleInput.value);

    if (billAmount == 0) {
      showError(billInput, error1);
    } else {
      hideError(billInput, error1);
    }

    if (numberOfPeople == 0) {
      showError(peopleInput, error2);
    } else {
      hideError(peopleInput, error2);
    }

    if (!isNaN(billAmount) && !isNaN(tipPercentage) && !isNaN(numberOfPeople) && billAmount !== 0 && numberOfPeople !== 0) {
      const tipAmount = (billAmount * (tipPercentage / 100)) / numberOfPeople;
      const totalAmount = (billAmount + billAmount * (tipPercentage / 100)) / numberOfPeople;
      tipAmountOutput.textContent = `$${tipAmount.toFixed(2)}`;
      totalAmountOutput.textContent = `$${totalAmount.toFixed(2)}`;
    } else {
      tipAmountOutput.textContent = '$0.00';
      totalAmountOutput.textContent = '$0.00';
    }
  }

  function handleTipButtonClick(button) {
    tipButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    customTipInput.value = '';
    validateAndCalculate();
  }

  tipButtons.forEach((button) => {
    button.addEventListener('click', function () {
      handleTipButtonClick(this);
    });
  });

  customTipInput.addEventListener('input', function () {
    tipButtons.forEach((btn) => btn.classList.remove('active'));
    validateAndCalculate();
  });

  billInput.addEventListener('keyup', validateAndCalculate);
  peopleInput.addEventListener('keyup', validateAndCalculate);

  resetButton.addEventListener('click', function () {
    billInput.value = '';
    tipButtons.forEach((btn) => btn.classList.remove('active'));
    customTipInput.value = '';
    peopleInput.value = '';
    tipAmountOutput.textContent = '$0.00';
    totalAmountOutput.textContent = '$0.00';
    hideError(peopleInput, error2);
    hideError(billInput, error1);

  });

  validateAndCalculate();
});
