import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const stompClient = new Client({
  webSocketFactory: () => new SockJS('http://localhost:8080/ws'), // Spring endpoint
  reconnectDelay: 5000,
  onConnect: () => {
    console.log('✅ Connected to WebSocket');
    // Subscribe to the topic
    stompClient.subscribe('/topic/messages', message => {
      console.log('📩 Message received:', JSON.parse(message.body));
    });
  },
  onStompError: (frame) => {
    console.error('STOMP Error:', frame);
  },
});

export default stompClient;