/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react";
import {Route, Routes} from 'react-router-dom';

import Index from "./routes/Index";
import Introduction from "./routes/Introduction";
import PowerDrills from "./routes/PowerDrills";
import DrillPress from "./routes/DrillPress";
import HandSaws from "./routes/HandSaws";
import BandSaws from "./routes/BandSaws";
import JigSaws from "./routes/JigSaws";
import PowerSanders from "./routes/PowerSanders";
import Routers from "./routes/Routers";
import FDMPrinting from "./routes/FDMPrinting";
//import LaserCutting from "./routes/LaserCutting";
//import Sanding from "./routes/Sanding";
import './style.css'

export default () => {

    const [_forceUpdate, _setForceUpdate] = useState(false)
    const update = () => {_setForceUpdate(!_forceUpdate)}

    /*

    TODO

    <Route path="sanding" element={<Sanding update={update}/>}/>
    <Route path="laser-cutting" element={<LaserCutting update={update}/>}/>
    */

    /*

    */
    return(
        <Routes>
            <Route index element={<Index/>}/>
            <Route path="introduction" element={<Introduction update={update}/>}/>
            <Route path="power-drills" element={<PowerDrills update={update}/>}/>
            <Route path="drill-press" element={<DrillPress update={update}/>}/>
            <Route path="hand-saws" element={<HandSaws update={update}/>}/>
            <Route path="band-saws" element={<BandSaws update={update}/>}/>
            <Route path="jig-saws" element={<JigSaws update={update}/>}/>
            <Route path="power-sanders" element={<PowerSanders update={update}/>}/>
            <Route path="routers" element={<Routers update={update}/>}/>
            <Route path="fdm-printing" element={<FDMPrinting update={update}/>}/>
        </Routes>
    )
}