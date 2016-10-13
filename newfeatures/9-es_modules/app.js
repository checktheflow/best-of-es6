import cowsay from './modules/cowsay'
import { $ } from './modules/dollardollar'


$('.stable').innerHTML = cowsay('All the devs in the house say heeeeyo!')
