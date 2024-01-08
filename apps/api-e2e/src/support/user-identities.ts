export interface TestUser {
  username: string
  password: string
  solana: {
    publicKey: string
    secret: number[]
  }
}

export const alice: TestUser = {
  username: 'alice',
  password: 'password',
  solana: {
    publicKey: 'ALiC98dw6j47Skrxje3zBN4jTA11w67JRjQRBeZH3BRG',
    // prettier-ignore
    secret: [255,215,204,225,169,184,158,202,63,124,6,32,255,73,197,125,12,70,179,193,91,206,85,228,147,220,204,93,65,189,3,106,138,197,203,50,45,58,90,237,111,155,255,101,3,133,100,108,254,35,33,104,61,195,80,87,59,0,12,214,219,248,248,119],
  },
}

export const bob: TestUser = {
  username: 'bob',
  password: 'password',
  solana: {
    publicKey: 'BoBigKFEgt5izFVmpZAqnHDjNXNMYFbYrbiXy4EkfJDE',
    // prettier-ignore
    secret: [128,142,119,244,20,49,23,145,238,13,193,26,71,165,89,226,25,171,202,165,144,39,90,17,83,77,7,164,224,94,142,15,160,105,180,189,217,106,163,191,141,114,251,233,166,37,119,227,38,189,239,9,91,210,59,165,175,167,158,98,105,74,149,169],
  },
}
