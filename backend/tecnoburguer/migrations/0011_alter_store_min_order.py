# Generated by Django 5.0.6 on 2024-08-04 05:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tecnoburguer', '0010_store_delivery_free_km_alter_user_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='store',
            name='min_order',
            field=models.IntegerField(),
        ),
    ]