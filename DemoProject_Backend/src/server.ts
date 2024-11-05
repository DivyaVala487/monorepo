import app from "./app";
const port = process.env.PORT || 8000;
// import { swaggerDocs } from "@utils/swagger";

app.listen(port, () => {
  console.log(`
 --------------------------------
| Server listening on Port: ${port} |
 --------------------------------
`);
});