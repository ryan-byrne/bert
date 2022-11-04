import { Route, Routes } from "react-router-dom";
import { Index } from "./routes/Index";
import Viewer from "./routes/Viewer";


export default function ToolsPage() {

  return (
    <Routes>
      <Route index element={<Index/>}/>
      <Route path='view/:id' element={<Index viewer={true}/>}/>
      <Route path='reserve/:id' element={<Index reserve={true}/>}/>
    </Routes>
  )
}
