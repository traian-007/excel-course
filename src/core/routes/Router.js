import {$} from '../dom';
import {ActiveRoute} from './ActiveRoute';
import {Loader} from '@/components/Loader';

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is not provided in Router')
        }
        this.$placeholder = $(selector)
        this.routes = routes
        this.loader = new Loader()
        this.page = null
        // this: Router {$placeholder: Dom, routes: {…}, changePageHandler: ƒ}
        // console.log('jfjfffj', this.changePageHandler.bind(this))
        this.changePageHandler = this.changePageHandler.bind(this)
        this.init()
    }
    init() {
        window.addEventListener('hashchange', this.changePageHandler)
        this.changePageHandler()
    }
    async changePageHandler() {
        if (this.page) {
            this.page.destroy()
        }
        this.$placeholder.clear().append(this.loader)
        const Page = ActiveRoute.path.includes('excel')
            ? this.routes.excel
            : this.routes.dashboard
        this.page = new Page(ActiveRoute.param)
        const root = await this.page.getRoot()
        this.$placeholder.clear().append(root) // this.page.getRoot()
        this.page.afterRender()
        // console.log('this page : ', this.page)
        // console.log(ActiveRoute.path)
        // console.log(ActiveRoute.param)
        // const Page = this.routes[key]
        // Object.keys(this.routes).forEach(key => {
        //     if (ActiveRoute.path === key) {
        //         const Page = this.routes[key]
        //         const page = new Page()
        //         this.$placeholder.append(page.getRoot())
        //         page.afterRender()
        //     }
        // })
    }
    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }
}

