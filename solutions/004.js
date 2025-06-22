function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

async function checkItemStock(itemName) {
  return new Promise((resolve, reject) => {
    const isSuccess = Math.random() > 0.1;
    if (isSuccess) {
      setTimeout(() =>
        resolve({ item: itemName, status: "in_stock" }),
        getRandomArbitrary(0.1, 0.6) * 1000
      );
    } else {
      setTimeout(() =>
        reject(new Error(`Товар '${itemName}' закончился`)),
        getRandomArbitrary(0.1, 0.6) * 1000
      );
    }
  });
}

async function processPayment(orderInfo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ paymentId: "...", status: "paid" }), 1 * 1000);
  });
}

async function createOrder(paymentInfo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ orderId: "...", status: "created" }), 0.5 * 1000);
  });
}

async function placeOrder(items) {
  console.log(`Попытка оформить заказ для: ${items.join(", ")}`);
  try {
    console.log("1. Параллельная проверка наличия товаров...");
    // Запускаем проверки параллельно для всех товаров
    const stockCheckPromises = items.map((item) => checkItemStock(item));
    const stockResults = await Promise.all(stockCheckPromises);
    // Если мы здесь, значит Promise.all успешно разрешился
    console.log(
      "   Все товары в наличии:",
      stockResults.map((r) => r.item)
    );

    console.log("2. Обработка платежа...");
    const paymentInfo = await processPayment({
      items,
      total: items.length * 100,
    });
    console.log(`   Платеж успешен: ID ${paymentInfo.paymentId}`);

    console.log("3. Создание заказа...");
    const orderInfo = await createOrder(paymentInfo);
    console.log(`   Заказ создан: ID ${orderInfo.orderId}`);

    console.log("--- Заказ успешно оформлен! ---");
  } catch (error) {
    console.error("--- Ошибка оформления заказа ---");
    console.error("Причина:", error.message);
    // Здесь можно добавить логику для определения этапа ошибки,
    // но для начала достаточно общего сообщения.
  }
}

const itemsArray = ["рубашка", "расческа"];

placeOrder(itemsArray);
