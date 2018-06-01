# module-analyzr
*module-analyzr* is a simple CLI and toolbox to analyze the usage of a package.

input:

```js
import defaultExport from "test-module";
import * as name from "test-module";
import { export as alias } from "test-module";

import { export1, export2 } from "test-module";
import { export1 } from "test-module";
```

output:
```js
{
  importedModules: [
    { moduleName: 'export', usageAmount: 1 },
    { moduleName: 'export1', usageAmount: 2 },
    { moduleName: 'export2', usageAmount: 1 }
  ],
  importedDefault: 1,
  importedWithNameSpace: 1
}
```

# install

```
npm install -g module-analyzr
```

# CLI
After intalling, you can use `module-analyzr` command in any directory in your system:

```
module-analyzr <pkg> <path> [options]

`path` can accept glob pattern, file path, directory path

# example
module-analyzr react src/**/*.js

# output
{ importedModules:
   [ { moduleName: 'Component', usageAmount: 10 },
     { moduleName: 'Node', usageAmount: 2 },
     { moduleName: 'Fragment', usageAmount: 1 } ],
  importedDefault: 20,
  importedWithNameSpace: 23 }
```

# API

```js
const analyzr = require('module-analyzr')
const usageInfo = analyzr('react', 'src/**/*.js')
```

# output JSON
| Parameter | Description |
| -------------- | --------------- |
| importModules | Array of `{moduleName: <string>, usageAmount: <number>}` which shows usage count of named export. |
| importedDefault    | Number of usage count of default exports |
| importedWithNameSpace | Number of usage count of named export, but all of exports with `*` (eg. `import * as Module from 'module'`).  |

# Motivation
`module-analyzr` is simple tool to analyze usage of a module in a file or directory(likely project). It is helpful for module's maintainer to grasp how their module used in projects. Also, it is helpful for application engineer when upgrade the module or remove the module.
In my case, as a creator of UI Library, it was nervous to add a breaking change. That is why I created `module-analyzr`.

# License
MIT