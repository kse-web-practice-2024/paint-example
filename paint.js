const IDLE = 'idle';
export const DRAW = 'draw';
export const ERASE = 'erase';

export class Paint {
    #canvas;
    #pointerState = IDLE;
    #mode = DRAW;

    #path = [];

    #pathCollection = [];

    constructor(canvas) {
        this.#canvas = canvas;

        this.#canvas.element.addEventListener('mousemove', (event) => {
            const coordinates = this.#recalculateCoordinates(event);
            switch(this.#pointerState) {
                case DRAW:
                    this.#path.push({
                        ...coordinates,
                        color: '#000',
                        width: 5
                    });
                    this.#canvas.draw(this.#path);
                    break
                case ERASE:
                    this.#path.push({
                        ...coordinates,
                        color: '#fff',
                        width: 50
                    });
                    this.#canvas.draw(this.#path);
            }

        })

        this.#canvas.element.addEventListener('mousedown', (event) => {
            this.#pointerState = this.#mode;
        })

        this.#canvas.element.addEventListener('mouseup', (event) => {
            this.#pointerState = IDLE;
            if (this.#path.length) {
                this.#pathCollection.push([...this.#path])
                this.#path = []
            }
        })

    }

    setMode(mode) {
        this.#mode = mode;
    }

    #recalculateCoordinates({clientX, clientY}) {
        return {
            x: clientX - this.#canvas.element.offsetLeft,
            y: clientY - this.#canvas.element.offsetTop,
        }
    }

    clean() {
        this.#canvas.clean()
    }

    undo() {
        this.#pathCollection.pop();
        this.#canvas.clean();

        this.#pathCollection.forEach(path => {
            this.#canvas.draw(path);
        })
    }
}
