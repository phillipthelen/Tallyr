# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('value', models.FloatField(default=1.0)),
                ('name', models.CharField(max_length=100)),
            ],
            options={
                'verbose_name': 'Item',
                'verbose_name_plural': 'Items',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='tally',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('created_on', models.DateTimeField(auto_created=True)),
                ('paid_on', models.DateTimeField()),
                ('item', models.ForeignKey(to='tally_sheet.Item', related_name='tallies')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='tallies')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
