from typing import Optional
from pm.core.models import VersionRange, Version
from pm.services.version_parser import parse_version, parse_version_range

def verify(data: str, expected_version: Optional[Version]) -> None:
    assert parse_version(data) == expected_version

def verifyRange(data: str, expected_version_range: Optional[VersionRange]) -> None:
    assert parse_version_range(data) == expected_version_range

def test_version_parser() -> None:
    # Malformed
    verify('.3.14.1', None)
    verify('3.', None)
    verify('...', None)
    verify('3.-14.1', None)
    verify('3.3.14.1', None)
    verify('^3.14.1$', None)

    verify('3.14.1', Version(3, 14, 1))
    verify('0.0.0', Version(0, 0, 0))

def test_version_range_parser() -> None:
    # Malformed
    verifyRange('.3.14.1', None)
    verifyRange('3.', None)
    verifyRange('...', None)
    verifyRange('3.-14.1', None)
    verifyRange('3.3.14.1', None)
    verifyRange('^3.14.1$', None)

    verifyRange('3.14.1', VersionRange(Version(3, 14, 1), True, Version(3, 14, 1), True))
    verifyRange('3.15.20', VersionRange(Version(3, 15, 20), True, Version(3, 15, 20), True))

    verifyRange('~3.14.1', VersionRange(Version(3, 14, 1), True, Version(3, 15, 0), False))
    verifyRange('~3.0.0', VersionRange(Version(3, 0, 0), True, Version(3, 1, 0), False))

    verifyRange('^3.14.1', VersionRange(Version(3, 14, 1), True, Version(4, 0, 0), False))
    verifyRange('^0.0.0', VersionRange(Version(0, 0, 0), True, Version(1, 0, 0), False))
