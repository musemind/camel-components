# camel-components
Standalone React Components

Simple [React](https://facebook.github.io/react/) components without additional dependencies.

### Example page
[https://musemind.github.io/camel-components/](https://musemind.github.io/camel-components/)

### Repository
[https://github.com/musemind/camel-components/](https://github.com/musemind/camel-components/)
Contributions are very welcome!

### Use it:

* Install npm package

```
npm install camel-components --save
```

### Changelog:

#### 0.1.0
Breaking Change:

Simplification: If you want to update an existing element, use `styleUpdate` as an object, not a boolean. Don't use `styleUpdate` and `style` in one element object.

New:
```
scenes={[
  {name: 'scene name', frames: 10, elements: {
    bar: {styleUpdate: {left: '30px'}}
  }}
}]
```

Deprecated:
```
scenes={[
  {name: 'scene name', frames: 10, elements: {
    bar: {styleUpdate: true, style: {left: '30px'}}
  }}
}]
```

