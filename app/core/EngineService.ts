import UntypedEngine from './Engine';
import AppConstants from './AppConstants';
import { getVaultFromBackup } from '../core/backupVault';
import { store as importedStore } from '../store';

const UPDATE_BG_STATE_KEY = 'UPDATE_BG_STATE';
const INIT_BG_STATE_KEY = 'INIT_BG_STATE';

interface InitializeEngineResult {
  success: boolean;
  error?: string;
}

const VAULT_CREATION_ERROR = 'Error creating the vault';
const NO_VAULT_IN_BACKUP_ERROR = 'No vault in backup';

class EngineService {
  private engineInitialized = false;

  /**
   * Initializer for the EngineService
   *
   * @param store - Redux store
   */

  initalizeEngine = (store: any) => {
    const reduxState = store.getState?.();
    const state = reduxState?.engine?.backgroundState || {};
    const Engine = UntypedEngine as any;

    Engine.init(state);
    this.updateControllers(store, Engine);
  };

  private updateControllers = (store: any, engine: any) => {
    console.log('vault/', 'updateControllers started');
    const controllers = [
      { name: 'AccountTrackerController' },
      { name: 'AddressBookController' },
      { name: 'AssetsContractController' },
      { name: 'NftController' },
      { name: 'TokensController' },
      { name: 'TokenDetectionController' },
      { name: 'NftDetectionController' },
      { name: 'KeyringController' },
      { name: 'AccountTrackerController' },
      { name: 'NetworkController' },
      { name: 'PhishingController' },
      { name: 'PreferencesController' },
      { name: 'TokenBalancesController' },
      { name: 'TokenRatesController' },
      { name: 'TransactionController' },
      { name: 'TypedMessageManager' },
      { name: 'SwapsController' },
      {
        name: 'TokenListController',
        key: `${engine.context.TokenListController.name}:stateChange`,
      },
      {
        name: 'CurrencyRateController',
        key: `${engine.context.CurrencyRateController.name}:stateChange`,
      },
      {
        name: 'GasFeeController',
        key: `${engine.context.GasFeeController.name}:stateChange`,
      },
      {
        name: 'ApprovalController',
        key: `${engine.context.ApprovalController.name}:stateChange`,
      },
      {
        name: 'PermissionController',
        key: `${Engine.context.PermissionController.name}:stateChange`,
      },
    ];

    engine?.datamodel?.subscribe?.(() => {
      if (!this.engineInitialized) {
        store.dispatch({ type: INIT_BG_STATE_KEY });
        this.engineInitialized = true;
      }
    });

    controllers.forEach((controller) => {
      const { name, key = undefined } = controller;
      const update_bg_state_cb = () =>
        store.dispatch({ type: UPDATE_BG_STATE_KEY, key: name });
      if (name !== 'NetworkController')
        !key
          ? engine.context[name].subscribe(update_bg_state_cb)
          : engine.controllerMessenger.subscribe(key, update_bg_state_cb);
      else
        engine.controllerMessenger.subscribe(
          AppConstants.NETWORK_STATE_CHANGE_EVENT,
          update_bg_state_cb,
        );
    });
    console.log('vault/', 'updateControllers ended');
  };

  /**
   * Initialize the engine with a backup vault from the Secure KeyChain
   *
   */
  async initializeVaultFromBackup(): Promise<InitializeEngineResult> {
    const { vault } = await getVaultFromBackup();
    const reduxState = importedStore.getState?.();
    const state = reduxState?.engine?.backgroundState || {};
    const Engine = UntypedEngine as any;
    // This ensures we create an entirely new engine
    await Engine.destroyEngine();
    if (vault) {
      const instance = Engine.init(state, vault);
      if (instance) {
        this.updateControllers(importedStore, instance);
        return {
          success: true,
        };
      }
      return {
        success: false,
        error: VAULT_CREATION_ERROR,
      };
    }
    return {
      success: false,
      error: NO_VAULT_IN_BACKUP_ERROR,
    };
  }
}

/**
 * EngineService class used for initializing and subscribing to the engine controllers
 */
export default new EngineService();
