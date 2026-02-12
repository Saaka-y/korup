import csv
from django.core.management.base import BaseCommand
from account.models import Student, User
from booking.models import Plan


class Command(BaseCommand):
    help = 'students.csv から Student モデルへ一括インポート'

    def handle(self, *args, **options):
        path = 'csv/students.csv'
        with open(path, encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                # プランIDからPlanを取得
                plan = None
                plan_id = row.get('プラン名')
                if plan_id:
                    plan = Plan.objects.filter(plan_id=plan_id).first()
                
                student_id = row.get('生徒ID')
                if not student_id:
                    continue
                
                # 名前とメールを取得
                name = row.get('生徒名') or ''
                email = row.get('メール') or ''
                
                # ユニークなusernameを生成（student_idベース）
                username = f"student_{student_id}"
                
                # Userを作成または取得
                user, created = User.objects.get_or_create(
                    username=username,
                    defaults={
                        'email': email,
                        'first_name': name,  # 日本語名はfirst_nameに格納
                        'role': 'student',
                    }
                )
                
                # 既存ユーザーの場合、情報を更新
                if not created:
                    user.email = email
                    user.first_name = name
                    user.save()
                
                # Studentを作成または更新
                Student.objects.update_or_create(
                    student_id=student_id,
                    defaults={
                        'user': user,
                        'status': row.get('ステータス') or '',
                        'plan': plan,
                        'base_fee': int(row.get('基本料金')) if row.get('基本料金') else None,
                        'special_fee': int(row.get('特別料金')) if row.get('特別料金') else None,
                        'final_fee': int(row.get('最終料金')) if row.get('最終料金') else None,
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
