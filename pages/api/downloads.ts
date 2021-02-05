// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import { fetcher } from '../../lib/fetcher';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const query = req.query;
    const { start, end } = query;
    const packages =
        typeof query.packages === 'string' && query.packages?.split(',');

    if (packages && packages.length !== 0 && start && end) {
        const downloads = [];
        const promises: Promise<any>[] = [];
        packages.forEach((npmpackage) => {
            const url = `https://api.npmjs.org/downloads/point/${start}:${end}/${npmpackage}`;
            promises.push(
                fetcher(url).then((res) => {
                    downloads.push({
                        name: res.package,
                        downloads: res.downloads,
                    });
                })
            );
        });
        Promise.all(promises).then(() => res.status(200).json(downloads));
    } else {
        res.status(500).send('missing start, end, or packages');
    }
};

export default handler;
