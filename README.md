# succus - decentralized chat package.
succus is a tool allowing you to easily create **your own decentralized chat** for the ETH ecosystem and integrate it into your web app.

## Documentation
### `connectWallet()`
This function allows you to easily connect to the user's wallet and generate a keypair to encrypt the messages. It returns the user's address, a reference to the wallet, and a reference to the provider.
```js
const {address, wallet, provider, gunKeypair} = connectWallet();

console.log(address);
```

### `sendMessage()`