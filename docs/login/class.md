# ログイン関連クラス図（Mermaid）

```mermaid
classDiagram
    class loginFormComponent {
        +email: string
        +password: string
        +onSubmit()
    }
    class loginUser {
        +loginUser(email, password)
    }
    class tokenObtainPairView {
        +post(request)
        +認証処理
        +JWT発行
    }
    class userModel {
        +username: string
        +password: string
        +認証情報
    }
    loginFormComponent --> loginUser
    loginUser --> tokenObtainPairView
    tokenObtainPairView --> userModel
    %% loginFormComponent: React関数コンポーネント
    %% loginUser: API管理用関数
    %% tokenObtainPairView: Django REST SimpleJWT
    %% userModel: Django認証ユーザーモデル
```
