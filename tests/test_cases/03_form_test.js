const { Builder, By } = require('selenium-webdriver');

async function formTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://idwibwyk.github.io/groom-room/form.html');

        // Заполнение формы
        await driver.findElement(By.id('name')).sendKeys('Тест Тестов');
        await driver.findElement(By.id('email')).sendKeys('test@example.com');
        await driver.findElement(By.id('message')).sendKeys('Хочу записаться на стрижку пуделя!');

        await driver.findElement(By.css('button[type="submit"]')).click();

        // Проверка alert
        await driver.sleep(1000);
        const alertText = await driver.switchTo().alert().getText();
        console.assert(alertText.includes('сохранено'), 'Сообщение об успешном сохранении не появилось');
        await driver.switchTo().alert().accept();

        console.log('Тест формы пройден успешно');
    } finally {
        await driver.quit();
    }
}

module.exports = formTest;
