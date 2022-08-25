export default ({trainings, userId, active}) => {

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