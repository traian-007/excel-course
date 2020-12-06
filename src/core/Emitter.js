export class Emitter {
    constructor() {
        this.listeners = {}
    }
    // dispatch,fire,trigger-how can we call this function
    // увидомляем слушателе усли усть
    // 'focus', 'make-it-work', 'formula:done'
    // table.emit('table:select', {a: 1}) ---how call emit()
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
        return true
    }
    // on, listen
    // Подписываемся на увидомление
    // Добовляем нового  слушителя
    // formula,subscribe('table:select', () => {})
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] =
                this.listeners[event].filter(listener => listener !== fn)
        }
    }
}
// exemple
// const emitter = new Emitter()
// const unsub = emitter.subscribe('andrian', data => console.log(data))
// emitter.emit('5455', 42)
// setTimeout(() => {
//     emitter.emit('andrian', 'after 2 seconds')
// }, 2000)
// setTimeout(() => {
//     unsub()
// }, 3000)
// setTimeout(() => {
//     emitter.emit('andrian', 'after 4 seconds')
// }, 4000)

