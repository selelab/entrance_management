import os


class DevelopmentConfig:

    SQLALCHEMY_DATABASE_URI = 'postgresql://{user}:{password}@{host}:{port}/{database}'.format(**{
        'user': os.getenv("POSGRE_USER", 'admin'),
        'password': os.getenv("POSGRE_PASSWORD", 'admin'),
        'host': os.getenv("POSGRE_HOST", 'mypg'),
        'port': os.getenv("POSGRE_PORT", "5432"),
        'database': os.getenv("POSGRE_DATABASE", 'member_db')
    })
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False


Config = DevelopmentConfig
