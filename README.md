# mofron-comp-dialog
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

dialog component for mofron

modal dialog, but hide when clicking outside the dialog


# Install
```
npm install mofron mofron-comp-dialog
```

# Sample
```html
<setting>
    <tag load="mofron-comp-dialog">Dialog</tag>
</setting>

<script run=after>
dlg.visible(true);
</script>

<script run=init>
let btn_evt = (b1,b2,b3) => {
    console.log(b1.text().text());
    dlg.visible(false);
}
</script>

<Dialog name=dlg size=(3rem,3rem) button-event=@btn_evt>
    <title>"Dialog"</title>
    <button>OK</button>
    <button>Cancel</button>
</Dialog>
```

# Parameter

| Short<br>Form | Parameter Name | Type | Description |
|:-------------:|:---------------|:-----|:------------|
| ◯  | title | mixed | string: title text |
| | | | mofron-comp-text: title text component |
| | button | mixed | string: button text |
| | | | mofron-comp-button: dialog button component |
| | buttonEvent | function | button event |
| | | mixed | event parameter |
| | closeComp | component | dialog close component |
| | frame | mofron-comp-frame | dialog frame component |
| | mainColor | mixed | string: color name, #hex |
| | | | array: [red, green, blue, (alpha)] |
| | | option | style option |
| | accentColor | mixed | string: color name, #hex |
| | | | array: [red, green, blue, (alpha)] |
| | | option | style option |
| | height | string (size) | dialog height |
| | | | undefined: call as getter |
| | width | string (size) | dialog width |
| | | | undefined: call as getter |

