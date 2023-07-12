// Div всередині корзини, в яку ми добавляєм товари
const cartWrapper =  document.querySelector('.cart-wrapper');

// відстежуєм клік на сторінці
window.addEventListener('click', function (event) {
	// Провіряем клік на кнопке "Добавить в корзину"
	if (event.target.hasAttribute('data-cart')) {

		// Находим карточку з товаром
		const card = event.target.closest('.card');

		// збираєм дані з цього товара і записуєм їх в єдиний об'єкт productInfo
		const productInfo = {
			id: card.dataset.id,
			imgSrc: card.querySelector('.product-img').getAttribute('src'),
			title: card.querySelector('.item-title').innerText,
			itemsInBox: card.querySelector('[data-items-in-box]').innerText,
			weight: card.querySelector('.price__weight').innerText,
			price: card.querySelector('.price__currency').innerText,
			counter: card.querySelector('[data-counter]').innerText,
		};

		// Провіряєм чи є вже такий товар в корзині
		const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

		// якщо товар є в корзині
		if (itemInCart) {
			const counterElement = itemInCart.querySelector('[data-counter]');
			counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
		} else {
			// якщо товара нема в корзині

			// зібрані дані підставим в шаблон для товара в корзині
			const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
								<div class="cart-item__top">
									<div class="cart-item__img">
										<img src="${productInfo.imgSrc}" alt="${productInfo.title}">
									</div>
									<div class="cart-item__desc">
										<div class="cart-item__title">${productInfo.title}</div>
										<div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}</div>

										<!-- cart-item__details -->
										<div class="cart-item__details">

											<div class="items items--small counter-wrapper">
												<div class="items__control" data-action="minus">-</div>
												<div class="items__current" data-counter="">${productInfo.counter}</div>
												<div class="items__control" data-action="plus">+</div>
											</div>

											<div class="price">
												<div class="price__currency">${productInfo.price}</div>
											</div>

										</div>
										<!-- // cart-item__details -->

									</div>
								</div>
							</div>`;

			// відображаєм товар в корзині
			cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
		}

		// скидуєм лічильник добавленного товара на "1"
		card.querySelector('[data-counter]').innerText = '1';

		// зображення статуса корзини Пустая / Полная
		toggleCartStatus();

		// перерахунок загальної вартості товара в корзині
		calcCartPriceAndDelivery();

	}
});
