import express, {Express, Request, Response} from 'express';
import {config} from './config';
import {render} from './render';
import axios from 'axios';
import {webpackMiddleware} from './middlewares/webpackMiddleware';

const app: Express = express();

const isDev = process.env.NODE_ENV !== 'production';

if (isDev) {
	app.use(webpackMiddleware());
} else {
	app.use(express.static('dist'));
}

app.use(express.static('dist'));

app.get('/galaxias', async (req: Request, res: Response) => {
	try {
		const {data} = await axios.get('https://images-api.nasa.gov/search?q=galaxies');

		const initialProps = {
			galaxies: data?.collection?.items,
		};

		res.send(render(req.url, initialProps));
	} catch (error) {
		throw new Error('An error ocurred in /galaxias');
	}
});

app.get('*', (req: Request, res: Response) => {
	res.send(render(req.url));
});

app.listen(config.PORT, () => {
	console.log(`Server is listening on port ${config.PORT}`);
});
