# mofron-comp-dialog
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

dialog component for mofron


# Install
```
npm install mofron mofron-comp-dialog
```

# Sample
```html
<Dialog color='#f0e6fa' title="dialog">
    <button>OK</button>
</Dialog>
```
# Parameter

|Simple<br>Param | Parameter Name | Type | Description |
|:--------------:|:---------------|:-----|:------------|
| ◯  | title | mixed | string: title text |
| | | | mofron-comp-text: title text component |
| | button | mixed | string: button text |
| | | | mofron-comp-button: dialog button component |
| | buttonEvent | function | button event |
| | | mixed | event parameter |
| | closeButton | component | dialog close component |
| | frame | mofron-comp-frame | dialog frame component |
| | mainColor | mixed | string: color name, #hex |
| | | | array: [red, green, blue, (alpha)] |
| | | option | style option |
| | accentColor | mixed | string: color name, #hex |
| | | | array: [red, green, blue, (alpha)] |
| | | option | style option |

