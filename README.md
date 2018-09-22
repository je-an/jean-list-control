## Description

Provides functionality for displaying data as a list

## Support
Supports AMD eco system. If there is no loader, ListControl is registered as a browser variable.

## Code Example
- Use it as browser variable
```js
var obj = new ListControl();
```
- Use it with require.js
```js
require(["path/to/ListControl"], function(ListControl){
    // Work with ListControl
});
```

## Installation

`npm install jean-list-control --save --legacy-bundling`

## API Reference

### ListControl Constructor

**Options**
- **height**: `Number` - `optional` - height of the list in px


### ListControl.set(id, name, description) 

Set an entry to the list

**Parameters**
- **id**: `String` - id of the list entry
- **name**: `String` - name of the list entry
- **details**: `String` - detail information of the list entry

**Returns**
- `Boolean` - True, if the new list entry could be set, otherwise exception

## Tests

- Open spec/spec-runner.html in browser to see the test cases.

## License

MIT