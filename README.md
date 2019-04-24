# reqs
Shell command to check your project's requirements and status

## Examples

Sample configuration, save it as `reqs.toml` in your project folder
```toml
[files]
readable = ["wp-config.php"]
writeable = ["wp-content/cache"]

[commands.grep] # the command's name is not important
command = "grep 'test' *"
outputs = "test"
```
Run `reqs` in the same folder, and it should output something like this:

```diff
- Path wp-config.php is not readable
- Path wp-content/cache is not writeable
+ Command "grep 'test' *" outputs "test"
```