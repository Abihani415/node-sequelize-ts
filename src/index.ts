import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import cors, { CorsOptions } from "cors";
import userRoute from "./routes/users.route";
import authRoute from "./routes/auth.route";
import addressRoute from "./routes/address.route";

if (!process.env.NODE_ENV) {
  throw new Error("env file is not set");
}
const app: express.Application = express();

const authenticateRoute = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded: JwtPayload | string = jwt.verify(
        token,
        process.env.SECRET!
      );
      if (typeof decoded === "object") {
        req.user = decoded.data;
      }
      next();
    } catch (e) {
      const error = e as Error;
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message,
        error,
      });
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "token is required",
    });
  }
};

const corsOptions: CorsOptions = {
  // origin: "http://127.0.0.1:3000",
  // methods: "GET,PUT,POST,DELETE",
  // preflightContinue: false,
  // optionsSuccessStatus: 204,
  // allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.end("hello there");
});
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", authenticateRoute, userRoute);
app.use("/api/v1/address", authenticateRoute, addressRoute);

app.listen(process.env.NODE_APP_PORT);
