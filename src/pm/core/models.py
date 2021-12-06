from dataclasses import dataclass


@dataclass
class Version:
    major: int
    minor: int
    patch: int


@dataclass
class VersionRange:
    start: Version
    start_inclusive: bool
    end: Version
    end_inclusive: bool


@dataclass
class Dependency:
    package: str
    version_range: VersionRange
