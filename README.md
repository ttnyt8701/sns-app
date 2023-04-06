## sns-app

### 概要
このプロジェクトはMERNスタック※で作成したSNSアプリです。

※MongoDB,Express,React,Node.jsを用いたWeb開発スタック

### 背景
このアプリは、フルスタック開発を学習するために作成しました。テーマは「習慣化」に特化したSNSです。(予定)  

スキルアップや自己研鑽のために学習やトレーニングを行う人は多くいます。そのためには継続的な取り組みが大切です。しかしながら、多くの人が習慣化に苦戦しています。私もその一人で、習慣化に失敗して挫折してきました。  

今まで習慣化やモチベーションアップにまつわる理論を試行錯誤してきましたが、一人で取り組むことには限界を感じました。そこで友人と”朝活”を試みたところ、簡単に継続し習慣化することに成功しました。人を巻き込んで仕組化することでこんなにも簡単に習慣化・継続できることを思い知らされました。  

この経験を活かして同じように一人で頑張っている人の助けになるアプリを作りたいと思いました。このアプリでは、同じ志を持った人が集まるコミュニティを作り、習慣化にまつわる機能を実装することで自己研鑽に励む人々を支援します。  


現在の進捗はシンプルなSNS機能を再現しました。今後の開発では、自身で試行錯誤した習慣化やモチベーションアップのアイディアをアプリに落とし込むことが目標です。

## デモ
準備中

## 使用技術

- フロントエンド: React
- バックエンド: Node.js
- フレームワーク: Express
- データベース: MongoDB
- セッション管理: Redis(予定)
- Webサーバー: Nginx
- コンテナ: Docker/Docker-compose
- バージョン管理: Git/GitHub
- CI/CD: Github Actions(予定)
- サーバー: KAGOYA VPS
- OS: Ubuntu 22.04


開発効率・学習コスト、またパフォーマンスを考慮してJavascript、非同期処理で記述できる技術にしました。  

### ライブラリ
- Redux
- material UI  
- Bootstrap
- timeago.js
- multer
- mongoose
- dotenv
- nodemon
- helmet
- OpenCV.js (予定)

### WebAPI
- WebRTC (予定)


## 機能一覧

### 実装済み
-  認証  
ログイン/ログアウト/バリデーションチェック/
- ユーザー  
新規登録/フォロー・アンフォロー/フォロー・フォロワー表示/プロフィール機能（カバー画像・プロフィール画像・自己紹介文・出身地）/プロフィール編集/
- 投稿  
投稿/画像投稿/投稿日時/投稿編集/画像編集/投稿削除/編集済みマーク/コメント投稿/コメント編集/いいね・いいね解除/いいね一覧
- 表示  
投稿表示/フォローユーザーの投稿表示/いいね一覧/新着全ユーザー表示/新着全投稿表示


### 実装予定
- 全般  
ドメイン名取得/SSL取得/レスポンシブ対応化/セッションをRedisに
- 投稿  
いいねしたユーザー表示
- 検索  
投稿検索/ユーザー検索→膨大なデータから全検索しなければならない→redisにインデックスを渡して高速化？
- オンラインユーザー表示
- 認証  
ハッシュ化によるパスワードのセキュリティ強化/OAuthによるソーシャルログイン
- 習慣化支援機能  
グループ（４人部屋）を作れるようにする。そこで朝活や習慣化を行う。  
同じ志を持った人が集まる環境を作る。
- 「宣言効果（Declarative effect）」を利用した機能  
（大人数の前で宣言することで、実現しなくてはいけない状況にする）  
気軽に目標を宣言できるような工夫を取り入れる。その宣言が大人数の目に入るようにする。
- 「社会的促進（Social Facilitation）」を利用した機能  
（家よりカフェなど人の目があったほうがモチベーションが高まる）  
WebRTC,OpenCVを活用してプライバシーを守った気軽に行えるビデオ配信機能。（チャットや音声はなし。）
- 「強化の原理（Principle of Reinforcement）」を利用した機能  
目標が達成された場合、報酬を。されなかった場合、罰を。

- その他、モチベーション・生産性に関する機能  
googleFitAPIと連携して睡眠、運動、体重からモチベーション状態を公開できるように。

- 学習時間を手軽に計測できて、公開できるように。

## コンポーネント・APIの説明
準備中

## 実行手順

<http://133.18.226.124/>にアクセスしてください。

### ローカル環境で実行

#### 必要なもの

- git
- docker
- docker-compose
- mongoDBアカウント

#### 手順

1. 任意のディレクトリを作成し移動

2. `git clone https://github.com/ttnyt8701/sns-app.git`を実行。以下のような構造になることを確認する。
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
3.  sns-app/backend/.envを作成し、`MONGOURL = <your mongoDB application code>`を書き込む。

4. sns-app/frontend/.envを`http://localhost:8000/images/`に変更する。

5. docoker-compose.ymlが存在するディレクトリで`docker-compose up -d`を実行。  

6. `docker image ls`、 `docker container ls`を実行。イメージが作成されコンテナが起動していることを確認。

7. <http://localhost:80>からアプリにアクセス。

## ライセンス  
準備中
