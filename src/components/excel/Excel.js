import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';
import {StoreSubcriber} from '@core/StoreSubscriber';
import {updateDate} from '@/redux/actions';
import {preventDefault} from '@core/utils';

export class Excel {
    constructor(options) { // selector, options
        // this.$el = $(selector)
        this.components = options.components || []
        this.store = options.store
        this.emitter = new Emitter()
        this.subscriber = new StoreSubcriber(this.store)
    }

    getRoot() {
        const $root = $.create('div', 'excel')
        const componentOptions = {
            store: this.store,
            emitter: this.emitter
        }
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)
            // DEBUG
            // if (component.name) {
            //     window['c' + component.name] = component
            // }
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })
        return $root
    }
    init() { // render
        // this.$el.append(this.getRoot())
        if (process.env.NODE_ENV === 'production') {
            document.addEventListener('contextmenu', preventDefault)
        }
        this.store.dispatch(updateDate())
        this.subscriber.subscribeComponents(this.components)
        this.components.forEach(component => component.init())
    }
    destroy() {
        this.subscriber.unsubscribeFromStore()
        this.components.forEach(component => component.destroy())
        document.removeEventListener('contextmenu', preventDefault)
    }
}
