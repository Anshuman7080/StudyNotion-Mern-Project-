import {toast} from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import {setUser}  from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"
import { settingsEndpoints } from "../apis"


const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

const{
  DELETE_PROFILE_API,
}=settingsEndpoints





export function sendOtp(email, navigate){
  return async (dispatch) => {
     const toastId = toast.loading("Loading...")
     dispatch(setLoading(true));

     try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })

      console.log("SENDOTP API RESPONSE............", response)

 

      if(!response.data.success){
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
     } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
     }
     dispatch(setLoading(false));
     toast.dismiss(toastId);
  }
}



export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
){
  return async (dispatch) => {
     const toastId = toast.loading("Loading...")
     dispatch(setLoading(true));

     try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp
      })

      console.log("SIGNUP_API RESPONSE............", response)

      console.log(response.data.success)

      if(!response.data.success){
        throw new Error(response.data.message)
      }

      toast.success("Signup successful")
      navigate("/login")
     } catch (error) {
      console.log("SIGNUP_API ERROR............", error)
      toast.error("Could Not Sign up user")
     }
     dispatch(setLoading(false));
     toast.dismiss(toastId);
  }
}

export function login(email, password, navigate) {
// ........use of Disptach in redux-thunk........

  // By default, Redux only allows synchronous actions, meaning you can’t directly handle async
  //  tasks like fetching data from an API. Thunk middleware fixes this by allowing action
  //  creators to return functions instead of plain objects.



  // In Redux (or Redux Toolkit), a thunk is a higher-order function that allows
  //  you to write logic that interacts with the Redux store, such as asynchronous actions (like API calls).
  //  When using redux-thunk as middleware, 
  // every action creator can either return an action object (the typical approach) or
  //  return a function instead.

  //  reason why dispatch is written( this is  a thunk)
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE............", response);

     
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

     
      const existingUser = response.data?.user;
      const userImage = existingUser?.image
        ? existingUser.image
        : existingUser
        ? `https://api.dicebear.com/5.x/initials/svg?seed=${existingUser.firstName || ""} ${existingUser.lastName || ""}`
        : "https://api.dicebear.com/5.x/initials/svg?seed=Unknown";

      
      toast.success("Login Successfully");
      dispatch(setToken(response.data.token));
      dispatch(setUser({ ...response.data.user, image: userImage }));

      console.log("user data is ",response.data.user);
     
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard/my-profile");
    } catch (error) {
      console.error("LOGIN API ERROR............", error);
      toast.error("Could Not LOGIN");
    } finally {
     
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}


export function logout(navigate) {
  return (dispatch)=>{
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out")
    navigate("/")
  }
}

export function getPasswordResetToken(email, setEmailSent){
  return async(dispatch) =>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));

    try {
     const response = await apiConnector("POST", RESETPASSTOKEN_API, {email});
     console.log("RESETPASSTOKEN_API RESPONSE............", response)

      console.log(response.data.success)

      if(!response.data.success){
        throw new Error(response.data.message)
      }
    
      toast.success("Mail Sent successful")
      setEmailSent(true);
    } catch (error) {
      console.log("RESETPASSTOKEN_API ERROR............", error)
      toast.error("Could Not Send Mail")
    }
    dispatch(setLoading(false));
     toast.dismiss(toastId);
  }
}


export function resetPassword(password, confirmPassword, token, navigate) {
  return async(dispatch)=>{
    const toastId = toast.loading("Loading in reset password")
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token})

      console.log("RESETPASSWORD_API RESPONSE............", response)

      console.log(response.data.success)

      if(!response.data.success){
        throw new Error(response.data.message)
      }
    
      toast.success("Password reset successful")


    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}



export function deleteAccount(id,token, navigate) {
 
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
 
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, token, {
       
          Authorization: `Bearer ${token}`,
        
    });

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to delete account.");
      }

      dispatch(setToken(null));
      dispatch(setUser(null));
      dispatch(resetCart());
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.success("Account deleted successfully.");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Unable to delete account. Please try again.");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}
