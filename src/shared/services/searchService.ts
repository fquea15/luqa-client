import { SearchType } from '@/shared/hooks/useSearch';

// Tipos definidos dentro del mismo archivo
type CommunityResult = {
  id: number;
  name: string;
  members: number;
  isActive: boolean;
  type: 'comunidad';
};

type MemberResult = {
  id: number;
  name: string;
  avatar: string;
  isOnline: boolean;
  role: string;
  type: 'miembro';
};

type MessageResult = {
  id: number;
  text: string;
  sender: string;
  time: string;
  type: 'mensaje';
};

interface SearchResults {
  comunidades: CommunityResult[];
  miembros: MemberResult[];
  mensajes: MessageResult[];
}

// Mock data con tipado
const mockCommunities: CommunityResult[] = [
  { id: 1, name: 'Grupo de inversiones', members: 250, isActive: true, type: 'comunidad' },
  { id: 2, name: 'Grupo de inversionistas', members: 180, isActive: true, type: 'comunidad' }
];

const mockMembers: MemberResult[] = [
  { id: 1, name: 'María Becerra', avatar: 'MB', isOnline: true, role: 'Admin', type: 'miembro' },
  { id: 2, name: 'Carlos López', avatar: 'CL', isOnline: false, role: 'Miembro', type: 'miembro' },
  { id: 3, name: 'Juan Álvarez', avatar: 'JA', isOnline: true, role: 'Admin', type: 'miembro' },
  { id: 4, name: 'Luis Vega', avatar: 'LV', isOnline: false, role: 'Miembro', type: 'miembro' }
];

const mockMessages: MessageResult[] = [
  { id: 1, text: 'Hoy hay que ver que inversiones...', sender: 'María Becerra', time: '10:30', type: 'mensaje' },
  { id: 2, text: 'Hola equipo, ¿cómo va la inversión?', sender: 'Carlos López', time: '09:45', type: 'mensaje' },
  { id: 3, text: 'Nuevas inversiones disponibles', sender: 'Juan Álvarez', time: '08:15', type: 'mensaje' }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const searchService = {
  search: async (query: string, type: SearchType, filters: any): Promise<SearchResults> => {
    await delay(300);

    const lowerQuery = query.toLowerCase();

    const filterCommunities = () =>
      mockCommunities.filter(item =>
        item.name.toLowerCase().includes(lowerQuery)
      );

    const filterMembers = () =>
      mockMembers.filter(item =>
        item.name.toLowerCase().includes(lowerQuery)
      );

    const filterMessages = () =>
      mockMessages.filter(item =>
        item.text.toLowerCase().includes(lowerQuery) ||
        item.sender.toLowerCase().includes(lowerQuery)
      );

    switch (type) {
      case 'comunidades':
        return { comunidades: filterCommunities(), miembros: [], mensajes: [] };
      case 'miembros':
        return { comunidades: [], miembros: filterMembers(), mensajes: [] };
      case 'mensajes':
        return { comunidades: [], miembros: [], mensajes: filterMessages() };
      case 'todos':
      default:
        return {
          comunidades: filterCommunities(),
          miembros: filterMembers(),
          mensajes: filterMessages()
        };
    }
  }
};
