export class Word {
    constructor(public id: string, public text: string) {}

    static create(text: string): Word {
        return new Word(crypto.randomUUID(), text); // 自动生成唯一 ID
    }
}
