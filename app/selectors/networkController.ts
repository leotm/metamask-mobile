import { createSelector } from 'reselect';
import { EngineState } from './types';

const selectBackgroundState = (state: EngineState) =>
  state?.engine?.backgroundState;

const selectNetworkControllerState = createSelector(
  selectBackgroundState,
  (backgroundState) => backgroundState?.NetworkController,
);

const selectProviderConfig = createSelector(
  selectNetworkControllerState,
  (networkControllerState) => networkControllerState?.provider,
);

export const selectTicker = createSelector(
  selectProviderConfig,
  (providerConfig) => providerConfig?.ticker,
);

export const selectChainId = createSelector(
  selectProviderConfig,
  (providerConfig) => providerConfig?.chainId,
);
export const selectProviderType = createSelector(
  selectProviderConfig,
  (providerConfig) => providerConfig?.type,
);
export const selectNickname = createSelector(
  selectProviderConfig,
  (providerConfig) => providerConfig?.nickname,
);
export const selectNetwork = createSelector(
  selectNetworkControllerState,
  (networkControllerState) => networkControllerState?.network,
);
