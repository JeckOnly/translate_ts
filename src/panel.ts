export class Panel {
    private container!: HTMLDivElement;
    private close!: HTMLElement;
    private source!: HTMLElement;
    private dest!: HTMLElement;

    constructor() {
        this.create();
        this.bind();
    }

    create(): void {
        let container: HTMLDivElement = document.createElement('div');
        console.log("create 函数执行");

        let html: string = `
            <header>翻译<span class="close">X</span></header>
            <main>
                <div class="source">
                <div class="title">英语</div>
                <div class="content"></div>
                </div>
                <div class="dest">
                <div class="title">简体中文</div>
                <div class="content">...</div>
                </div>
            </main>
        `;

        container.innerHTML = html;
        container.classList.add('translate-panel');
        document.body.appendChild(container);

        this.container = container;
        this.close = container.querySelector('.close') as HTMLElement;
        this.source = container.querySelector('.source .content') as HTMLElement;
        this.dest = container.querySelector('.dest .content') as HTMLElement;
    }

    show(): void {
        this.container.classList.add('show');
    }

    isShow(): boolean {
        return this.container.classList.contains('show');
    }

    hide(): void {
        this.container.classList.remove('show');
    }

    bind(): void {
        this.close.onclick = () => {
            this.hide();
        };
    }

    contains(e: MouseEvent): boolean {
        return this.isShow() && this.container.contains(e.target as Node);
    }



    translate(raw: string): void {
        this.source.innerText = raw;
        this.dest.innerText = '...';

        let slValue: string = 'en';
        let tlValue: string = 'zh-Hans';

        fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${slValue}&tl=${tlValue}&dt=t&q=${raw}`)
            .then(res => res.json())
            .then(res => {
                this.dest.innerText = res[0][0][0];
                console.log("翻译为" + res[0][0][0]);
            });
    }



    pos(pos: { x: number; y: number }): void {
        this.container.style.top = pos.y + 'px';
        this.container.style.left = pos.x + 'px';
    }
}

