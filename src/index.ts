import express from "express";
import path from "path";
import { Db, MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { Car, User, Review, Contact } from "../types";
import { NextFunction, Request, Response } from "express";
import carsData from "../autos.json";
import session from "express-session";

const uri =
  "mongodb+srv://Dzhaner:12345678Dzhaner@cluster0.pa8gmws.mongodb.net/";
const client = new MongoClient(uri);
const app = express();

app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.set("src", path.join(__dirname, "src"));
app.use(express.static(path.join(__dirname, "../public")));

function isAuthenticated(req: Request, res: Response, next: Function) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
}

(async () => {
  const database = client.db("WestAuto");
  const autoCollection = database.collection<Car>("autos");
  const userCollection = database.collection<User>("users");

  const meestBekeken = [
    { id: "4", name: "Audi RS6", img: "/NewFotos/Audi-RS6-2022.png" },
    { id: "1", name: "BMW M3", img: "/NewFotos/BMW-M3Touring.png" },
    { id: "3", name: "Audi R8", img: "/NewFotos/Audi-R8-2022-red.png" },
  ];

  let cars: Car[] = carsData as Car[];
  console.log(`${cars[0].brand}`);

  let autosDB = await autoCollection.countDocuments();
  if (autosDB == 0) {
  }

  app.get("/", isAuthenticated, (req, res) => {
    let user: string;
    res.render("index", { meestBekeken, user: req.session.user?.username });
  });
  app.get("/shop", isAuthenticated, (req, res) => {
    res.render("shop", { cars });
  });
  app.get("/overons", isAuthenticated, (req, res) => {
    res.render("overons");
  });
  app.get("/contact", isAuthenticated, (req, res) => {
    res.render("contact");
  });

  /*= registratie en login =*/
  app.get("/registratie", (req, res) => {
    res.render("registratie");
  });
  app.post("/registreren", async (req, res) => {
    let username = req.body.username;
    let password1 = req.body.password;
    let password2 = req.body.password2;

    if (!username || !password1 || !password2) {
      return res
        .send(500)
        .render("login", { error: "Vul alle velden in", title: "Registratie" });
    }
    if (password1 !== password2) {
      return res.status(400).render("registratie", {
        title: "Registratie",
        error: "Wachtwoorden komen niet overeen.",
      });
    }
    try {
      const existinguser = await userCollection.findOne({ username });
      if (existinguser) {
        return res.send(400).render("registratie", {
          error: "Deze gebruiker bestaat al",
          title: "Registratie",
        });
      }

      let saltRounds = 10;
      let password = await bcrypt.hash(password1, saltRounds);

      const newUser: User = {
        username: username,
        password: password,
      };

      await userCollection.insertOne(newUser);
    } catch {
      return res.send(400).render("registratie", {
        error: "Probleem bij het aanmaken van de gebruiker",
        title: "Registratie",
      });
    }

    res.redirect("/login");
  });
  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.post("/inloggen", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await userCollection.findOne({ username });
    if (!user) {
      return res
        .send(400)
        .render("login", { title: "login", error: "Gebruiker niet gevonden." });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("De gebruiker heeft het wachtwoord verkeerd geschreven.");
      return res.send(400).render("login");
    }

    req.session.user = { username: user.username };
    res.redirect("/");
  });
  /*= einde registratie en login =*/
  /*-logout-*/
  app.get("/logout", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  });
  /*-logout-*/
  app.get("/productpagina/:id", (req, res) => {
    const id = req.params.id;
    const car = cars.find((a) => a.id === id);

    if (!car) {
      return res.status(404).send("Auto niet gevonden");
    }

    res.render("productpagina", { car });
  });

  app.post("/review-post", async (req, res) => {
    res.render("productpagina");
  });

  app.get("/auto-toevoegen", isAuthenticated, (req, res) => {
    res.render("caradd", { success: null, error: null });
  });
})();
const port = 3000;
app.listen(port, () => console.log("Server running"));
