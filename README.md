
# MMM-ModulesGroupsRotation

MMM-ModulesGroupsRotation is a MagicMirror² module that groups modules and toggles their visibility over time. I needed something similar to MMM-pages but I encountered few bugs and decided to create simple version for what I need,

## Table of Contents
- [Installation](#installation)
- [Using the Module](#using-the-module)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Developer](#developer)
- [License](#license)

## Installation

To install the module, use the following commands:

```bash
cd ~/MagicMirror/modules
git clone https://github.com/YOUR_USERNAME/MMM-ModulesGroupsRotation.git
```

## Using the Module

To use this module, add it to the `modules` array in your `config/config.js` file:

```javascript
{
    module: "MMM-ModulesGroupsRotation",
    config: {
        modulesGroups: [
            ["module1", "module2"],
            ["module3", "module4"]
        ],
        rotationTime: 5000, // Rotation time in milliseconds
        animationDelay: 1000 // Animation delay in milliseconds
    }
}
```

## Configuration

The following properties can be configured:

| Option           | Description                                                                          | Default |
|------------------|--------------------------------------------------------------------------------------|---------|
| `modulesGroups`  | An array of arrays containing the names of modules to group and rotate through.      | `[]`    |
| `rotationTime`   | Time in milliseconds between module rotations.                                       | `3000`  |
| `animationDelay` | Time in milliseconds for the fade in/out animation when toggling module visibility.  | `1000`  |

Example configuration:

```javascript
{
    module: "MMM-ModulesGroupsRotation",
    config: {
        modulesGroups: [
            ["clock", "calendar"],
            ["compliments", "newsfeed"]
        ],
        rotationTime: 5000,
        animationDelay: 1000
    }
}
```

## Dependencies

This module does not have any external dependencies.

## Developer

This module was developed by Mo Ezderman.

## License

This module is licensed under the MIT License.
