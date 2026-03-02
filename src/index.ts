// src/index.ts
export {
  WORDLIST,
  WORDLIST_SIZE,
  getWord,
  indexOf,
} from './wordlist.js'

export {
  getCounter,
  counterToBytes,
  DEFAULT_ROTATION_INTERVAL,
} from './counter.js'

export {
  deriveVerificationWord,
  deriveVerificationPhrase,
  deriveDuressWord,
  deriveDuressPhrase,
} from './derive.js'

export {
  verifyWord,
  type VerifyResult,
  type VerifyStatus,
} from './verify.js'

export {
  createGroup,
  getCurrentWord,
  getCurrentDuressWord,
  advanceCounter,
  reseed,
  addMember,
  removeMember,
  type GroupConfig,
  type GroupState,
} from './group.js'
