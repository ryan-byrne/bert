import { Route, Routes, useParams } from "react-router-dom";
import Schedule from "./Schedule";


export default function SchedulePage() {

  return (
    <Routes>
      <Route index element={<Schedule view={false} create={false}/>}/>
      <Route path="create" element={<Schedule create={true}/>}/>
      <Route path='view/:id' element={<Schedule view={true}/>}/>
    </Routes>
  )
}
