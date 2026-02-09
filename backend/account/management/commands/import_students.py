import csv
from django.core.management.base import BaseCommand
from account.models import Student
from booking.models import Plan

class Command(BaseCommand):
    help = 'students.csv から Student モデルへ一括インポート'

    def handle(self, *args, **options):
        path = 'csv/students.csv'
        with open(path, encoding='utf-8') as f:
            reader = csv.DictReader(f) # CSVファイルのヘッダーをキーとした辞書リーダー
            for row in reader:
                # プランIDからPlanを取得
                plan = None
                plan_id = row.get('プラン名')
                if plan_id:
                    plan = Plan.objects.filter(plan_id=plan_id).first()
                
                student_id = row.get('生徒ID')
                if not student_id:
                    continue
                    
                Student.objects.update_or_create(
                    student_id=student_id,
                    defaults={
                        'name': row.get('生徒名') or '',
                        'status': row.get('ステータス') or '',
                        'email': row.get('メール') or '',
                        'plan': plan,
                        'base_fee': row.get('基本料金') or None,
                        'special_fee': row.get('特別料金') or None,
                        'final_fee': row.get('最終料金') or None,
                        'payment_method': row.get('支払い方法\n（振込/クレカ）') or '',
                        'level': row.get('レベル') or '',
                        'occupation': row.get('職業') or '',
                        'lesson_goal': row.get('レッスン題材（目標）') or '',
                        'hobbies': row.get('趣味・興味') or '',
                        'referral': row.get('経緯') or '',
                        'notes': row.get('備考') or '',
                    }
                )
        self.stdout.write(self.style.SUCCESS('students.csvのインポートが完了しました'))
