
abstract class ISignal<T> {
    abstract add(fn: (value: T) => void): () => void

    abstract addCallOnce(fn: (value: T) => void): void

    abstract dispatch(value: T): void

    abstract clearListeners(): void
}

class Signal<T> {
    private m_listeners: Array<(value: T) => void> = []

    public add(fn: (value: T) => void): () => void {
        this.m_listeners.push(fn)
        return () => {
            const index = this.m_listeners.indexOf(fn)
            if (index >= 0) {
                this.m_listeners.splice(index, 1)
            }
        }
    }

    public addCallOnce(fn: (value: T) => void): void {
        const unsub = this.add((value) => {
            fn(value)
            unsub()
        })
    }

    public dispatch(value: T): void {
        for (const sb of this.m_listeners) {
            sb(value)
        }
    }

    public clearListeners() {
        this.m_listeners = []
    }
}

export {
    ISignal,
    Signal,
}