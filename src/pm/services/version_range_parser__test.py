from typing import Optional
from pm.core.models import VersionRange, Version
from pm.services.version_range_parser import parse_version_range

def verify(data: str, expected_version_range: Optional[VersionRange]) -> None:
    assert parse_version_range(data) == expected_version_range

def test() -> None:
    # Malformed
    verify('.3.14.1', None)
    verify('3.', None)
    verify('...', None)
    verify('3.-14.1', None)

    verify('3.14.1', VersionRange(Version(3, 14, 1), True, Version(3, 14, 1), True))
    verify('3.15.20', VersionRange(Version(3, 15, 20), True, Version(3, 15, 20), True))

    verify('~3.14.1', VersionRange(Version(3, 14, 1), True, Version(3, 15, 0), False))

    verify('^3.14.1', VersionRange(Version(3, 14, 1), True, Version(4, 0, 0), False))
