import click
from pm.core.paths import get_root_path
from pm.services import user_deps

VERSION = '0.1.0'


@click.group()
def cli() -> None: pass


@cli.command()
def foo() -> None:
    """Recalculate the package index based on the store's contents"""
    print(user_deps.get_user_deps())



@cli.command()
def version() -> None:
    """Displays pm's version"""
    print(VERSION)


cli()
