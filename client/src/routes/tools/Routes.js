import { Route, Routes } from "react-router-dom";
import { Index } from "./routes/Index";


export default function ToolsPage() {

  return (
    <Routes>
      <Route index element={<Index/>}/>
      <Route path='view/:id' element={<Index viewer={true}/>}/>
    </Routes>
  )
}
