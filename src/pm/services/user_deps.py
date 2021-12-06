from typing import List
from os import listdir, path
import json

from pm.core.models import Dependency, VersionRange
from pm.core.paths import get_user_deps_path
from pm.services.version_parser import parse_version_range


def get_user_deps() -> List[Dependency]:
    result: List[Dependency] = []

    for file in _get_user_deps_files():
        with open(file, 'r') as f:
            data = json.loads(f.read())
            if 'dependencies' in data:
                deps = data['dependencies']
                for package, version_range_raw in deps.items():
                    version_range = parse_version_range(version_range_raw)
                    if version_range is None:
                        print(f"Invalid version range: {version_range_raw}")
                        continue
                    result.append(Dependency(package, version_range))

    return result


def _get_user_deps_files() -> List[str]:
    base = get_user_deps_path()
    return [path.join(base, f) for f in listdir(base) if path.isfile(path.join(base, f))]
