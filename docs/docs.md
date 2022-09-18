## Functions

<dl>
<dt><a href="#connectWallet">connectWallet()</a> ⇒ <code>Promise.&lt;WalletInfo&gt;</code></dt>
<dd><p>This function is used by succus to connect to the user wallet.</p>
</dd>
<dt><a href="#HashNamespace">HashNamespace(string)</a> ⇒ <code>string</code></dt>
<dd><p>Hash a string in base64.</p>
</dd>
<dt><a href="#sendmessage">sendmessage(payload, to, gunKeypair)</a> ⇒ <code>Promise.&lt;SendMessageConfirmationReturn&gt;</code></dt>
<dd><p>This function is used to send a message to someone or a group of persons.</p>
</dd>
<dt><a href="#receiveMessage">receiveMessage(from)</a> ⇒ <code>Promise.&lt;Array.&lt;Message&gt;&gt;</code></dt>
<dd><p>This function retrieves the message for a certain conversation.</p>
</dd>
<dt><a href="#receiveMessageConstant">receiveMessageConstant(from, callback)</a> ⇒ <code>Promise.&lt;Array.&lt;Message&gt;&gt;</code></dt>
<dd><p>This function retrieves the message (constant stream!!) for a certain conversation.</p>
</dd>
</dl>

<a name="connectWallet"></a>

## connectWallet() ⇒ <code>Promise.&lt;WalletInfo&gt;</code>
This function is used by succus to connect to the user wallet.

**Kind**: global function  
**Returns**: <code>Promise.&lt;WalletInfo&gt;</code> - An object which contains: the address of the account, the reference to the wallet and the reference to the provider.  
**Example**  
```js
const {address, wallet, provider, gunKeypair} = connectWallet();
console.log(address) // 0x...
```
<a name="HashNamespace"></a>

## HashNamespace(string) ⇒ <code>string</code>
Hash a string in base64.

**Kind**: global function  
**Returns**: <code>string</code> - The string in base64 format  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | The string to be converted |

**Example**  
```js
console.log(HashNamespace("Hello World")) // 'SGVsbG8gV29ybGQ='
```
<a name="sendmessage"></a>

## sendmessage(payload, to, gunKeypair) ⇒ <code>Promise.&lt;SendMessageConfirmationReturn&gt;</code>
This function is used to send a message to someone or a group of persons.

**Kind**: global function  
**Returns**: <code>Promise.&lt;SendMessageConfirmationReturn&gt;</code> - If the message was sent it returns an object containing: the date when the message was sent, the encrypted message, the reference to the chat for gun.  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>string</code> | The message to send. |
| to | <code>Array.&lt;string&gt;</code> | The array containing the addresses of the persons you want to send the message to. |
| gunKeypair | <code>ISEAPair</code> | The keypair used to decrypt messages. |

**Example**  
```js
await sendmessage("Hello stranger!", [<ETH addresses here>], <KeyPairForEncryption => generate it with SEA.pair()>)
```
<a name="receiveMessage"></a>

## receiveMessage(from) ⇒ <code>Promise.&lt;Array.&lt;Message&gt;&gt;</code>
This function retrieves the message for a certain conversation.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array.&lt;Message&gt;&gt;</code> - An array containing the messsages.  

| Param | Description |
| --- | --- |
| from | Where to get the message from... |

**Example**  
```js
const messages = await receiveMessage(from:[eth Addresses], KeyPairToDecryptMSG)
console.table(messages);
```
<a name="receiveMessageConstant"></a>

## receiveMessageConstant(from, callback) ⇒ <code>Promise.&lt;Array.&lt;Message&gt;&gt;</code>
This function retrieves the message (constant stream!!) for a certain conversation.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array.&lt;Message&gt;&gt;</code> - An array containing the messsages.  

| Param | Description |
| --- | --- |
| from | Where to get the message from... |
| callback | The function allowing you to retrive the message! |

**Example**  
```js
await receiveMessageConstant([address], async (data) => {
 console.log(`${data.content} at ${data.sentAt} by ${data.name}!`)
})
```
