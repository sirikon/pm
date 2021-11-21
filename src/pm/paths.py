from os import getenv, path


def get_root() -> str:
    return getenv('PM_ROOT', path.join(path.expanduser('~'), '.pm'))
