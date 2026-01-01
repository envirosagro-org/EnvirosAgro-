
import { View, User } from '../types';

export interface AppState {
  currentView: View;
  user: User | null;
  isIntegrated: boolean;
  partnerName?: string;
}

export const initialState: AppState = {
  currentView: View.HOME,
  user: null, // Replace with actual user data logic
  isIntegrated: false, // Replace with actual integration logic
  partnerName: undefined,
};

export type Action = 
  | { type: 'SET_VIEW'; payload: View }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_INTEGRATION_STATUS'; payload: { isIntegrated: boolean; partnerName?: string } };

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_INTEGRATION_STATUS':
      return { ...state, isIntegrated: action.payload.isIntegrated, partnerName: action.payload.partnerName };
    default:
      return state;
  }
};
