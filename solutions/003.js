function fetchVideoDetails(videoId) {
  return new Promise((resolve, reject) => {
    const isSuccess = Math.random() > 0.1;
    if (isSuccess) {
      setTimeout(() =>
        resolve({
          title: "Глубокое погружение в асинхронный JavaScript",
          description:
            "Разбираем event loop, промисы и async/await на пальцах.",
        }),
        1 * 1000
      );
    } else {
      setTimeout(() =>
        reject(new Error("Не удалось загрузить детали видео")),
        1 * 1000
      );
    }
  });
}

function fetchComments(videoId) {
  return new Promise((resolve, reject) => {
    const isSuccess = Math.random() > 0.3;
    if (isSuccess) {
      setTimeout(() =>
        resolve([
          "Отличное объяснение! Наконец-то понял event loop.",
          "А как насчет Web Workers?",
          "Лайк за async/await!",
        ]),
        1.5 * 1000
      );
    } else {
      setTimeout(() =>
        reject(new Error("Не удалось загрузить комментарии")),
        1.5 * 1000
      );
    }
  });
}

function fetchRelatedVideos(videoId) {
  return new Promise((resolve, reject) => {
    const isSuccess = Math.random() > 0.05;
    if (isSuccess) {
      setTimeout(() =>
        resolve([
          "Что такое замыкания в JS?",
          "Паттерны проектирования для начинающих",
        ]),
        0.8 * 1000
      );
    } else {
      setTimeout(() =>
        reject(new Error("Не удалось загрузить похожие видео")),
        0.8 * 1000
      );
    }
  });
}

async function loadVideoPage(videoId) {
  console.log(`Загрузка страницы для видео ${videoId}...`);
  try {
    const [details, comments, related] = await Promise.all([
      fetchVideoDetails(videoId), // Может упасть
      fetchComments(videoId), // Может упасть
      fetchRelatedVideos(videoId), // Может упасть
    ]);
    // Этот код выполнится только если ВСЕ успешно
    console.log("--- Страница загружена полностью ---");
    console.log("Детали:", details);
    console.log("Комментарии:", comments);
    console.log("Похожие видео:", related);
  } catch (error) {
    // Сюда попадем, если хотя бы один промис отклонен
    console.error("--- Ошибка загрузки части страницы ---");
    console.error("Причина:", error.message);
    // Мы не имеем доступа к результатам успешных промисов здесь
    // с использованием Promise.all
  }
}

loadVideoPage("videoId");
