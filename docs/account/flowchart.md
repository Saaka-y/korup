# アカウントページフロー（Mermaid）

```mermaid
flowchart TD
    A[JWTトークン取得] --> B[fetchUserInfoでユーザー情報取得]
    B --> C[アカウント情報表示]
    B -->|失敗| D[ログインページへリダイレクト]
```
