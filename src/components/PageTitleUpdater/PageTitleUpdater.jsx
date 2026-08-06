import React, { useEffect } from 'react'
import {useLocation} from  "react-router-dom";
const PageTitleUpdater = () => {
    const location = useLocation();
    useEffect(() => {
      const path = location.pathname;
      let title = "Employee Management System";
  
      if (path.includes("login")) title = "Login | EMS";
      else if (path.includes("signup")) title = "Sign Up | EMS";
      else if (path.includes("reset-password")) title = "Reset Password | EMS";
      else if (path === "/" || path === "") title = "EMS";
  
      if (
        !path.includes("/admin/") &&
        !path.includes("/hr/") &&
        !path.includes("/manager/")
      ) {
        document.title = title;
      }
    }, [location]);
  
    return null;
  };

export default PageTitleUpdater