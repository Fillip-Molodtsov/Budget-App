// ресурси для авторизації
export class AuthService {

    private isAuthorized = false;

    login() {
        this.isAuthorized = true;
    }

    logout() {
        this.isAuthorized = false;
        window.localStorage.clear();
    }

    isLogged() {
        const user = JSON.parse(window.localStorage.getItem('user'));
        return this.isAuthorized || user;
    }
}
