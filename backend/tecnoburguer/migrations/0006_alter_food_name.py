# Generated by Django 5.0.6 on 2024-07-31 13:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tecnoburguer', '0005_alter_user_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='food',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
