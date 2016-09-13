backbone-model-redux
===============

Extension of [backbone-redux](https://github.com/redbooth/backbone-redux)

[![npm](https://img.shields.io/npm/v/backbone-redux.svg?style=flat-square)](https://www.npmjs.com/package/backbone-redux)
[![npm](https://img.shields.io/npm/dm/backbone-redux.svg?style=flat-square)](https://www.npmjs.com/package/backbone-redux)
[![Travis](https://img.shields.io/travis/redbooth/backbone-redux.svg?style=flat-square)](https://travis-ci.org/redbooth/backbone-redux)

```
npm install backbone-redux --save
```

Backbone-redux: Creates reducers and listeners for your backbone collections and fires action
creators on every collection change.

Extension:  Creates reducers and listeners for your backbone models and fires action creators on every change event.

### How to use?
#### Auto way


```javascript

import Backbone from 'backbone';
import { createStore, compose } from 'redux';
import { devTools } from 'redux-devtools';
import { syncModels } from 'backbone-redux';

//  Create your redux-store, include all middlewares you want.
const finalCreateStore = compose(devTools())(createStore);
const store = finalCreateStore(() => {}); // Store with an empty object as a reducer

const modelA = new Backbone.Model({ name: 'modelA' });
const modelB = new Backbone.Model({ name: 'modelB' });

// Now just call auto-syncer from backbone-model-redux
syncModels({ modelA, modelB }, store);
```

What will happen?

* `syncModels` will create a reducer under the hood especially for your
  collection.
* `action creator` will be constructed with 1 possible action: `change`.
* Special `ear` object will be set up to listen to all change events and
  trigger right actions depending on the event type.
* Reducer will be registered in the store under `modelA` and `modelB` key.
* All previous reducers in your store will be replaced.

You are done. Now any change to `modelA` and `modelB` will be reflected in the
redux store.

Resulting tree will look like this:

```javascript
{
  modelA: {
    name: 'modelA'
  }
  }{
  modelB: {
    name: 'modelB'
  }
}
```