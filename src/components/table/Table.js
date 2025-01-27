import {ExcelComponents} from '@core/ExcelComponents';
import {$} from '@core/dom';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, matrix, nextSelector, shouldRisize} from './table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';
export class Table extends ExcelComponents {
    static className = 'excel__table'
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }
    toHTML() {
        return createTable(20, this.store.getState())
    }
    prepare() {
        this.selection = new TableSelection()
    }
    init() {
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell)
        this.$on('formula:input', value => {
            this.selection.current.attr('data-value')
            this.selection.current.text(parse(value))
            // this.selection.current.text(text)
            this.updateTextInStore(value)
            // console.log('table from formula :', text)
        })
        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
        // this.$subscribe(state => {
        //     console.log('TableState', state)
        // })
        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value)
            this.$dispatch(actions.applySyle({
                value,
                ids: this.selection.selectedIds
            }))
        })
    }
    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        // console.log('styles dispatch: ', styles)
        this.$dispatch(actions.changeStyles(styles))
    }
    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn('Resize error', e.message)
        }
    }
    onMousedown(event) {
        if (shouldRisize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
            }
        }
    }
    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowDown',
            'ArrowUp'
        ]
        const {key} = event
            if (keys.includes(key) && !event.shiftKey) {
                event.preventDefault()
                const id = this.selection.current.id(true)
                const $next = this.$root.find(nextSelector(key, id))
                this.selectCell($next)
        }
    }
    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }
    onInput(event) {
        this.updateTextInStore($(event.target).text())
        // this.$emit('table:input', $(event.target))
        // this.$dispatch(actions.changeText({
        //     id: this.selection.current.id(),
        //     text: $(event.target).text(),
        //     value: $(event.target).text()
        // }))
    }
}

