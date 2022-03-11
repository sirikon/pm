# `pm`
**P**ackage **M**anager

## Discovery and cleanup

We'll traverse all subdirectories, starting in the current one, looking for
`pm.deps.json` files.

Every found file will be verified for syntax correctness and added to the deps
file pool.

After that, every existing file in the deps file pool will be checked to see if
it still exists, removing any non-existing files from the pool.

## Glosary

- **package**: A combination of name, version number and an optional variant
(assumed `default` if none specified).
  - **name**: Only lowercase, numbers and hyphens allowed as characters package names.
  - **version number**: Always 4 alphanumeric numbers separated by dots.
  - **variant**: Fallbacks to `default`, same character limitations as of package names.
- **explicit packages**: Every explicitly defined package in any of the files
from deps file pool.
- **implicit packages**: Packages that need to be installed but are not defined
explicitly. For example: dependencies for other explicit packages.
- **desired packages**: A combination of all the explicit and implicit packages.
- **installed packages**: All packages installed on the system.
- **undesired packages**: Any installed package that is not on the desired packages list.
