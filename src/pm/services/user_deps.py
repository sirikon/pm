from typing import List
from os import listdir, path
import json

from pm.core.models import Dependency
from pm.core.paths import get_user_deps_path


def get_user_deps() -> List[Dependency]:
    result: List[Dependency] = []

    for file in _get_user_deps_files():
        with open(file, 'r') as f:
            data = json.loads(f.read())
            if 'dependencies' not in data:
                continue
            deps = data['dependencies']
            for package, version_range in deps.items():
                result.append(Dependency(package, version_range))

    return result


def _get_user_deps_files() -> List[str]:
    base = get_user_deps_path()
    return [path.join(base, f) for f in listdir(base) if path.isfile(path.join(base, f))]
