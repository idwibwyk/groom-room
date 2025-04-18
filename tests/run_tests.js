const homepageTest = require('./test_cases/01_homepage_load_test');
const navigationTest = require('./test_cases/02_navigation_test');
const formTest = require('./test_cases/03_form_test');
const formValidationTest = require('./test_cases/04_form_validation_test');
const pricelistTest = require('./test_cases/05_pricelist_test');
const mobileTest = require('./test_cases/06_mobile_test');
const galleryTest = require('./test_cases/07_gallery_test');

async function runTests() {
    console.log('=== Начало тестирования ===');
    const startTime = Date.now();
    
    const tests = [
        {name: 'Главная страница', fn: homepageTest},
        {name: 'Навигация', fn: navigationTest},
        {name: 'Форма записи', fn: formTest},
        {name: 'Валидация', fn: formValidationTest},
        {name: 'Прайс-лист', fn: pricelistTest},
        {name: 'Мобильная версия', fn: mobileTest},
        {name: 'Галерея', fn: galleryTest}
    ];
    
    let passed = 0;
    
    for (const test of tests) {
        try {
            console.log(`\nЗапуск теста: ${test.name}`);
            await test.fn();
            passed++;
            console.log(` ${test.name} - УСПЕХ`);
        } catch (error) {
            console.error(` ${test.name} - ОШИБКА: ${error.message}`);
        }
    }
    
    const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n=== Результаты ===`);
    console.log(`Всего тестов: ${tests.length}`);
    console.log(`Пройдено: ${passed}`);
    console.log(`Не пройдено: ${tests.length - passed}`);
    console.log(`Общее время: ${totalTime} сек`);
    
    if (passed < tests.length) {
        process.exit(1); // Возвращаем код ошибки если есть непройденные тесты
    }
}

runTests();