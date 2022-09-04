import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
