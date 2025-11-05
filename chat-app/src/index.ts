export class ChatRoom {
	state: DurableObjectState;
	clients: Set<WebSocket> = new Set();
	messages: string[] = [];

	constructor(state: DurableObjectState, env: Env) {
		this.state = state;
	}

	async fetch(request: Request) {
		const upgradeHeader = request.headers.get('Upgrade');

		if (upgradeHeader !== 'websocket') {
			return new Response('Not a websocket request', { status: 400 });
		}

		const [client, server] = Object.values(new WebSocketPair());
		this.handleSession(server);

		return new Response(null, {
			status: 101,
			webSocket: client,
		});
	}

	async handleSession(socket: WebSocket) {
		socket.accept();

		this.clients.add(socket);

		socket.addEventListener('message', async (event) => {
			const message = event.data;
			this.messages.push(message);

			// BroadCast message to all
			for (const client of this.clients) {
				if (client !== socket) {
					client.send(message);
				}
			}

			await this.state.storage.put('messages', this.messages);
		});

		socket.addEventListener('close', () => {
			this.clients.delete(socket);
		});

		const storedMessages = (await this.state.storage.get('messages')) || [];
		for (const msg of storedMessages as string[]) {
			{
				socket.send(msg);
			}
		}
	}
}


export default {
	async fetch(request:Request , env:Env){
		const url = new URL(request.url);
		const roomId = url.pathname.split("/").pop();
		if(!roomId) return new Response("Missing room id", {status: 400});
		
		const durableObjectId = env.MY_DURABLE_OBJECT.idFromName(roomId);
		const durableObjectStub = env.MY_DURABLE_OBJECT.get(durableObjectId);

		return durableObjectStub.fetch(request);
	}
}