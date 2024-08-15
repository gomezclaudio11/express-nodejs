import express from "express";
import morgan from "morgan";

const app = express();

//setting
app.set("appName", "Express tutorial");
app.set("port", 3000);
app.set("viewa engine", "ejs")
//middleware
function logger(req, res, next) {
    console.log(`route received: ${req.protocol}://${req.get("host")}${req.origunalUrl}`);
    next();
}

app.use(express.json()) //middleware nativo de express
app.use(logger)
app.use(morgan("dev"))

app.all("/user", (req, res, next) => {
    console.log("por aqui paso");
    next()
})

//ruteo
app.get ("/", (req, res) => {
    const data = [{name: "juan"}, {name: "damian"}, {name: "carlos"},]
    res.render("index.ejs", {people: data})
})
app.get ("/user", (req, res) => {
    res.json({
        username: "cameron",
        LastName: "howe"
    });
})

app.post("/user/:id", (req, res) => {
    console.log(req.body);
    console.log(req.params);
    res.send("post request received")
})
app.put("/contact/:id", (req, res) => {
    console.log(req.body);
    console.log(req.params);
    res.send(`user ${req.params.id} update`)
    
})

app.delete("/delete/:userId", (req, res) => {
    res.send(`User ${req.params.userId} deleted`)
})
//middelware nativo de express
app.use(express.static("public"))

app.listen (app.get("port"), () => {
    console.log(app.get("appName"));
    console.log("server on port", app.get("port"));
})

