# Generated by Django 5.0.6 on 2024-08-16 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tecnoburguer', '0025_alter_food_image_alter_food_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='store',
            name='name',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]