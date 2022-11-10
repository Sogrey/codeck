import { nanoid } from 'nanoid';
import create from 'zustand';
import { TaichuNodePortType } from './node';

export interface ConnectInfo {
  id: string;
  fromNodeId: string;
  fromNodePinName: string;
  toNodeId: string;
  toNodePinName: string;
}

type FromDirection = 'out-in' | 'in-out';

interface ConnectionState {
  connections: ConnectInfo[];
  workingConnection: {
    fromNodeId: string;
    fromNodePinName: string;
    fromNodePinType: TaichuNodePortType;
    fromDirection: FromDirection;
  } | null;
  startConnect: (
    fromNodeId: string,
    fromNodePinName: string,
    fromNodePinType: TaichuNodePortType,
    fromDirection: FromDirection
  ) => void;
  endConnect: () => void;
}

export const useConnectionStore = create<ConnectionState>((set, get) => ({
  connections: [],
  workingConnection: null,
  startConnect: (
    fromNodeId,
    fromNodePinName,
    fromNodePinType,
    fromDirection
  ) => {
    const { workingConnection, endConnect, connections } = get();
    if (!workingConnection) {
      set({
        workingConnection: {
          fromNodeId,
          fromNodePinName,
          fromNodePinType,
          fromDirection,
        },
      });
      return;
    }

    // 正在处于连接状态
    if (fromNodeId === workingConnection.fromNodeId) {
      // 连接到相同节点
      endConnect();
      return;
    }

    if (fromDirection === workingConnection.fromDirection) {
      // 相同方向
      endConnect();
      return;
    }

    if (fromNodePinType !== workingConnection.fromNodePinType) {
      // 不匹配(譬如exec和port连接)
      endConnect();
      return;
    }

    set({
      // TODO: 需要去重
      connections: [
        ...connections,
        workingConnection.fromDirection === 'out-in'
          ? {
              id: nanoid(),
              fromNodeId: workingConnection.fromNodeId,
              fromNodePinName: workingConnection.fromNodePinName,
              toNodeId: fromNodeId,
              toNodePinName: fromNodePinName,
            }
          : {
              id: nanoid(),
              fromNodeId: fromNodeId,
              fromNodePinName: fromNodePinName,
              toNodeId: workingConnection.fromNodeId,
              toNodePinName: workingConnection.fromNodePinName,
            },
      ],
    });
    endConnect();
  },
  endConnect: () => {
    set({
      workingConnection: null,
    });
  },
}));