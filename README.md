# Mouse Dictionary Positioner

[Mouse Dictionary](https://chrome.google.com/webstore/detail/mouse-dictionary/dnclbikcihnpjohihfcmmldgkjnebgnj) のポップアップをマウスカーソルの近くに表示する Chrome 拡張機能です。

## 概要

Mouse Dictionary はデフォルトでポップアップを画面の固定位置に表示しますが、本拡張機能を追加することで**マウスカーソルの近くに自動的に移動**するようになります。

## 使い方

1. [Mouse Dictionary](https://chrome.google.com/webstore/detail/mouse-dictionary/dnclbikcihnpjohihfcmmldgkjnebgnj) をインストールして有効にする
2. 本リポジトリをダウンロード（ZIP）または clone する
3. Chrome で `chrome://extensions/` を開く
4. 右上の「デベロッパーモード」を有効にする
5. 「パッケージ化されていない拡張機能を読み込む」からフォルダを選択する
6. ページをリロードして英語テキストにマウスオーバーする

## 動作の仕様

- 新しい単語にマウスオーバーしたとき、ポップアップがマウスの近くに移動する
- 同じ単語の上にいる間はポップアップ位置は固定される
- 画面端では自動的に位置を調整してはみ出しを防ぐ
- Mouse Dictionary の辞書・活用変化対応などの機能はそのまま利用できる

## 前提条件

本拡張機能は **Mouse Dictionary**（別途インストールが必要）と組み合わせて使います。

## ライセンス

MIT

## v1.0.1

- ページを開いて30秒以上経ってから Mouse Dictionary を起動しても位置調整が働くよう修正
- Mouse Dictionary を終了・再起動した際もポップアップを再検出
- 更新後は Chrome の拡張機能画面で本拡張機能を再読み込みし、利用中のページもリロードしてください
