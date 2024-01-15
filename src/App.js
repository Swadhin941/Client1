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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
          path: "/",
          element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>
        },
        {
          path: "/addDesign",
          element: <AddDesign></AddDesign>
        },
        {
          path: "/myDesigns",
          element: <MyDesigns></MyDesigns>
        },
        {
          path: "/addUser",
          element: <AddUser></AddUser>
        },
        {
          path: "/ApproveRequest",
          element: <ApproveRequest></ApproveRequest>,
        },
        {
          path: "/review-designs/:id",
          element: <ReviewDesigns></ReviewDesigns>
        },
        {
          path: "/managePayment",
          element: <ManagePayment></ManagePayment>
        }
      ]
    },
    {
      path: "/login",
      element: <Login></Login>
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
