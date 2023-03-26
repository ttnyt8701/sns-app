## sns-app

### 概要
このプロジェクトはMERNスタックで作成したSNSアプリです。

### 背景
このアプリは、フルスタック開発を学習するために作成しました。テーマは「習慣化」に特化したSNSです。  
スキルアップや自己研鑽のために学習やトレーニングを行う人は多くいます。そのためには継続的な取り組みが大切です。 
しかしながら、多くの人が習慣化に苦戦しています。私もその一人で、習慣化に失敗して挫折した経験があります。
試行錯誤の中で、友達と朝活をすることで継続し習慣化することに成功した経験を活かして同じように悩んでいる人の助けになるアプリを作りたいと思いました。  
このアプリでは、同じ志を持った人が集まるコミュニティを作ることで、習慣化に取り組む人々を支援します。
現在の進捗はシンプルなSNS機能を再現しました。今後の開発では、自身で試行錯誤した習慣化やモチベーションアップのアイディアをアプリに落とし込むことが目標です。

### 実装済みの機能
-  認証
新規登録/ログイン/ログアウト/バリデーションチェック  
- 投稿  
投稿/画像投稿
- 編集  
投稿編集、画像編集、編集済みマーク
- 削除  
削除
- フォロー  
フォロー、アンフォロー、フォロー・フォロワーリスト
- いいね  
いいね、いいね解除、いいね一覧
- コメント  
コメント投稿、コメント編集

### 追加したい機能
- 検索  
投稿検索/ユーザー検索

- オンラインユーザー表示
- ハッシュ化による認証のセキュリティ強化
- OAuth
- 朝活支援機能

- 「宣言効果」を利用した機能。
宣言効果とは

気軽に宣言できる仕組み

- 「社交的存在効果」を利用した機能。
社会的存在効果とは～。

主な機能としては
WebRTC,OpenCVを活用してプライバシーを守ったビデオ配信機能。


- 「報酬効果」
- 「罰効果」



## 技術

- OS: Ubuntu
- Frontend: React
- Backend: Node.js
- Framework: Express
- Database: Mongodb
- Webserver: Nginx

Node.jsでRESTful APIを作成し、ReactでSPAで表示できます。 
開発効率・学習コストを考慮して全てJavascriptで記述できる技術にしました。  
非同期処理で実行されます。

### 使用ライブラリ
- material UI  
- Bootstrap

### 追加したい技術
- WebRTC  
- OpenCV.js
- Recoil
- Next.js
- TypeScript
- Nest.Js

## 実行

<URL>にアクセスして使用してください。


### ローカル環境にインストール

#### 必要なもの

- git
- docker
- docker-compose

#### 手順

1. 任意のディレクトリを作成し移動

2. `git clone <リモートリポジトリのURL>`を実行。以下のような構造になることを確認する。
```
sns-app/
├── backend/
│   ├── Dockerfile
│   └── app.js
├── frontend/
│   ├── Dockerfile
│   └── src/
├── nginx/
│   ├── Dockerfile
│   └── nginx.conf
└── docker-compose.yml
```
3. docoker-compose.ymlが存在するディレクトリで`docker-compose up -d`を実行。  

4. `docker image ls`、 `docker container ls`を実行。イメージが作成されコンテナが起動していることを確認。

3. <http://localhost:80>からアプリにアクセスできる。

## ファイルの説明　コンポーネント・API

## ライセンス
