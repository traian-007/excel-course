import {Router} from '@core/routes/Router';
import {DashboardPage} from '@/Pages/DashboardPage';
import {ExcelPage} from '@/Pages/ExcelPage';
import './scss/index.scss'
new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage
})
