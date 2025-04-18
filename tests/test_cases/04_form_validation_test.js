const { Builder, By } = require('selenium-webdriver');

async function formValidationTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://idwibwyk.github.io/groom-room/form.html');

        // Попробуем отправить пустую форму
        await driver.findElement(By.css('button[type="submit"]')).click();
        await driver.sleep(1000); // Подождем немного

        try {
            // Если появился alert — это ожидаемо
            const alert = await driver.switchTo().alert();
            const alertText = await alert.getText();
            console.assert(
                alertText.toLowerCase().includes('заполните'),
                'Сообщение не содержит подсказку об ошибке'
            );
            await alert.accept();
            console.log('Тест валидации формы (пустые поля) пройден успешно');
        } catch (err) {
            throw new Error('Ожидался alert при отправке пустой формы, но он не появился');
        }
    } finally {
        await driver.quit();
    }
}

module.exports = formValidationTest;
