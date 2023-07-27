document.addEventListener('DOMContentLoaded', function () {

    const billInput = document.getElementById('number');
    const tipButtons = document.querySelectorAll('.btn-tip');
    const customTipInput = document.getElementById('custom');
    const peopleInput = document.getElementById('number-of-people');
    const tipAmountOutput = document.querySelector('.tip-amount');
    const totalAmountOutput = document.querySelectorAll('.tip-amount')[1];
    const resetButton = document.querySelector('.btn-reset');
  

    function calculateTip() {
      const billAmount = parseFloat(billInput.value);
      const tipPercentage = parseFloat(
        customTipInput.value !== '' ? customTipInput.value : document.querySelector('.btn-tip.active')?.value || '0'
      );
      const numberOfPeople = parseInt(peopleInput.value);
  
      if (isNaN(billAmount) || isNaN(tipPercentage) || isNaN(numberOfPeople)) {
        tipAmountOutput.textContent = '$0.00';
        totalAmountOutput.textContent = '$0.00';
        return;
      }
  
      const tipAmount = (billAmount * (tipPercentage / 100)) / numberOfPeople;
      const totalAmount = (billAmount + billAmount * (tipPercentage / 100)) / numberOfPeople;
  
      tipAmountOutput.textContent = `$${tipAmount.toFixed(2)}`;
      totalAmountOutput.textContent = `$${totalAmount.toFixed(2)}`;
    }
  

    tipButtons.forEach((button) => {
      button.addEventListener('click', function () {
        tipButtons.forEach((btn) => btn.classList.remove('active'));
        this.classList.add('active');
        customTipInput.value = '';
        calculateTip();
      });
    });
  
    customTipInput.addEventListener('input', function () {
      tipButtons.forEach((btn) => btn.classList.remove('active'));
      calculateTip();
    });
  

    peopleInput.addEventListener('input', calculateTip);

    resetButton.addEventListener('click', function () {
      billInput.value = '';
      tipButtons.forEach((btn) => btn.classList.remove('active'));
      customTipInput.value = '';
      peopleInput.value = '';
      tipAmountOutput.textContent = '$0.00';
      totalAmountOutput.textContent = '$0.00';
    });
    
  

    calculateTip();
  });
  