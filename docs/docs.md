## Functions

<dl>
<dt><a href="#dbConf">dbConf(conf)</a></dt>
<dd><p>This function is used to configure gunDB as succus is built on top of it. Learn more at <a href="https://gun.eco">https://gun.eco</a> and follow @marknadal on twitter! It&#39;s a really awesome project and if you learn use it, you can easily make succus your own.</p>
</dd>
<dt><a href="#HashNamespace">HashNamespace(string)</a> ⇒ <code>string</code></dt>
<dd><p>Hash a string in base64.</p>
</dd>
<dt><a href="#connectWallet">connectWallet()</a> ⇒ <code>Promise.&lt;WalletInfo&gt;</code></dt>
<dd><p>This function is used by succus to connect to the user wallet.</p>
</dd>
</dl>

<a name="dbConf"></a>

## dbConf(conf)
This function is used to configure gunDB as succus is built on top of it. Learn more at https://gun.eco and follow @marknadal on twitter! It's a really awesome project and if you learn use it, you can easily make succus your own.

**Kind**: global function  

| Param | Description |
| --- | --- |
| conf | Change the configuration of the DB by passing an object to this function containing your config: https://gun.eco/docs/API#options |

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
