function calcCartPriceAndDelivery() {
	const cartWrapper = document.querySelector('.cart-wrapper');
	const priceElements = cartWrapper.querySelectorAll('.price__currency');
	const totalPriceEl = document.querySelector('.total-price');
	const deliveryCost = document.querySelector('.delivery-cost');
	const cartDelivery = document.querySelector('[data-cart-delivery]');

	// загальна кількість товара
	let priceTotal = 0;

	// Обходим всі блоки з цінами в корзині
	priceElements.forEach(function (item) {
		// Находим кількість товара
		const amountEl = item.closest('.cart-item').querySelector('[data-counter]');
		// Добавляем ціну товара в загальну вартість (кіл-ть * вартість)
		priceTotal += parseInt(item.innerText) * parseInt(amountEl.innerText);
	});

	// відображаєм ціну на сторінці
	totalPriceEl.innerText = priceTotal;

	// ховаєм / Показуєм блок з вартістю доставки
	if (priceTotal > 0) {
		cartDelivery.classList.remove('none');
	} else {
		cartDelivery.classList.add('none');
	}

	// вказуєм вартість доставки
	if (priceTotal >= 600) {
		deliveryCost.classList.add('free');
		deliveryCost.innerText = 'бесплатно';
	} else {
		deliveryCost.classList.remove('free');
		deliveryCost.innerText = '250 ₽';
	}
}