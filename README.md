## MMM-AboardISS

Currently a work in progress! Feel free to contribute

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

Checks the current status of people on board the ISS (International Space Station), and returns their amount of time in space.


## Using the module

To install this module, navigate into `~/MagicMirror/modules` and type the following commands:
```
git clone https://github.com/NolanKingdon/MMM-AboardISS
cd MMM-AboardISS
npm install

```

To use this module, add the following configuration block to the modules array in the `config/config.js` file:

```js
var config = {
    modules: [
        {
			module: "MMM-AboardISS",
			position: "top_center",
			config: {
				// Soon!
			}
		},
    ]
}
```