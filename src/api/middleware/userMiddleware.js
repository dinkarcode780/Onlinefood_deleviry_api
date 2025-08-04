
import jwt from "jsonwebtoken"
import userModel from "../../models/userModel.js";


// export const userMiddleware = async (req, res, next) => {
//     try {
//         let token = req.headers["authorization"];
//         if (!token) return res.status(401).json({ success: false, message: "JWT token is required", isAuthorized: false });

//         if (token.startsWith("Bearer ")) token = token.slice(7);

//         let decodeToken = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("Decoded Token:", decodeToken);

//         console.log("user id", decodeToken.userId);
//         if (!decodeToken.userId) return res.status(400).json({ success: false, message: "Token does not contain userId", isAuthorized: false });
        
//         const user = await userModel.findById(decodeToken.userId);
//         if (!user) return res.status(404).json({ success: false, message: "User not found" });

//         req.userId = decodeToken.userId; 
//         next();
//     } catch (error) {
//         if (error.name === "TokenExpiredError") {
//             return res.status(401).json({ success: false, message: "JWT token has expired", isAuthorized: false });
//         }
//         return res.status(400).json({ success: false, message: "Invalid JWT token", isAuthorized: false });
//     }
// };


// export const adminAuth = async (req, res, next) => {
//     try {
//         let token = req.headers["authorization"];
//         if (!token) return res.status(401).json({ success: false, message: "JWT token is required", isAuthorized: false });

//         if (token.startsWith("Bearer ")) token = token.slice(7);

//         let decodeToken = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("Decoded Token:", decodeToken);

//         if (!decodeToken.userId) return res.status(400).json({ success: false, message: "Token does not contain userId", isAuthorized: false });
        
//         const user = await userModel.findById(decodeToken.userId);
//         if (!user) return res.status(404).json({ success: false, message: "User not found" });
//         if(user.userType != "ADMIN") return res.status(500).json({success:false, message:"You are not an admin"})
//         req.userId = decodeToken.userId; // Pass userId for further use
//         next();
//     } catch (error) {
//         if (error.name === "TokenExpiredError") {
//             return res.status(401).json({ success: false, message: "JWT token has expired", isAuthorized: false });
//         }
//         return res.status(400).json({ success: false, message: "Invalid JWT token", isAuthorized: false });
//     }
// };



export const userMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    
    console.log("DECODED TOKEN PAYLOAD:", decoded);
    if (err) {
      const message =
        err.name === "TokenExpiredError"
          ? "Token has expired"
          : "Invalid token";
      return res.status(401).json({ success: false, message });
    }

    
    if (!decoded?.userType) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token payload" });
    }

    if (decoded.userType !== "USER") {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized" });
    }

   
    req.user = decoded;
    next();
  });
};



export const adminMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      const message =
        err.name === "TokenExpiredError"
          ? "Token has expired"
          : "Invalid token";
      return res.status(401).json({ success: false, message: message });
    }
    if (decoded.user.userType == "USER") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

export const referelMiddleware = async (req, res, next) => {
  try {
    let { referenceCode } = req.body;
    if (!referenceCode) {
      next();
    } else {
      let commission = 100;
      const user = await userModel.findOne({ referenceCode: referenceCode });
      if (!user) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Please Provide Curect the Reference Code",
          });
      }

      user.totalCommission += commission;
      user.totalPeopleAdded += 1;
      await user.save();

      req.user = user;
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message });
  }
};