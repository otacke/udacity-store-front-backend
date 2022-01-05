import Server from './server/server';

// http://localhost:<port>
const StoreFrontApi = new Server(parseInt(process.env.PORT as unknown as string));
StoreFrontApi.startListening();
