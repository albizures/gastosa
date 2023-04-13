import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import {
	QueryDatabaseResponse,
	GetDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';

type Data = {
	name: string;
};

const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

const database_id = '8db1508bef6a494697c8dfe8f84b93f9';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<QueryDatabaseResponse>,
) {
	// const response = await notion.databases.query({
	// 	database_id,
	// });

	const response = await notion.databases.query({
		database_id,
	});

	console.log('Got response:', response);

	res.status(200).json(response);
}
