import  jwt  from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: "You need to login first" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({ error: "no user found login first" });
        }

        const user = await User.findById(decoded.id).select("-password");


        if(!user){
            return res.status(404).json({ error: "no user found" });
        }
            req.user = user;
            next();

    } catch (error) {
        console.log("error in protectRoute middleware", error.message);
        res.status(500).json({ error: "internal server error" });
    }
};

export default protectRoute;