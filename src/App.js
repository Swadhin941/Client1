import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import { Toaster } from "react-hot-toast";
import Main from './Components/Layout/Main';
import AddDesign from './Components/AddDesign/AddDesign';
import MyDesigns from './Components/MyDesigns/MyDesigns';
import AddUser from './Components/AddUser/AddUser/AddUser';
import ApproveRequest from './Components/ApproveDesign/ApproveRequest/ApproveRequest';
import ReviewDesigns from './Components/ApproveDesign/ReviewDesigns/ReviewDesigns';
import ManagePayment from './Components/ManagePayment/ManagePayment';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import ForbiddenAccess from './Components/ForbiddenAccess/ForbiddenAccess';
import PrivateRouter from './Components/PrivateRouter/PrivateRouter';
import DesignDetails from './Components/ApproveDesign/DesignDetails/DesignDetails';
import AvailablePackage from './Components/AvailablePackage/AvailablePackage';
import AdminRouter from './Components/PrivateRouter/AdminRouter';
import DesignerRouter from './Components/PrivateRouter/DesignerRouter';
import Carts from './Components/Carts/Carts';
import Root from './Components/Layout/Root';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[ 
        {
          path: "/",
          element: <Login></Login>
        },
        {
          path: "/login",
          element: <Login></Login>
        }       
        
      ]
    },
    {
      path: "/Dashboard",
      element: <PrivateRouter><Main></Main></PrivateRouter>,
      children: [
        {
          path: "/Dashboard",
          element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>
        },
        {
          path: "/Dashboard/addDesign",
          element: <DesignerRouter><AddDesign></AddDesign></DesignerRouter>
        },
        {
          path: "/Dashboard/myDesigns",
          element: <DesignerRouter><MyDesigns></MyDesigns></DesignerRouter>
        },
        {
          path: "/Dashboard/addUser",
          element: <AdminRouter><AddUser></AddUser></AdminRouter>
        },
        {
          path: "/Dashboard/ApproveRequest",
          element: <AdminRouter><ApproveRequest></ApproveRequest></AdminRouter>,
        },
        {
          path: "/Dashboard/review-designs",
          element: <AdminRouter><ReviewDesigns></ReviewDesigns></AdminRouter>
        },
        {
          path: "/Dashboard/specific-design",
          element: <PrivateRouter><DesignDetails></DesignDetails></PrivateRouter>
        },
        {
          path: "/Dashboard/managePayment",
          element: <AdminRouter><ManagePayment></ManagePayment></AdminRouter>
        },
        {
          path: "/Dashboard/availablePackage",
          element: <PrivateRouter><AvailablePackage></AvailablePackage></PrivateRouter>
        },
        {
          path: "/Dashboard/carts",
          element: <PrivateRouter><Carts></Carts></PrivateRouter>
        }
      ]
    },
  
    {
      path: "*",
      element: <PageNotFound></PageNotFound>
    },
    {
      path: "/forbidden",
      element: <ForbiddenAccess></ForbiddenAccess>
    }
  ])
  return (
    <div >
      <RouterProvider router={router}>

      </RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
