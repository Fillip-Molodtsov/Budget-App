// клас користувача
export class User {
    constructor(
        public email: String,
        public password: String,
        public name: String,
        public id?: String,
    ) {}
}
