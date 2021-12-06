from dataclasses import dataclass

@dataclass
class Dependency:
    package: str
    version_range: str

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
