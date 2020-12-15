import {storage} from '@core/utils';

export function toHTML(key) {
    const model = storage(key)
    const id = key.split(':')[1]
    // console.log('keita fermecata', key)
    return `
        <li class="db__record">
            <a href="#excel/${id}">${model.title}</a>
            <strong>
                ${new Date(model.openedDate).toLocaleDateString()}
                ${new Date(model.openedDate).toLocaleTimeString()}
            </strong>
        </li>
    `
}
// excel:3243123
// excel:432425
function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
            continue
        }
        keys.push(key)
    }
    return keys
}
export function createRecordsTable() {
    const keys = getAllKeys()
    // console.log('keys', keys)
    if (!keys.length) {
        return `<p>You haven't created any tables yet</p>`
    }
    return `
        <div class="db__list-header">
            <span>Title</span>
            <span>Opening date</span>
        </div>
        <ul class="db__list">
            ${keys.map(toHTML).join('')}
        </ul>
    `
}
