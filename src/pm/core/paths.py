from os import getenv, path


def get_root_path() -> str:
    return getenv('PM_ROOT', path.join(path.expanduser('~'), '.pm'))


def get_user_deps_path() -> str:
    return path.join(get_root_path(), 'user-deps')
