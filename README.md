## sns-app

### 概要
このプロジェクトはMERNスタック※で作成したSNSアプリです。

※MongoDB,Express,React,Node.jsを用いたWeb開発スタック

### 背景
このアプリは、フルスタック開発を学習するために作成しました。テーマは「習慣化」に特化したSNSです。  
スキルアップや自己研鑽のために学習やトレーニングを行う人は多くいます。そのためには継続的な取り組みが大切です。 
しかしながら、多くの人が習慣化に苦戦しています。私もその一人で、習慣化に失敗して挫折した経験があります。
試行錯誤の中で、友達と朝活をすることで継続し習慣化することに成功した経験を活かして同じように悩んでいる人の助けになるアプリを作りたいと思いました。  
このアプリでは、同じ志を持った人が集まるコミュニティを作ることで、習慣化に取り組む人々を支援します。
現在の進捗はシンプルなSNS機能を再現しました。今後の開発では、自身で試行錯誤した習慣化やモチベーションアップのアイディアをアプリに落とし込むことが目標です。

## デモ
開発中

## 使用技術

- フロントエンド: React
- バックエンド: Node.js
- フレームワーク: Express
- データベース: Mongodb
- Webサーバー: Nginx
- サーバー: KAGOYA VPS
- コンテナ: docker
- バージョン管理: git
- CI/CD: GithubActions(予定)
- OS: Ubuntu


開発効率・学習コスト、またパフォーマンスを考慮してJavascript、非同期処理で記述できる技術にしました。  

### ライブラリ
- Redux
- material UI  
- Bootstrap
- timeago.js

### 追加したい技術
- WebRTC  
- OpenCV.js
- Recoil
- Next.js
- TypeScript
- Nest.Js

## 機能一覧

### 実装済み
-  認証  
ログイン/ログアウト/バリデーションチェック  
- ユーザー  
新規登録/フォロー・アンフォロー/フォロー・フォロワー表示/プロフィール機能（カバー画像・プロフィール画像・自己紹介文・出身地）/プロフィール編集/
- 投稿  
投稿/画像投稿/投稿日時/投稿編集/画像編集/投稿削除/編集済みマーク/コメント投稿/コメント編集/いいね・いいね解除/いいね一覧
- 検索  
全ユーザー表示/全投稿表示


### 実装予定
- 投稿  
いいねしたユーザー表示
- 検索  
投稿検索/ユーザー検索/オンラインユーザー表示
- 認証  
ハッシュ化による認証のセキュリティ強化/OAuth
- 朝活支援機能  
グループ（４人部屋）を作れるようにする。そこで朝活や習慣化を行う。  
同じ志を持った人が集まる環境を作る。
- 「宣言効果（Declarative effect）」を利用した機能  
（大人数の前で宣言することで、実現しなくてはいけない状況にする）  
気軽に目標を宣言できるような工夫を取り入れる。その宣言が大人数の目に入るようにする。
- 「社会的促進（Social Facilitation）」を利用した機能  
（家よりカフェなど人の目があったほうがモチベーションが高まる）  
WebRTC,OpenCVを活用してプライバシーを守ったビデオ配信機能。（チャットや音声はなし。）
- 「強化の原理（Principle of Reinforcement）」を利用した機能  
目標が達成された場合、報酬を。されなかった場合、罰を。

- その他、モチベーション・生産性に関する機能  
睡眠に関する機能（スマートウォッチと連携）、体重に関する機能（データ収集できる体重計と連携）、筋トレ、食事、ミニマリスト

## コンポーネント・APIの説明
開発中

## 実行手順

URL（開発中）にアクセスして使用してください。

### ローカル環境で実行

#### 必要なもの

- git
- docker
- docker-compose

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
3. docoker-compose.ymlが存在するディレクトリで`docker-compose up -d`を実行。  

4. `docker image ls`、 `docker container ls`を実行。イメージが作成されコンテナが起動していることを確認。

3. <http://localhost:80>からアプリにアクセスできる。

## ライセンス
開発中
