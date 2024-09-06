import "./styles/styles.scss";
import {Router} from "./router.js";

class App {
    constructor() {
        new Router();
        // document.addEventListener('DOMContentLoaded', this.init.bind(this));
    }
    // init() {
    //     const profileNameElement = document.getElementById('profile-name');
    //     const dropdownMenu = document.getElementById('dropdown-menu');
    //
    //     if (profileNameElement && dropdownMenu) {
    //         console.log('Элементы найдены, привязываем обработчик...');
    //         profileNameElement.addEventListener('click', this.toggleMenu.bind(this));
    //     } else {
    //         console.error('Элементы #profile-name или #dropdown-menu не найдены.');
    //     }
    // }
    //
    // toggleMenu() {
    //     const menu = document.getElementById('dropdown-menu');
    //     if (menu) {
    //         // Используем classList для управления видимостью
    //         menu.classList.toggle('show');
    //         console.log('Меню переключено:', menu.classList.contains('show') ? 'visible' : 'hidden');
    //     } else {
    //         console.error('Элемент #dropdown-menu не найден.');
    //     }
    // }
}

(new App());