


import "./App.css";

import Snowfall from 'react-snowfall'

import { RouterProvider } from "react-router-dom";
import { router } from "./Component/Route";
function App() {
 
  
  return (
    <>
    <RouterProvider router={router}/>
      <Snowfall color="white" />
      
    </>
  )
}

export default App

