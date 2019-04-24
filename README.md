# reqs
Shell command to check your project's requirements and status

## Examples

Sample configuration, save it as `reqs.toml` in your project folder
```
[files]
readable = ["wp-config.php"]
writeable = ["wp-content/cache"]

[commands.grep]
command = "grep 'test' *"
outputs = "test"
```
Run `reqs` in the same folder, and it should output something like this:

```
- Path wp-config.php is not readable
- Path wp-content/cache is not writeable
+ Command "grep 'test' *" outputs "test"
```