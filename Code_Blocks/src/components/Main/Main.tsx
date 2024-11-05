import React from 'react'
// import Browse from './Browse'
import { createBrowserRouter } from 'react-router-dom'
// import Login from './Login'
import { RouterProvider } from 'react-router-dom'
import ParentComponent from '../ParentComponent/ParentComponent'


const Main = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <ParentComponent/>
        },
        // {
        //     path: "/browse",
        //     element:<Browse/>
        // }
    ])
  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Main