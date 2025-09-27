export type TeamColor = 'red' | 'blue' | 'green' | 'yellow';

export interface Player {
  id: number;
  name: string;
  isRedTeam: boolean; // Keep for backwards compatibility
  team?: TeamColor; // New field for multi-team support
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

export interface GameOverModalProps {
  visible: boolean;
  winningTeam: TeamColor | null;
  teamScores: Record<TeamColor, number>;
  activeTeams: TeamColor[];
  onReturn: () => void;
} 