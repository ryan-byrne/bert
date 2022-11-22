import { Route, Routes, useParams } from "react-router-dom";
import { Index } from "./routes/Index";


export default function ToolsPage() {

  return (
    <Routes>
      <Route index element={<Index/>}/>
      <Route path='view/:id' element={<Index view={true}/>}/>
      <Route path='demo/:id' element={<Index demo={true}/>}/>
    </Routes>
  )
}
