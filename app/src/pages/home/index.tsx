import PostMain from "../posts";
import toast, { Toaster } from "react-hot-toast";
import { Suspense, useEffect } from "react";
import Loader from "../../common/components/loader";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAuthenticated,
  setShowLoader,
  setUser,
} from "../../common/redux-utils/utils-slice/utilsSlice";
import { authenticateUser } from "../../common/apis/userServices";
export const baseUrl = "http://localhost:4000";

const Home = () => {
  const showLoader = useSelector((state: any) => state.showLoader);
  const dispatch = useDispatch();

  useEffect(() => {
    authenticateUsers();
  }, []);

  const authenticateUsers = () => {
    try {
      dispatch(setShowLoader(false));
      authenticateUser()
        .then((res) => {
          const { success, user, message } = res;
          if (success) {
            dispatch(setUser(user));
            dispatch(setIsAuthenticated(true));
            dispatch(setShowLoader(false));
            toast.success(message);
          } else {
            toast.error(message);
            dispatch(setIsAuthenticated(false));
            dispatch(setShowLoader(false));
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          dispatch(setUser([]));
          setIsAuthenticated(false);
          dispatch(setShowLoader(false));
        });
    } catch (err: any) {
      toast.error(err.response.data.message);
      setUser([]);
      setIsAuthenticated(false);
      dispatch(setShowLoader(false));
    }
  };

  return (
    <div className={`${showLoader ? "opacity-60 bg-gray-600" : ""} relative`}>
      {showLoader && (
        <div className="absolute w-full h-screen left-0 top-16 flex items-center justify-center ">
          <Loader />
        </div>
      )}
      <Suspense fallback="">
        <PostMain />
        <Toaster />
      </Suspense>
    </div>
  );
};

export default Home;
