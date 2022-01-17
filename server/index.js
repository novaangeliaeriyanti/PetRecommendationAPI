// 1. pastikan selalu import dotenv di line pertama
//import "dotenv/config";
import config from './config/config'
import express from "express";
import cors from "cors";
import compress from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import middleware  from "./middleware/middleware";
import swaggerUI from "swagger-ui-express"
import swaggerDocument from "./swagger/swagger.json"

//for access models to db
import models,{sequelize} from "./models/init-models";
import routes from './routes/IndexRoute'

// declare port
const port = process.env.PORT || 3001;

const app = express();
// parse body params and attache them to req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// use helmet spy bisa dikenali SEO
app.use(helmet())
// secure apps by setting various HTTP headers
app.use(compress())
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// load models dan simpan di req.context
app.use(async (req,res,next) =>{
    req.context = {models};
    next();
});

/*  app.use(process.env.URL_DOMAIN,(req,res)=>{
    res.send("Hello Eshopay");
});  */


//auth.setMiddleware(app);


// call routes
app.use(config.URL_DOMAIN+"/auth",routes.authRoute)
app.use(config.URL_API+"/category",routes.categoryRoute);
app.use(config.URL_API+"/product",routes.productRoute);
app.use(config.URL_API+"/cart",routes.cartRoute);
app.use(config.URL_API+"/order",routes.orderRoute);

//swagger
app.use("/api/docs",swaggerUI.serve,swaggerUI.setup(swaggerDocument))

//use middleware to handle error from others modules
app.use(middleware.handleError);
app.use(middleware.notFound);


// set to false agar tidak di drop tables yang ada didatabase
const dropDatabaseSync = false;

sequelize.sync({force : dropDatabaseSync}).then(async ()=>{
    if(dropDatabaseSync){
        console.log("Database do not drop");
    }

    app.listen(port,()=>{
        console.log(`Server is listening on port ${port}`)
    });

})



export default app;