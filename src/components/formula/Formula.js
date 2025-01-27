import {ExcelComponents} from '@core/ExcelComponents';
import {$} from '@core/dom';

export class Formula extends ExcelComponents {
    static className = 'excel__formula'
    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        })
    }
    toHTML() {
        return `
             <div class="info">fx</div>
            <div id="formula" class="input" 
            contenteditable spellcheck="false"></div>
        `
    }
    init() {
        super.init()
        this.$formula = this.$root.find('#formula')
        this.$on('table:select', $cell => {
            this.$formula.text($cell.data.value)
        })
        // this.$on('table:input', $cell => {
        //     this.$formula.text($cell.text())
        // })
        // this.$subscribe(state => {
        //     console.log('Formula uppdate', state.currentText)
        //     this.$formula.text(state.currentText)
        // })
    }
    storeChanged({currentText}) {
        this.$formula.text(currentText)
    }

    onInput(event) {
        // const text = event.target.textContent.trim()
        const text = $(event.target).text()
        this.$emit('formula:input', text)
    }
    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$emit('formula:done')
        }
    }
}
