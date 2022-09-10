import express, { json } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import cors from 'cors';
import errorHandlerMiddleware from './middlewares/ErrorHandlingMiddleware';
import ExceptionHandler from './events/AppError';
import authRouter from './routes/AuthRouter';
import credentialsRouter from './routes/credentialsRouter';
import notesRouter from './routes/notesRouter';


const app = express();

app.use(cors());
app.use(json());
app.use(helmet());
app.use(authRouter)
app.use(credentialsRouter)
app.use(notesRouter)
app.use(errorHandlerMiddleware);
app.use(ExceptionHandler);

export default app;
