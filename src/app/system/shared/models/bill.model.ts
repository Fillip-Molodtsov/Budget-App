// робоча модель валюти
export class Bill {
    constructor(
        public value: number,
        public currency: String = 'RUB'
    ) {
    }
}
