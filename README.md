# ymltotest

Convert yml to `describe()` and `it.todo()` / `it.skip()` test skeletons.

## Instructions

1. Select yml, 
2. Open command palette (ctrl/cmd + shift + P) 
3. Type in `YML to test: Selection to Test skeleton` and hit enter

## Demo
![demo](images/demo.gif?raw=true)
 

## Extension Settings

```js
// Default settings
{
    "ymltotest.testType": "jest" // Available: ["jest", "mocha"]`
    "ymltotest.autoReference": true 
}
```

### `ymltotest.testType`: 
- Available Test Type Frameworks are `["jest", "mocha"]`
- For `jest`, statement will be `it.todo('test description')` 
- For `mocha`, statement will be `it.skip('test description')` 

### `ymltotest.autoReference`:  
- Enable Automatic referencing and force the use of string. 
- If enabled, for a pattern `Given a FooBar`, it will converted to `describe(FooBar.name, ()=> { ... })`;
- If disabled, it will keep the string as it is `describe('Given a FooBar', ()=> { ... })`;