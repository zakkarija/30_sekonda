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

export interface TurnReadyModalProps {
  visible: boolean;
  playerName: string;
  team: TeamColor;
  currentRound: number;
  totalRounds: number;
  teamScores: Record<TeamColor, number>;
  activeTeams: TeamColor[];
  isFirstTurn: boolean;
  onStart: () => void;
  /** Android back gesture while the modal is open. */
  onRequestClose?: () => void;
}

export interface GameModalProps {
  visible: boolean;
  isSuccess: boolean;
  playerName: string;
  team: TeamColor;
  guessedCount: number;
  totalWords: number;
  teamScores: Record<TeamColor, number>;
  activeTeams: TeamColor[];
  nextPlayerName: string | null;
  nextPlayerTeam: TeamColor | null;
  onNext: () => void;
  /** Android back gesture while the modal is open. */
  onRequestClose?: () => void;
}

export interface GameOverModalProps {
  visible: boolean;
  winningTeam: TeamColor | null;
  teamScores: Record<TeamColor, number>;
  activeTeams: TeamColor[];
  onReturn: () => void;
  /** Android back gesture while the modal is open. */
  onRequestClose?: () => void;
}
