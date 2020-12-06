import {DomListener} from '@core/DomListener';

export class ExcelComponents extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []
        this.prepare()
    }
    // настраеваем наш компонент до init
    prepare() {}
    // return tamplate of components
    toHTML() {
        return ''
    }
    // увидомляем слушателей про событие event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }
    // подписываемся на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }
    // инициализируем компонент
    // добовляем DOM слушателей
    init() {
        this.initDOMListeners()
    }
    // удаляем компонент
    // чистим слушатели
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
}

