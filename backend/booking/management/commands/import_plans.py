import csv
from django.core.management.base import BaseCommand
from booking.models import Plan


class Command(BaseCommand):
    help = 'Import plans from CSV file'

    def handle(self, *args, **options):
        csv_file_path = 'csv/plan_fee.csv'
        
        with open(csv_file_path, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            
            for row in reader:
                plan_id = row['プランID']
                
                # 空行をスキップ
                if not plan_id or not plan_id.strip():
                    continue
                
                # Planを作成または更新
                plan, created = Plan.objects.update_or_create(
                    plan_id=plan_id,
                    defaults={
                        'name': row['プラン名（変更可）'],
                        'base_fee_bank': int(row['ベース料金_振込（税込）']) if row['ベース料金_振込（税込）'] else None,
                        'base_max_weeks': int(row['ベース最大期間_週']) if row['ベース最大期間_週'] else None,
                        'lessons': int(row['Saakaレッスン数']) if row['Saakaレッスン数'] else None,
                        'conversation_classes': int(row['Conversation Class数']) if row['Conversation Class数'] else None,
                        'ten_talk': row['Ten Talk'],
                        'correction_frequency': row['添削頻度'],
                        'base_fee_card': int(row['クレカ料金（税込・自動）']) if row['クレカ料金（税込・自動）'] else None,
                        'fee_3m_bank': int(row['3ヶ月_振込（税込・自動）']) if row['3ヶ月_振込（税込・自動）'] and row['3ヶ月_振込（税込・自動）'] != '-' else None,
                        'fee_3m_card': int(row['3ヶ月_クレカ（税込・自動）']) if row['3ヶ月_クレカ（税込・自動）'] and row['3ヶ月_クレカ（税込・自動）'] != '-' else None,
                        'fee_6m_bank': int(row['6ヶ月_振込（税込・自動）']) if row['6ヶ月_振込（税込・自動）'] and row['6ヶ月_振込（税込・自動）'] != '-' else None,
                        'fee_6m_card': int(row['6ヶ月_クレカ（税込・自動）']) if row['6ヶ月_クレカ（税込・自動）'] and row['6ヶ月_クレカ（税込・自動）'] != '-' else None,
                    }
                )
                
                if created:
                    self.stdout.write(self.style.SUCCESS(f'プランを作成しました: {plan_id} - {plan.name}'))
                else:
                    self.stdout.write(self.style.SUCCESS(f'プランを更新しました: {plan_id} - {plan.name}'))
        
        self.stdout.write(self.style.SUCCESS('プランのインポートが完了しました'))
