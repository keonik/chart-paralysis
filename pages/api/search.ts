import { NextApiRequest, NextApiResponse } from 'next';
import { fetcher } from '../../lib/fetcher';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const text = req.query;

    if (text) {
        const suggestQuery = {
            // eslint-disable-next-line
            autocomplete_suggest: {
                text,
                completion: {
                    field: 'suggest',
                },
            },
        };
        const url = `https://search-npm-registry-4654ri5rsc4mybfyhytyfu225m.us-east-1.es.amazonaws.com//npm/_suggest?source=${JSON.stringify(
            suggestQuery
        )}`;
        const data = await fetcher(url);
        res.status(200).json(data);
    } else {
        res.status(500).send('missing search text');
    }
};

export default handler;
