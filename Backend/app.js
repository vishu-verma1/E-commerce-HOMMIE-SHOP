const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const limiter = require("./middleware/rateLimiter");
const connectDb = require("./config/dbConnecton");
connectDb();
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const path = require("path");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const morgan = require("morgan");
const logger = require("./logger/indexLogger");
const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);
app.use("/", limiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("hi");
});

app.use("/user", userRoute);
app.use("/products", productRoute);

app.listen(3000, () => {
  console.log(`Server is Running on Port ${3000}`);
});
