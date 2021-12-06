import re

from typing import Optional
from pm.core.models import VersionRange, Version


def parse_version_range(data: str) -> Optional[VersionRange]:
    simple_version = re.search(
        '^([0-9]+)\\.([0-9]+)\\.([0-9]+)$', data)
    variable_patch_version = re.search(
        '^~([0-9]+)\\.([0-9]+)\\.([0-9]+)$', data)
    variable_minor_version = re.search(
        '^\\^([0-9]+)\\.([0-9]+)\\.([0-9]+)$', data)

    if simple_version is not None:
        version = Version(
            int(simple_version.group(1)),
            int(simple_version.group(2)),
            int(simple_version.group(3)))
        return VersionRange(version, True, version, True)

    if variable_patch_version is not None:
        start_version = Version(
            int(variable_patch_version.group(1)),
            int(variable_patch_version.group(2)),
            int(variable_patch_version.group(3)))
        end_version = Version(
            int(variable_patch_version.group(1)),
            int(variable_patch_version.group(2)) + 1,
            0)
        return VersionRange(start_version, True, end_version, False)
    
    if variable_minor_version is not None:
        start_version = Version(
            int(variable_minor_version.group(1)),
            int(variable_minor_version.group(2)),
            int(variable_minor_version.group(3)))
        end_version = Version(
            int(variable_minor_version.group(1)) + 1,
            0,
            0)
        return VersionRange(start_version, True, end_version, False)

    return None
