import click
import pkg_resources


@click.group()
def cli() -> None: pass


@cli.command()
def version() -> None:
    """Displays pm's version"""
    print(pkg_resources.get_distribution('pm').version)


cli()
