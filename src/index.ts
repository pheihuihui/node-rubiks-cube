import { RubiksCube, restoredCubePlaneView } from './model/RubiksCube'
import { fromPlaneView, fromRGB } from "./util/utilities"
import ReactDOM from "react-dom";
import { all } from "./components/AllFaces";

export const _Cube = require('cubejs')
export const cube = new RubiksCube(restoredCubePlaneView)
export const currentPlaneView = fromPlaneView(restoredCubePlaneView)
export const globalColors = {
    documentBodyBackgroudColor: fromRGB([0x33, 0x80, 0x7b])
}

let panel = document.getElementById('displayPanel')

ReactDOM.render(all, panel)

document.body.style.backgroundColor = '#33807b'
