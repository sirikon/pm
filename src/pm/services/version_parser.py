import re

from typing import Optional
from pm.core.models import VersionRange, Version

NUMBER_RE = '([0-9]+)'
VERSION_RE = f'{NUMBER_RE}\\.{NUMBER_RE}\\.{NUMBER_RE}'


def parse_version(data: str) -> Optional[Version]:
    m = re.search(f'^{VERSION_RE}$', data)
    return Version(
        int(m.group(1)),
        int(m.group(2)),
        int(m.group(3))
    ) if m is not None else None


def parse_version_range(data: str) -> Optional[VersionRange]:
    simple_version = re.search(f'^{VERSION_RE}$', data)
    variable_patch_version = re.search(f'^~{VERSION_RE}$', data)
    variable_minor_version = re.search(f'^\\^{VERSION_RE}$', data)

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
