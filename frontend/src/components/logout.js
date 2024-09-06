import {AuthUtils} from "../utils/auth-utils";

export class Logout {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        if ((!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) || (!AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) ) {
            return this.openNewRoute('/login');
        }
        this.logout().then();
       // document.getElementById('logout').addEventListener('click', this.logout.bind(this));
    }
    async logout() {

            const response = await fetch('http://localhost:3000/api/logout', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    refreshToken: localStorage.getItem('refreshToken'),
                })
            });
            const result = await response.json();


            AuthUtils.removeAuthInfo();

            // localStorage.removeItem('accessToken');
            // localStorage.removeItem('refreshToken');
            // localStorage.removeItem('userInfo');
            this.openNewRoute('/login');

        }



}