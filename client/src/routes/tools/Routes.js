import { Route, Routes } from "react-router-dom";
import { Index } from "./routes/Index";
import Viewer from "./routes/Viewer";


export default function Tools() {

  return (
    <Routes>
      <Route index element={<Index/>}/>
      <Route path='viewer/:id' element={<Viewer/>}/>
    </Routes>
  )
}
