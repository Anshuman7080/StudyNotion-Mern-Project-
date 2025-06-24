
import { settingsEndpoints } from "../apis";
import {toast} from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"

import { apiConnector } from "../apiconnector"
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";

const {
    CHANGE_PASSWORD_API,
    UPDATE_PROFILE_API,
    UPDATE_DISPLAY_PICTURE_API,
}=settingsEndpoints;


export function changePassword(formData,token,navigate,dispatch){
    return async(dispatch)=>{
            const toastId = toast.loading("Loading...")
             dispatch(setLoading(true));

             try{

     const response=await apiConnector("POST",CHANGE_PASSWORD_API, formData,{
            Authorization: `Bearer ${token}`,
          })

          console.log("Change password repsonse",response);

          if(!response?.data?.success){
            throw new Error(response.data.message);
          }
      


      toast.success("Password Changed Successfully");

     dispatch(setToken(null));
       dispatch(setUser(null));
         dispatch(resetCart());
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        //   toast.success("Logged Out");
          navigate("/login");

    //   navigate("/login");

             }
             catch(error){
            console.log("change password Api error",error);
            toast.error(error.response.data.message);
             }
             
                 dispatch(setLoading(false));
                 toast.dismiss(toastId);

    }
}


export function updateProfileDetails(data, token,navigate) {
  
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        

        try {
       
            
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, data ,{
              
                    Authorization: `Bearer ${token}`,
                
            });
         
      

            if (!response?.data?.success) {
                throw new Error(response?.data?.message || "Something went wrong!");
            }
         
            toast.success("Profile updated successfully!");
           
            // navigate("/dashboard/my-profile");
          
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update profile. Please try again.");
        } 
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        
    };
}


export function updateProfilePicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Display Picture Updated Successfully")
      dispatch(setUser(response.data.data))
      
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}

