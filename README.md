# Easy Versioning Action

Increment major, minor, or patch version numbers in a file.

## Inputs

### `input`

**Required** The current version number.

### `increment`

Major, minor, or patch. Default `"patch"`

### `value`

The value to increment. Default `1``

## Example usage

```yaml
uses: Langsdorf/easy-versioning@v1.0.0
id: versioning
with:
  input: '1.0.0'
```