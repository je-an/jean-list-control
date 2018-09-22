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

### ListControl.commit() 

Appends the until now added rows to DOM

**Returns**
- `Boolean` - True if the currently added rows are appended to DOM


### ListControl.add(id, name, details) 

Adds an entry to the list

**Parameters**
- **id**: `String` - id of the list entry
- **name**: `String` - name of the list entry
- **details**: `String` - detail information of the list entry

**Returns**
- `Boolean` - True, if the new list entry could be set, otherwise exception


### ListControl.update(id, name, details) 

Adds an entry to the list

**Parameters**
- **id**: `String` - id of the list entry
- **name**: `String` - name of the list entry
- **details**: `String` - detail information of the list entry

**Returns**
- `Boolean` - True, if the new list entry could be set, otherwise exception


### ListControl.get() 

Not implemented yet


### ListControl.remove(id) 

Removes an entry from the list

**Parameters**
- **id**: `String` - id of the list entry to be removed

**Returns**
- `Boolean` - True, if the list entry could be removed, false otherwise

### ListControl.clear() 

Removes all entries from the list

**Returns**
- `Boolean` - True, if all list entries could be removed, false otherwise

### ListControl.lock() 

Locks the control for input

**Returns**
- `Boolean` - True if control is locked

### ListControl.unlock() 

Unlocks the control for input

**Returns**
- `Boolean` - True if control is unlocked

## Tests

- Open spec/spec-runner.html in browser to see the test cases.
- Open example/index.html in browser to see the playground.

## License

MIT