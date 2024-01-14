import express, {Express, Request, Response} from 'express';
import {config} from './config';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.listen(config.PORT, () => {
    console.log(`Server is listening on port ${config.PORT}`);
})