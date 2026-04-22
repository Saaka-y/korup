# ログイン関連クラス図（Mermaid）

```mermaid
classDiagram
    class LoginForm {
        +username: string
        +password: string
        +handleSubmit()
    }

    class loginUser {
        +loginUser(username, password)
    }

    class TokenObtainView {
        +post(request)
        +JWT発行
        +access_token Cookie 設定
        +refresh_token Cookie 設定
    }

    class TokenRefreshView {
        +post(request)
        +refresh_token Cookie 読取
        +access_token Cookie 再設定
    }

    class LogoutView {
        +post(request)
        +refresh token blacklist
        +Cookie 削除
    }

    class UserModel {
        +username: string
        +password: string
        +email: string
        +role: string
    }

    LoginForm --> loginUser
    loginUser --> TokenObtainView
    TokenObtainView --> UserModel
    TokenRefreshView --> UserModel
    LogoutView --> UserModel
```

ログイン時にトークン文字列をフロントで保持することはない。
バックエンドが HttpOnly Cookie に保存し、フロントはログイン状態とユーザー属性（username / role）だけを store に持つ。
student_number / tutor_number はフロントに渡さない。バックエンドは Cookie から request.user を特定し、request.user.student_profile / request.user.tutor_profile でアクセスする。
