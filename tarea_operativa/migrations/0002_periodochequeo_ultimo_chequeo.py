# Generated by Django 2.0.2 on 2018-02-20 13:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tarea_operativa', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='periodochequeo',
            name='ultimo_chequeo',
            field=models.DateField(null=True),
        ),
    ]