import click

VERSION = '0.1.0'


@click.group()
def cli() -> None: pass


@cli.command()
def reindex() -> None:
    """Recalculate the package index based on the store's contents"""
    print("reindexin'")


@cli.command()
def version() -> None:
    """Displays pm's version"""
    print(VERSION)


cli()
