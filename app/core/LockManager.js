import { AppState } from 'react-native';
import SecureKeychain from './SecureKeychain';
import BackgroundTimer from 'react-native-background-timer';
import Engine from '../core/Engine';
import Logger from '../util/Logger';

export default class LockManager {
  constructor(navigation, lockTime) {
    console.log('vault/ LockManager new LockManager', lockTime);
    this.navigation = navigation;
    this.lockTime = lockTime;
    this.appState = 'active';
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  updateLockTime(lockTime) {
    this.lockTime = lockTime;
  }

  handleAppStateChange = async (nextAppState) => {
    console.log(
      'vault/ LockManager handleAppStateChange called with nextAppState: ',
      nextAppState,
      ' and this.lockTime: ',
      this.lockTime,
    );
    // Don't auto-lock
    if (this.lockTime === -1) {
      return;
    }

    if (nextAppState !== 'active') {
      // Auto-lock immediately
      if (this.lockTime === 0) {
        this.lockApp();
      } else {
        // Autolock after some time
        this.lockTimer = BackgroundTimer.setTimeout(() => {
          if (this.lockTimer) {
            this.lockApp();
          }
        }, this.lockTime);
      }
    } else if (this.appState !== 'active' && nextAppState === 'active') {
      // Prevent locking since it didnt reach the time threshold
      if (this.lockTimer) {
        BackgroundTimer.clearTimeout(this.lockTimer);
        this.lockTimer = null;
      }
    }

    this.appState = nextAppState;
  };

  setLockedError = (error) => {
    Logger.log('Failed to lock KeyringController', error);
  };

  gotoLockScreen = () => {
    console.log('vault/ LockManager gotoLockScreen');
    this.navigation?.navigate('LockScreen', { backgroundMode: true });
  };

  lockApp = async () => {
    if (!SecureKeychain.getInstance().isAuthenticating) {
      const { KeyringController } = Engine.context;
      try {
        console.log(
          'vault/ LockManager lockApp calling KeyringController.setLocked();',
        );
        await KeyringController.setLocked();
        this.gotoLockScreen();
      } catch (e) {
        this.setLockedError(e);
      }
    } else if (this.lockTimer) {
      BackgroundTimer.clearTimeout(this.lockTimer);
      this.lockTimer = null;
    }
  };

  stopListening() {
    console.log('vault/ LockManager stopListening');
    AppState.removeEventListener('change', this.handleAppStateChange);
  }
}
