  import { withCtx } from '../../src/core/context';
import { Database } from '../../src/core/database';
import index from './index'
import express from 'express';

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

withCtx({}, async () => Database.withDBM(async () => {
    app.get('/users/:id', async (req, res) => {
        const dataId = req.params.id;
        const data = await index.users!.GET!.findOne(dataId);

        res.json(data);
    });

    app.post('/users', async (req, res) => {
        const body = req.body;

        const data = await index.users!.POST!.create(body);
        
        res.json(data);
    });


    const port = 30001
    app.listen(port, () => console.log(`🚀[http server ready] at http://localhost:${port}/`))

}));
