import {Dashboard} from "./components/dashboard";
import {Login} from "./components/login";
import {SignUp} from "./components/sign-up";
import {Income} from "./components/income";
import {Expenses} from "./components/expenses";
import {IncomeExpenses} from "./components/income-expenses";
import {Logout} from "./components/logout";
import {AuthUtils} from "./utils/auth-utils";

export class Router {
    constructor() {
        this.initEvents();

        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');
        // this.profileNameElement = document.getElementById('profile-name');
        // this.init().then();


        //this.initEvents();
        this.routes = [
            {
                route: '/',
                title: 'Главная страница',
                filePathTemplate: '/templates/dashboard.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Dashboard();
                },
            },
            {
                route: '/income',
                title: 'Доходы',
                filePathTemplate: '/templates/income.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Income();
                },
            },
            {
                route: '/expenses',
                title: 'Расходы',
                filePathTemplate: '/templates/expenses.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Expenses();
                },
            },
            {
                route: '/income-expenses',
                title: 'Доходы и расходы',
                filePathTemplate: '/templates/income-expenses.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeExpenses();
                },
            },
            {
                route: '/login',
                title: 'Авторизация',
                filePathTemplate: '/templates/login.html',
                useLayout: false,
                load: () => {

                    new Login(this.openNewRoute.bind(this));
                },

            },
            {
                route: '/sign-up',
                title: 'Регистрация',
                filePathTemplate: '/templates/sign-up.html',
                useLayout: false,
                load: () => {
                    new SignUp(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/logout',
                load: () => {
                    new Logout(this.openNewRoute.bind(this));
                },
            },
        ];
    }

    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
        document.addEventListener('click', this.clickHandler.bind(this));
    }

    async openNewRoute(url) {
        const currentRoute = window.location.pathname;
        history.pushState({}, '', url);
        await this.activateRoute(null, currentRoute);
    }
    async clickHandler(e) {


        let element = null;
        if (e.target.nodeName === 'A') {
            element = e.target;
        } else if (e.target.parentNode.nodeName === 'A') {
            element = e.target.parentNode;
        }
        if (element) {
            e.preventDefault();

            const currentRoute = window.location.pathname;
            const url = element.href.replace(window.location.origin, '');
            if (!url || (currentRoute === url.replace('#', '')) || url === '/#' || url.startsWith('javascript:void(0)')) {
                return;
            }
            await this.openNewRoute(url);
        }
    }
    async activateRoute() {
        const urlRoute = window.location.pathname;
        const newRoute = this.routes.find(item => item.route === urlRoute);

        if (newRoute) {
            if (newRoute.title) {
                this.titlePageElement.innerText = newRoute.title;
            }
            if (newRoute.filePathTemplate) {
                let contentBlock =  this.contentPageElement;
                if (newRoute.useLayout) {
                    this.contentPageElement.innerHTML =  await fetch(newRoute.useLayout).then(response => response.text());
                    contentBlock = document.getElementById('content-layout');

                    this.profileNameElement = document.getElementById('profile-name');
                    let userInfo = AuthUtils.getAuthInfo(AuthUtils.userInfoTokenKey);
                    if (userInfo) {
                        userInfo = JSON.parse(userInfo);
                        if (userInfo.name && userInfo.lastName) {
                            this.profileNameElement.innerText = userInfo.name + ' ' + userInfo.lastName;
                        }
                    }

                    this.activateMenuItem(newRoute);

                    //contentLayoutPageElement.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());
                }
                contentBlock.innerHTML =  await fetch(newRoute.filePathTemplate).then(response => response.text());
            }

            if (newRoute.load && typeof newRoute.load === 'function') {
                newRoute.load();
            }

        }
    }

    activateMenuItem(route) {
        document.querySelectorAll('.sidebar .nav-link').forEach(item => {
            const href = item.getAttribute('href');
            if ((route.route.includes(href) && href !== '/') || (route.route === '/' && href === '/')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

    }

    // async init() {
    //     const profileNameElement = document.getElementById('profile-name');
    //     if (profileNameElement) {
    //         profileNameElement.addEventListener('click', this.toggleMenu.bind(this));
    //     } else {
    //         console.error('Element #profile-name not found.');
    //     }
    //
    // }
    // toggleMenu() {
    //     let menu = document.getElementById('dropdown-menu');
    //     menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    // }


}