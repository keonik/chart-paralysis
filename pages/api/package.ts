import { NextApiRequest, NextApiResponse } from 'next';
import { fetcher } from '../../lib/fetcher';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const query = req.query;
    const packages = await JSON.parse(`${query.packages}`);
    if (packages && packages.length > 0) {
        const response = await fetcher(`https://api.npms.io/v2/package/mget`, {
            method: 'POST',
            body: `${query.packages}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        if (
            response[packages[0]] &&
            Object.keys(response).length === packages.length
        ) {
            res.status(200).json(response);
        } else {
            res.status(500).send('Unexpected change with npm api');
        }
    } else {
        res.status(500).send('No packages provided');
    }
};
export default handler;
