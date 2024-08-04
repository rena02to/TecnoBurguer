# Generated by Django 5.0.6 on 2024-08-04 15:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tecnoburguer', '0013_coupon_usercoupon'),
    ]

    operations = [
        migrations.CreateModel(
            name='Assessments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stars', models.IntegerField(choices=[(1, '1'), (2, '2'), (3, '3'), (3, '4'), (3, '5')])),
                ('text', models.CharField(max_length=255)),
                ('store', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='assessments', to='tecnoburguer.store')),
            ],
        ),
    ]
