import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler } from "@tickethub1/common";
import { NotFoundError, currentUser } from "@tickethub1/common";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes/index";
import { updateTicketRouter } from "./routes/update";

const app = express();
app.set("trust proxy", true); // express is aware that it's behind ingress-nginx proxy and to trust it
app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test", // allow only HTTPS transfer
  })
);

app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
