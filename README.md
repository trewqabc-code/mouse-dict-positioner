# Mouse Dictionary Positioner

[Mouse Dictionary](https://chromewebstore.google.com/detail/mouse-dictionary/dnclbikcihnpjohihfcmmldgkjnebgnj) のポップアップをマウスカーソルの近くに表示する Chrome 拡張機能です。

> **利用には、別途公開されている「Mouse Dictionary」本体のインストールが必須です。**
> Positioner は表示位置を調整する補助拡張です。Mouse Dictionary 本体と辞書データは本リポジトリに含まれません。

## 概要

Mouse Dictionary はデフォルトでポップアップを画面の固定位置に表示しますが、本拡張機能を追加することで**マウスカーソルの近くに自動的に移動**するようになります。

## 利用環境・前提条件

| 項目 | 必要な環境・準備 |
| --- | --- |
| ブラウザ | Manifest V3 の拡張機能を利用できるデスクトップ版 Google Chrome |
| 必須の拡張機能 | **[Mouse Dictionary（Chrome ウェブストア）](https://chromewebstore.google.com/detail/mouse-dictionary/dnclbikcihnpjohihfcmmldgkjnebgnj)** を、Positioner と同じ Chrome プロファイルにインストールし、有効にする |
| 辞書の初期設定 | Mouse Dictionary 本体の設定画面で初期辞書データの作成を完了し、本体単独で単語の検索結果が表示される状態にする |
| Positioner の導入 | このリポジトリのファイルを保存し、Chrome の「デベロッパー モード」でパッケージ化されていない拡張機能として読み込む |
| 利用するページ | 対象サイトで両方の拡張機能を利用できること。導入・更新後は対象ページをリロードし、Mouse Dictionary 本体を起動する |

Mouse Dictionary には標準の英和辞書が用意されており、**Positioner の利用に追加辞書の購入は必須ではありません**。英辞郎などの追加辞書を使う場合は、Mouse Dictionary 本体で別途読み込みを行ってください。

- Mouse Dictionary の公式プロジェクト：[wtetsu/mouse-dictionary](https://github.com/wtetsu/mouse-dictionary)
- 本体の導入・初期辞書の設定：[公式 Getting started](https://github.com/wtetsu/mouse-dictionary/wiki/Getting-started)
- 追加辞書の設定：[公式の辞書データ案内](https://github.com/wtetsu/mouse-dictionary/wiki/Download-dictionary-data)

### 動作確認済みの組み合わせ

- macOS 上の Google Chrome
- Mouse Dictionary **1.7.3**
- Mouse Dictionary Positioner **1.0.1**

上記の組み合わせで通常の Web ページ上の位置調整を確認しています。他の OS・ブラウザ・Mouse Dictionary のバージョンや、PDF・iframe 内での位置調整は未検証です。本体のポップアップ構造に依存するため、Mouse Dictionary の更新によって互換性が変わる場合があります。

## 使い方

1. [Mouse Dictionary 本体](https://chromewebstore.google.com/detail/mouse-dictionary/dnclbikcihnpjohihfcmmldgkjnebgnj) をインストールして有効にする
2. 本体アイコンを右クリックして「オプション」を開き、初期辞書データを作成する（[公式手順](https://github.com/wtetsu/mouse-dictionary/wiki/Getting-started)）
3. 本リポジトリを ZIP でダウンロードして展開するか、clone する
4. Chrome で `chrome://extensions/` を開き、右上の「デベロッパー モード」を有効にする
5. 「パッケージ化されていない拡張機能を読み込む」から、`manifest.json` が入っているフォルダを選択する
6. 利用する Web ページをリロードする
7. そのページで **Mouse Dictionary 本体のアイコン**をクリックして辞書を起動し、英語テキストにマウスを合わせると、Positioner がポップアップの位置を調整する

## 動作の仕様

- 新しい単語にマウスオーバーしたとき、ポップアップがマウスの近くに移動する
- 同じ単語の上にいる間はポップアップ位置は固定される
- 画面端では自動的に位置を調整してはみ出しを防ぐ
- Mouse Dictionary の辞書・活用変化対応などの機能はそのまま利用できる

## ライセンス

MIT

## v1.0.1

- ページを開いて30秒以上経ってから Mouse Dictionary を起動しても位置調整が働くよう修正
- Mouse Dictionary を終了・再起動した際もポップアップを再検出
- 更新後は Chrome の拡張機能画面で本拡張機能を再読み込みし、利用中のページもリロードしてください
