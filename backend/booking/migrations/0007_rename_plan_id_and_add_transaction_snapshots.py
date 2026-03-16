from datetime import timedelta

from django.db import migrations, models


def populate_transaction_snapshots(apps, schema_editor):
    Transaction = apps.get_model('booking', 'Transaction')

    for transaction in Transaction.objects.select_related('plan').all():
        plan = transaction.plan
        if not plan:
            continue

        updated_fields = []

        if not transaction.plan_number_snapshot:
            transaction.plan_number_snapshot = plan.plan_number
            updated_fields.append('plan_number_snapshot')
        if not transaction.plan_name_snapshot:
            transaction.plan_name_snapshot = plan.name
            updated_fields.append('plan_name_snapshot')
        if transaction.price_snapshot is None:
            if transaction.payment_method == 'credit_card':
                transaction.price_snapshot = plan.base_fee_card
            elif transaction.payment_method == 'bank_transfer':
                transaction.price_snapshot = plan.base_fee_bank
            else:
                transaction.price_snapshot = plan.base_fee_bank or plan.base_fee_card
            updated_fields.append('price_snapshot')
        if transaction.lesson_amount is None:
            transaction.lesson_amount = plan.lessons
            updated_fields.append('lesson_amount')
        if transaction.conversation_class_amount is None:
            transaction.conversation_class_amount = plan.conversation_classes
            updated_fields.append('conversation_class_amount')
        if not transaction.ten_talk_snapshot:
            transaction.ten_talk_snapshot = plan.ten_talk
            updated_fields.append('ten_talk_snapshot')
        if not transaction.correction_frequency_snapshot:
            transaction.correction_frequency_snapshot = plan.correction_frequency
            updated_fields.append('correction_frequency_snapshot')
        if transaction.max_weeks_snapshot is None:
            transaction.max_weeks_snapshot = plan.base_max_weeks
            updated_fields.append('max_weeks_snapshot')
        if transaction.period_start_date and not transaction.period_end_date and transaction.max_weeks_snapshot:
            transaction.period_end_date = transaction.period_start_date + timedelta(days=transaction.max_weeks_snapshot * 7)
            updated_fields.append('period_end_date')

        if updated_fields:
            transaction.save(update_fields=updated_fields)


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0006_rename_user_lessonstatus_student_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='plan',
            old_name='plan_id',
            new_name='plan_number',
        ),
        migrations.AddField(
            model_name='transaction',
            name='conversation_class_amount',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='transaction',
            name='correction_frequency_snapshot',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name='transaction',
            name='max_weeks_snapshot',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='transaction',
            name='plan_name_snapshot',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='transaction',
            name='plan_number_snapshot',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AddField(
            model_name='transaction',
            name='price_snapshot',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='transaction',
            name='ten_talk_snapshot',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.RunPython(populate_transaction_snapshots, noop_reverse),
    ]