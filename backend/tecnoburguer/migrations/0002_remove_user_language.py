# Generated by Django 5.1.1 on 2024-09-28 20:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tecnoburguer', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='language',
        ),
    ]
