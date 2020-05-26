# Ionic No Keyboard

Ionic Angular library used to hide the native keyboard on a given input when the input is focused. 

# Usage:

`my-app.module.ts`:

```
@NgModule({
  ...
  imports: [NoKeyboardModule],
  ...
})
export class MyModule { }
```

`my-component.component.html`:

```
<input no-keyboard type="text" />
```

This input, when focused, will display no native keyboard.
