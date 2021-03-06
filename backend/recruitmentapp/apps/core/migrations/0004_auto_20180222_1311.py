# Generated by Django 2.0.1 on 2018-02-22 13:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_auto_20180220_1614'),
    ]

    operations = [
        migrations.CreateModel(
            name='CompetenceTranslation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('name', models.CharField(max_length=80)),
            ],
            options={
                'verbose_name': 'competence Translation',
                'db_table': 'core_competence_translation',
                'db_tablespace': '',
                'managed': True,
                'default_permissions': (),
            },
        ),
        migrations.RemoveField(
            model_name='competence',
            name='name',
        ),
        migrations.AddField(
            model_name='competencetranslation',
            name='master',
            field=models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='core.Competence'),
        ),
        migrations.AlterUniqueTogether(
            name='competencetranslation',
            unique_together={('language_code', 'master')},
        ),
    ]
