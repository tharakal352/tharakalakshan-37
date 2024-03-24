import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import { PORT , MONGOURL} from "./config.js"
import { userRouter} from "./routes/users.js"
import { recipesRouter} from "./routes/recipes.js"




const app = express();

app.use(express.json());
app.use(cors());


app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);


mongoose.connect(MONGOURL)
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

app.listen(PORT, () => {
    console.log(`APP RUNNING ON ${PORT}`)
});


