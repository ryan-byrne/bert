import { useEffect } from "react"
import { Link } from "react-router-dom"
export default ({}) => {

    useEffect(()=>{
        
    },[])

    const routes = [
        "introduction",
        "power-drills",
        "drill-press",
        "hand-saws",
        "band-saws",
        "jig-saws",
        "power-sanders",
        "routers",
        "fdm-printing"
    ]

    return(
        <div>
            {routes.map(r => 
                <div><Link to={r}>{r}</Link></div>
            )}
        </div>
    )
}