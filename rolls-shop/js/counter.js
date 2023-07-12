// Добавляєм прослушку на вікні
window.addEventListener('click', function (event) {

    // Об'являем змінну для лічильника
    let counter;

    // Провіряєм клік строго по кнопкам Плюс або Мінус
    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
		// Находим обертку лічильника
		const counterWrapper = event.target.closest('.counter-wrapper');
		// Находим div з числом лічильника
        counter = counterWrapper.querySelector('[data-counter]');
	}

	// Провіряєм чи є элемент кнопкою "Плюс"
	if (event.target.dataset.action=== 'plus') {
		counter.innerText = ++counter.innerText;
	}

	// Провіряєм чи є элемент кнопкою "Мінус"
	if (event.target.dataset.action === 'minus') {

		// Провіряєм щоб лічильник був більше 1
		if (parseInt(counter.innerText) > 1) {
			// міняєм текст в лічильнику зменшуючи його на 1
			counter.innerText = --counter.innerText;
		} else if (event.target.closest('.cart-wrapper') && parseInt(counter.innerText) === 1) {
			// Провірка товара в корзині
			console.log('IN CART!!!!');
			// Удаляєм товар із корзини
			event.target.closest('.cart-item').remove();

			// зображення статуса корзини Пустая / Полная
			toggleCartStatus();

			// перерахунок загальної вартості товара в корзині
			calcCartPriceAndDelivery();
		}

	}

	// Проверяем клик на + или - внутри коризины
	if (event.target.hasAttribute('data-action') && event.target.closest('.cart-wrapper')) {
		// Пересчет общей стоимости товаров в корзине
		calcCartPriceAndDelivery();
	}
});