# Extension to provide apikey authentication for vulcainjs

### Install package with

```js
npm install vulcain-ext-apikeyauthentication --save
```

And import it in your index.js vulcain project file.

```js
import { StsAuthentication } from 'vulcain-ext-apikeyauthentication';
```

### Declare environment variables

You must declare a vulcain service providing apikey

```js
apiKeyServiceName="http://...:8080"
apiKeyServiceVersion="1.0"
```
