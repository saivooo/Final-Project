import { searchForCity } from "./js/application";
import './styles/resets.scss'
import './styles/base.scss'
import './styles/header.scss'

document.getElementById('cityDateForm').addEventListener("submit", searchForCity)

export { searchForCity }
