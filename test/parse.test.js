const analyzer = require('../index.js')
const path = require('path')

describe('module-analyzr', () => {
  it('should parse any import statement correctly', () => {
    const fixture = path.join(__dirname, './fixtures/require-statement.js')

    expect(analyzer('test-module', fixture)).toEqual({
      importedModules: [
        { moduleName: 'export', usageAmount: 1 },
        { moduleName: 'export1', usageAmount: 1 },
        { moduleName: 'export2', usageAmount: 1 },
        { moduleName: 'export3', usageAmount: 1 }
      ],
      importedDefault: 1,
      importedWithNameSpace: 1
    })
  })

  it('should parse all files under the passed directory', () => {
    const fixture = path.join(__dirname, './fixtures/tree-project')

    expect(analyzer('test-module', fixture)).toEqual({
      importedModules: [
        { moduleName: 'export1', usageAmount: 2 },
        { moduleName: 'export2', usageAmount: 2 }
      ],
      importedDefault: 1,
      importedWithNameSpace: 0
    })
  })

  it('should parse all files according to glob pattern', () => {
    const fixture = path.join(__dirname, './fixtures/**/*.js')

    expect(analyzer('test-module', fixture)).toEqual({
      importedModules: [
        { moduleName: 'export', usageAmount: 1 },
        { moduleName: 'export1', usageAmount: 3 },
        { moduleName: 'export2', usageAmount: 3 },
        { moduleName: 'export3', usageAmount: 1 }
      ],
      importedDefault: 2,
      importedWithNameSpace: 1
    })
  })

  it('should parse typescript files', () => {
    const fixture = path.join(__dirname, './fixtures/ts-project')

    expect(analyzer('test-module', fixture, {typescript: true})).toEqual({
      importedModules: [
        { moduleName: 'export', usageAmount: 1 },
        { moduleName: 'export1', usageAmount: 1 },
        { moduleName: 'export2', usageAmount: 1 },
        { moduleName: 'export3', usageAmount: 1 }
      ],
      importedDefault: 1,
      importedWithNameSpace: 1
    })
  })
})
