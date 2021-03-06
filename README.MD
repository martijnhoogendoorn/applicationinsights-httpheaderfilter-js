# Application Insights HTTP Header Filtering Extension

## Getting Started
Add The filter to your app.
> *Note:* **Typings are included with this package**, so you do **not** need to install a separate typings package.

```console
npm i --save applicationinsights-httpheaderfilter-js
```

## Basic usage

This Application Insights extension allows for filtering HTTP headers flowing into telemetry. Setup is easy:

```js
import {HttpHeaderFilterPlugin} from 'applicationinsights-httpheaderfilter-js';
```

or using require:

```js
const httpheaderFilter = require('applicationinsights-httpheaderfilter-js');
```

then:

```js
const filteringPlugin = new httpheaderFilter.HttpHeaderFilterPlugin();
const appInsights = new ApplicationInsights({ config: {
    /* ... */
    extensions = [filteringPlugin];
    extensionConfig = {
        [filteringPlugin.identifier]: {
            filteredHeaders: {
            Authorization: [ /^(.*?) .*$/gi, '$1 **TOKEN REMOVED**' ],
            'Content-Type': [ 'something replacing content-type' ],
            'Request-Id': null,
            }
        }
    }
 });

appInsights.loadAppInsights();
/* ... */
```

## Configuration options
The plugin scans the HTTP headers send to the telemetry server. It scans the headers using case-insensitive matching.

It can do three things:

1. Replace the value of the matching regular expression with another regular expression.

   ```js
   Authorization: [ /^(.*?) .*$/gi, '$1 **TOKEN REMOVED**' ]
   ```
    This expression matches anything for the Authorization header and captures what is in front of the first space character (typically, the type of authorization, i.e. Bearer, Basic, see [explanation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization))

    Notice the two elements in the array for the Authorization property. The first is used as the match and capture for the original value, the second is the replacement value.

2. Replace the value of the matching regular expression with a hardcoded value.

   ```js
   'Content-Type': [ 'application/json' ]
   ```

   This way, the HTTP header [Content-Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) is replaced, just as an example.
3. Remove the value.

   ```js
   'Request-Id': null
   ```

   The HTTP header will be removed by the filter, and won't show in Application Insights telemetry.