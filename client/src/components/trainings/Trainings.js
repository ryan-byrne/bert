import { useEffect, useReducer, useRef, useState } from "react";
import { Alert} from "react-bootstrap";
import { useParams } from "react-router-dom";

import { 
    DrillPress, 
    Introduction, 
    PowerDrills, 
    Sanding, 
    PowerSanders, 
    Sawing,
    BandSaws,
    JigSaws,
    Routers,
    FDMPrinting,
    LaserCutting
} from "./Catalog";

import '../../styles/learn.css'

const Map = ({trainings, userId, active}) => {

    const canvasRef = useRef();
    const guide = {
        introduction:{
            "power-drills":{
                "drill-press":null
            },
            "sanding":{
                "power-sanders":{
                    "routers":null,
                    "grinders":null
                }
            },
            "hand-saws":{
                "circular-saws":{
                    "chop-saws":null,
                    "table-saws":null
                },
                "jig-saws":null,
                "band-saws":{
                    "horizontal-band-saws":null
                }
            },
            "fdm-3d-printing":{
                "sla-3d-printing":null
            },
            "laser-cutting":null,
            "hammering":{
                "nail-guns":null
            },
            "laser-cutting":null,
            "fdm-3d-printing":{
                "sla-3d-printing":null
            }
        }
    }

    const getTrainingChildren = (parentTraining, locked) => Object.entries(parentTraining).map(([id, children], idx)=>
            <li>
                {locked?<span>&#128274;</span>:trainings[id].completed_by.includes(userId)?<span>&#9989;</span>:null}
                {active.includes(id)?<a href={`/#/trainings/${id}`}> {trainings[id].name}</a>:`${trainings[id].name} (Coming Soon)`}
                <ul>
                    {children?getTrainingChildren(children, !trainings[id].completed_by.includes(userId)):null}
                </ul>
            </li>
    )

    return(    
        <div className="markdown-body">
            <h1>Training Map</h1>
            <div>
                {!trainings ? <div>Loading...</div> : <ul>{getTrainingChildren(guide)}</ul>}
            </div>
            <div className="text-center">
                <canvas ref={canvasRef}></canvas>
            </div>
        </div>
    )
}

const Trainings = ({user}) => {

    const {trainingId} = useParams();
    const [trainings, setTrainings] = useState();
    const update = useReducer(bool=>!bool)[1];

    const catalog = {
        "introduction": <Introduction {...{user, update}}/>,
        "power-drills": <PowerDrills {...{user, update}}/>,
        "drill-press": <DrillPress {...{user, update}}/>,
        "sanding":<Sanding {...{user, update}}/>,
        "hand-saws":<Sawing {...{user, update}}/>,
        "band-saws":<BandSaws {...{user, update}}/>,
        "jig-saws":<JigSaws {...{user, update}}/>,
        "power-sanders":<PowerSanders {...{user, update}}/>,
        "routers":<Routers {...{user, update}}/>,
        "fdm-3d-printing":<FDMPrinting {...{user, update}}/>,
        "laser-cutting":<LaserCutting {...{user, update}}/>
    }


    useEffect(()=>user.mongoClient('mongodb-atlas').db('betty').collection('trainings').find()
        .then(resp=>{
            let t = {};
            resp.map( training => { t[training.id] = training });
            setTrainings(t)
        })
    ,[user, setTrainings])

    return(
        !trainingId ? <Map trainings={trainings} userId={user.id} active={Object.keys(catalog)}/> :
        !catalog[trainingId] ? <Alert variant="danger"><strong>{trainingId}</strong> is not a valid training ID.</Alert> : 
        catalog[trainingId]
    )
}

export default Trainings;