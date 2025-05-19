export interface Player {
  id: number;
  name: string;
  isRedTeam: boolean;
}

export interface Word {
  id: number;
  text: string;
  checked: boolean;
}

export interface GameModalProps {
  visible: boolean;
  isSuccess: boolean;
  onNext: () => void;
} 