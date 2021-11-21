import click
from pm import paths

VERSION = '0.1.0'


@click.group()
def cli() -> None: pass


@cli.command()
def reindex() -> None:
    """Recalculate the package index based on the store's contents"""
    print(paths.get_root())


@cli.command()
def version() -> None:
    """Displays pm's version"""
    print(VERSION)


cli()
