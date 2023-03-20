import { generateMnemonic, validateMnemonic, createHDWallet, Wallet } from '../';

test('should generate a new mnemonic', () => {
  expect(typeof generateMnemonic()).toBe('string');
});

test('should validate a mnemonic', () => {
  expect(validateMnemonic('candy maple cake sugar pudding cream honey rich smooth crumble sweet treat')).toBe(true);
});

test('should return false if mnemonic is invalid', () => {
  expect(validateMnemonic('invalid mnemonic')).toBe(false);
});

test('should return a HD wallet', async () => {
  expect(await createHDWallet()).toMatchObject<Wallet>({
    mnemonic: expect.any(String),
    ethereum: expect.any(Object),
    solana: expect.any(Object),
    tezos: expect.any(Object),
  });
});

test('should return a HD wallet with a specific index', async () => {
  expect(await createHDWallet(1)).toMatchObject<Wallet>({
    mnemonic: expect.any(String),
    ethereum: expect.any(Object),
    solana: expect.any(Object),
    tezos: expect.any(Object),
  });
});

test('should return a HD wallet with a specific mnemonic', async () => {
  expect(await createHDWallet(0, 'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat')).toMatchObject<Wallet>({
    mnemonic: expect.any(String),
    ethereum: expect.any(Object),
    solana: expect.any(Object),
    tezos: expect.any(Object),
  });
});

test('should return a HD wallet with a specific mnemonic and password', async () => {
  expect(await createHDWallet(0, 'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat', 'password')).toMatchObject<Wallet>({
    mnemonic: expect.any(String),
    ethereum: expect.any(Object),
    solana: expect.any(Object),
    tezos: expect.any(Object),
  });
});

test('should throw an error if mnemonic is invalid', async () => {
  await expect(createHDWallet(0, 'invalid mnemonic')).rejects.toThrow("Invalid mnemonic! Please check your mnemonic. Don't pass any mnemonic to generate a new one.");
});
