// shared/services/community/chatHubService.ts

import { IChatMessage } from '@/shared/interfaces/chat/IChatMessage';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosInstance } from 'axios';
import apiService from '../api';

export class ChatHubService {
  private connection: HubConnection | null = null;
  private currentCommunityId: string | null = null;
  private onUsersInChannelChangedCallback: ((count: number) => void) | null = null;

  // Get auth token for SignalR connection
  public async getAuthToken(): Promise<string | null> {
    try {
      let token = await AsyncStorage.getItem('authToken');
      if (!token) {
        token = process.env.EXPO_PUBLIC_API_TOKEN || null;
      }
      return token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return process.env.EXPO_PUBLIC_API_TOKEN || null;
    }
  }

  // Get axios instance for SignalR custom requests
  public getAxiosInstance(): AxiosInstance {
    return apiService.getAxiosInstance();
  }

  // Initialize SignalR connection
  async initializeConnection(): Promise<boolean> {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        console.error('No auth token available for SignalR connection');
        return false;
      }

      const hubUrl = `${process.env.EXPO_PUBLIC_API_URL?.replace('/api', '')}/chatHub`;

      this.connection = new HubConnectionBuilder()
        .withUrl(hubUrl, {
          accessTokenFactory: () => token
        })
        .withAutomaticReconnect([0, 2000, 10000, 30000])
        .configureLogging(LogLevel.Information)
        .build();

      this.setupEventHandlers();

      await this.connection.start();
      console.log('SignalR connection established');
      return true;
    } catch (error) {
      console.error('Error connecting to SignalR hub:', error);
      return false;
    }
  }

  private setupEventHandlers() {
    if (!this.connection) return;

    this.connection.onreconnecting(() => {
      console.log('SignalR reconnecting...');
    });

    this.connection.onreconnected(() => {
      console.log('SignalR reconnected');
      if (this.currentCommunityId) {
        this.joinCommunityGroup(this.currentCommunityId);
      }
    });

    this.connection.onclose(() => {
      console.log('SignalR connection closed');
    });

    // 👥 Evento: número de usuarios en el canal ha cambiado
    this.connection.on('UsersInChannelChanged', (count: number) => {
      if (this.onUsersInChannelChangedCallback) {
        this.onUsersInChannelChangedCallback(count);
      }
    });
  }

  // 👥 Suscripción al cambio de usuarios en el canal
  onUsersInChannelChanged(callback: (count: number) => void): void {
    this.onUsersInChannelChangedCallback = callback;
  }

  // 🚫 Cancelar suscripción al cambio de usuarios en el canal
  offUsersInChannelChanged(): void {
    this.connection?.off('UsersInChannelChanged');
    this.onUsersInChannelChangedCallback = null;
  }

  async joinCommunityGroup(communityId: string): Promise<void> {
    if (!this.connection || this.connection.state !== 'Connected') {
      console.error('SignalR connection not established');
      return;
    }

    try {
      await this.connection.invoke('JoinCommunityGroup', communityId);
      this.currentCommunityId = communityId;
      console.log(`Joined community group: ${communityId}`);
    } catch (error) {
      console.error('Error joining community group:', error);
    }
  }

  async leaveCommunityGroup(communityId: string): Promise<void> {
    if (!this.connection || this.connection.state !== 'Connected') return;

    try {
      await this.connection.invoke('LeaveCommunityGroup', communityId);
      if (this.currentCommunityId === communityId) {
        this.currentCommunityId = null;
      }
      console.log(`Left community group: ${communityId}`);
    } catch (error) {
      console.error('Error leaving community group:', error);
    }
  }

  async sendMessageToCommunity(communityId: string, message: string, senderName: string): Promise<void> {
    if (!this.connection || this.connection.state !== 'Connected') {
      throw new Error('SignalR connection not established');
    }

    try {
      await this.connection.invoke('SendMessageToCommunity', communityId, message, senderName);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  onReceiveMessage(callback: (message: IChatMessage) => void, currentUserId?: string): void {
    if (!this.connection) return;

    this.connection.on('ReceiveMessage', (message) => {
      callback({
        id: message.id || Date.now() + Math.random(),
        senderId: message.senderId,
        senderName: message.senderName,
        content: message.content,
        timestamp: message.timestamp,
        profilePicture: message.profilePicture,
        isCurrentUser: message.senderId?.toString() === currentUserId,
      });
    });
  }

  offReceiveMessage(): void {
    this.connection?.off('ReceiveMessage');
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      try {
        await this.connection.stop();
        this.connection = null;
        this.currentCommunityId = null;
        this.onUsersInChannelChangedCallback = null;
        console.log('SignalR connection stopped');
      } catch (error) {
        console.error('Error stopping SignalR connection:', error);
      }
    }
  }

  getConnectionState(): string {
    return this.connection?.state || 'Disconnected';
  }

  isConnected(): boolean {
    return this.connection?.state === 'Connected';
  }
}

export const chatHubService = new ChatHubService();