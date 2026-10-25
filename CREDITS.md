# 素材クレジット

この文書には公開中のWeb版の出典・制作記録を含みます。`dist/test/`・`src/`・`assets/` などのパスは現行配信ソース内の記録であり、このリポジトリの旧版に全ファイルが含まれることを示しません。旧版の素材記録も保持しています。

# 素材・音源クレジット

作品全体の[制作担当とAI使用範囲](AUTHORSHIP.md)は別紙に整理しています。本作品向けの画像はオリジナルで、提供画像とOpenAI画像生成で制作した画像の記録を以下に残しています。企画者より、使用音源は利用許諾を取得済みと確認しています（2026年10月25日）。作者・出典・ライセンス・編集内容の既存記録は保持し、音源を本リポジトリ独自のライセンスで再許諾しません。

## 昼BGM

- 曲名：旅人と古代遺跡の記憶
- 制作・提供：ケミフリBGM工房
- 作者：https://www.youtube.com/@kemifree_bgm
- 元動画：https://www.youtube.com/watch?v=rVoYCM6Gw3E
- 作者の配布元：https://drive.google.com/drive/folders/1X44eeK_fK9LsraTLrOPrufm1xWu1REVH

2026年10月22日確認。作者が公開するMP3を使用しています。動画説明ではフリーBGMとしてRPG・TRPG等での利用を案内し、クレジット表記を希望しています。ゲーム内設定画面にも作者と元動画を掲載しました。
配布フォルダに独立した利用規約文書は見当たりませんでした。作者の音源に本リポジトリから再許諾するライセンスは付与しません。音源単体の再配布や公開範囲を拡大する際は作者の最新条件を再確認してください。

公開ゲームはユーザー承認によりpublicです。GitHubリポジトリはPrivateを維持する方針です。アニメキャラクター・メンバー画像・Discord本番データ・内部台帳は公開用ゲームに含めません。

## 夜の庭・焚き火画像

YAGPDB版で利用中のユーザー提供画像を再利用しています。夜景はCC544、料理はCC546およびURL台帳CC719を参照。人物・メンバーペット・本番セーブ・管理台帳そのものは含めません。表示のため縮小・WebP化しHTMLに埋め込んでいます。料理の原画を新しく生成したり別料理に差し替えたりしていません。

## 夜BGM：星空のアクアリウム（1.3.1導入済み）

- 曲名：星空のアクアリウム
- 作者：優日のすたるじっく／のすたるじっくBGM庫
- 元動画：https://youtu.be/uTzAU7xYYqg
- 公式配布：https://booth.pm/ja/items/4991673
- 確認日：2026年10月22日

公式商品説明では、動画・制作物やその他BGMが必要な場面で利用でき、作者名とURLの記載は任意とされています。著作権は作者に帰属します。自作曲とすること、曲単体を聴かせるBGM集動画への使用、YouTube Content ID登録は禁止されています。ユーザーが添付した公式配布MP3を使用し、設定画面にも作者名・元動画・公式配布を掲載しています。`night-bgm.mp3`として、音声そのものの改変なしで保存しました。長さ159.6秒、ファイルSHA256：`5f11725305e33dcc4bc16fa3b9187a0a680ffe32ee6008822aae78226ecff9a7`。ゲームBGMとして利用し、このリポジトリから再許諾するライセンスは付与しません。


## ホットドリンクのイラスト（v1.4.0）
元の闇庭ドリンク13種類に合わせ、OpenAI画像生成で制作したベースイメージです。参考は闇庭の焚き火料理イラスト。アニメキャラクター・メンバー画像・個人データを含みません。
公開画像カタログ：https://yaminiwa-campfire-food-art.cometauk8.chatgpt.site/
生成仕様：夜の庭、焚き火、木の切り株、湯気の立つ一杯、暖かな琥珀色と夜の青、緻密な絵本調。人・動物・文字・ロゴなし。ドリンクごとの名称・色・材料を個別指定し、任意のトッピングは描かない。ゲームに480px版を内蔵し、画像URLには1024px版を使用。


## ファンタジー操作盤（v1.5.0）
ユーザー承認済みのデザイン画像を参考に、OpenAI画像生成で金細工の植物模様・エメラルド・中央魔法陣を持つ透過フレームを制作。制作プロンプト：横長の下部操作盤のみを抽出し、文字・アイコン・背景を除去、深緑エナメルと繊細な金の葉飾りを保持、透過背景。イラストは操作盤の装飾として使用し、文字・操作はHTML、アイコンは彩色SVGで実装。


## 案内枠と書体（v1.6.0）
案内枠はユーザー承認の画像案を参考にOpenAI画像生成で制作。制作指示：金細工、小花、緑の葉、中央エメラルド、温かな羊皮紙。文字・ボタン・背景を除いた透過の空枠として生成し、可変の実テキストを重ねる。スマホ向けに九分割の枠として使用。
本文はKlee One（Copyright 2020 The Klee Project Authors）、見出しはKaisei Decolを元に制作。SIL Open Font License 1.1に従い、ゲーム中の文字にサブセット化し、内部ファミリー名をYaminiwa Story Text / Yaminiwa Story Headingへ変更。ライセンス全文はFONT-LICENSES.txt。元フォント：
https://github.com/google/fonts/tree/main/ofl/kleeone
https://github.com/google/fonts/tree/main/ofl/kaiseidecol
https://github.com/fontworks-fonts/Klee

## 街のお出かけBGM（Web v2.1.0）

- 曲名：Harvest（公式ループ版）
- 作者：PeriTune / むつき醒（Sei Mutsuki）
- 原曲・公式配布：https://peritune.com/blog/2015/11/25/harvest/
- 公式音源：https://peritune.com/loop/PerituneMaterial_Harvest_loop.zip
- ライセンス：Creative Commons Attribution 4.0 International（CC BY 4.0）
- ライセンス全文：https://creativecommons.org/licenses/by/4.0/
- 公式規約：https://peritune.com/about/
- 確認日：2026年10月23日

2015年公開の曲。現行規約は2026年2月以前の曲についてCC BY 4.0の継続適用を明記しています。公式ZIP中のMP3をそのまま使用し、ゲーム再生時の音量だけ調整しています。公式配布のループ版を使い、音声自体の編集は行っていません。街の背景として再生し、ゲーム内の設定にも作者・原曲・ライセンスを掲載します。
保存先：dist/test/assets/audio/harvest-loop.mp3。

## 花咲く街（Web v2.1.0）

ユーザー添付の3768.jpgを元に、組み込み画像生成ツールでスマートフォン縦画面9:16へ再構成しました。元の木組みの街並み・薬草店・パン屋・住民・ランタン・遠くの城・花・石畳と、暖かな絵本の画風を維持。上下にゲームUIを重ねられる構図、文字・UI・外枠なし。
背景：dist/test/assets/town/flower-town-mobile.png。元画像：src/town-source.jpg。

## 素材一覧の枠・ポーション瓶（Web v2.2.0）
組み込み画像生成ツールで制作。素材一覧は深緑・細い真鍮細工・四隅の植物と小花・中央エメラルド・羊皮紙の空枠。文字、操作、品物スロットは実HTMLで描画。
ポーション瓶はユーザー提供2908.jpgを画風参考に、金属格子と色ガラス・宝石の小瓶を9属性分の3x3アトラスとして新規生成。元の瓶や部屋はそのまま使用していません。全レシピごとに固有瓶を描いたわけではなく、主属性に対応する基本瓶を使い、実際の全属性は文字で表示します。
画像保存先：dist/test/assets/ui/inventory-botanical-frame.png、dist/test/assets/ui/potion-jewelled-atlas.png。

## 自室と画像ベースの操作枠（Web v2.3.0）
自室は組み込み画像生成で制作し、ユーザーの指摘に合わせ、初稿の写実的な光やぼかしを細いセピア線画・淡い水彩・紙の質感へ修正。採用済みの自室UI案を元に、空の深緑の植物装飾バーと羊皮紙の操作札を画像生成して使用しています。
背景はassets/room/bedroom-storybook.png、枠はassets/ui/forest-navigation-frame.pngとassets/ui/parchment-action-tag.png。案内/ベッドの窓は承認済みのinventory-botanical-frame.pngを再利用。本文や操作文字はHTMLで重ねています。

## 庭の薬屋と5人の常連（Web v2.4.0）
組み込み画像生成ツールで、細い線画・淡い水彩・植物と古道具のある闇庭独自の背景と人物を新規制作。既存ゲームの画像・キャラクター・画面を複製していません。背景1枚と、日傘の吸血鬼・猫と暮らす引退魔女・墓守・スライムの騎士・吟遊詩人の透過人物5枚。注文札は採用済み植物枠画像を再利用し、注文・条件はHTMLで表示。
保存先：dist/test/assets/shop/garden-apothecary.png、dist/test/assets/customers/*.png。

## ペット用品の挿絵（Web v2.5.0）
組み込み画像生成で制作した4×4透過アトラス：ササミ、サーモン、ホタテ、まぐろ、木の実とりんご、牧草、ジャーキー、小魚、りんご、ビスケット、無地のなめらかおやつ、フェルトボール、リネンねずみ、真鍮の鈴、ロープ、貝殻の水あそび。細いセピア線画と淡い水彩。画像はassets/pets/supplies-atlas.png。品名と数量はHTMLで表示。複数商品が共通の基本挿絵を使う場合があります。ちゅーるは3味でチューブの絵を共有。商標ロゴやパッケージは描いていません。

## 葉形の操作案内（Web v2.6.0）
採用済み画像案（src/approved-discovery-design.png）から、組み込み画像生成で文字のない深緑・細い金縁の葉形マーカーを新規制作。assets/ui/discovery-leaf-pin.png。数字はHTML。上の表示中バーにはforest-navigation-frame.png、下の名前一覧にはinventory-botanical-frame.pngを再利用。画像案のスクリーンショットを操作画面として貼り付けてはいません。輪郭光は道具の種類に合わせたSVGの形を既存操作点へ重ねます。

- Ver 2.6.1 garden frame: AI-generated botanical brass/emerald border based on the approved 闇庭 UI mockup; `assets/ui/garden-gold-frame.png`. Actual labels and interaction controls are HTML.

## 手で調合する道具と調合樹（Web v2.8.0）
ユーザー承認の画像案に沿ってOpenAI画像生成で制作。細い絵本の線と水彩、古い石の乳鉢/木の乳棒/薬草の粗・砕・粉の透過レイヤー、水差し/ふいご/匙の透過アトラス、作業台、独自の植物の調合樹。assets/brewing/以下の4枚。既存ゲームの画面や地図は複製していません。背景と分割画像を描画に使い、動き・実際の進行・薬名・配合・所持数はHTML/JavaScript。既存のBGMとクレジットを維持。

## 用途別15種の小瓶（Web v2.9.0）
OpenAI画像生成で、細い線画・水彩・真鍮細工・色ガラスの透過4x4アトラスを新規制作。15種類+空欄。薬ごとに瓶の輪郭・栓・印を変え、同属性の色違いだけにはしていない。順番は癒し/速さ/眠り/媚薬/毒/解毒/日除け/硬化/ぬくもり/水中呼吸/消臭/感情/夜目/幸運/涼風。保存先assets/brewing/potion-kinds.png。古い処方の瓶は旧属性アトラスのまま。朝のメモと独り言は採用済みの植物装飾枠画像を再利用、文字と開閉はHTML。

## 祖父の扉と鍵（Web v2.9.1）
OpenAI画像生成で、蔦と小花、石のアーチ、古い樫の扉、植物の真鍮錠を描いた縦長の背景と、エメラルド/葉模様の真鍮鍵の透過画像を制作。細いセピア線・淡い水彩の絵本調。assets/brewing/workshop-door.png とworkshop-key.png。鍵の移動/回転、文章、進行はHTML/JavaScript。既存ゲームの扉や人物を複製していない。

## 庭と街の手帖（Web v2.10.0）
OpenAI画像生成で制作した空の手帖背景：深緑の革装、温かな羊皮紙、細い真鍮、押し花とシダ、小さなエメラルドの留め具。文字や罫線・操作を描き込まず、ゲーム内の可変文章・条件・配達はHTMLで重ねる。保存先assets/ui/garden-chronicle.png。大釜の投入枠は既存inventory-botanical-frame.pngを再利用。


## v2.10.2 見た目の仕上げ（2026-10-23）
- 画像を先に生成し、調合用の専用銅釜を追加。`dist/test/assets/brewing/artisan-cauldron.png`。内蔵ImageGen、透過、蔦彫刻の古い銅釜＋小さな炭火、古い植物画の細線と水彩、背景/文字/道具なしというプロンプトで制作。線画アイコンと♨を実イラストに置換。乳棒/水差し/ふいご/匙の従来の操作判定やアニメーションは保持。
- 持ち物は単色カードの繰り返しをやめ、承認済み植物枠の内側で罫線の目録へ。属性・レア度・所持数・名前・選択状態・フィルタ・スクロールは保持。単列で長い名前を読めるようにし、40px以上のフィルタ操作領域を確保。
- 釜の結果は既存植物枠画像、工程の見出しと操作ボタンは既存深緑枠画像を再利用。キャンセルは控えめな下線。進捗は細い真鍮色の縁と緑へ統一。新規の大きな枠/ナビは作らない。
- `src/artisan-finish.css`に範囲限定。庭/調合室の画像サイズ、金縁、上下メニュー、料金、在庫、保存形式は変更なし。
- 生成物の絵は目視確認。ブラウザ環境の起動サービスが前回から使えず、スマホ実画面の視覚確認は未実施。自動検証を視覚確認と混同しない。


## v2.10.3 瓶を見て選ぶ接客（2026-10-23）
- 優先範囲は失敗薬の絵と接客の薬/添え物の選択。庭/調合室の寸法・上下メニュー・資産・保存・客の条件/報酬は維持。
- `assets/brewing/failed-potion.png`を内蔵ImageGenで先に制作。プロンプト：透過の丸い古い小瓶、くすんだ灰紫の薬、曲がったコルクと小さな煙、蔦の真鍮細工、植物画の細線と水彩、文字/背景/ネオンなし。完成・確認・在庫など既存のpotionArt(null)共通表示を絵へ置換。
- 接客は既存の注文固定/操作領域スクロールを維持し、ネイティブの薬選択/添え物選択を画像付きラジオ一覧へ。条件を満たす薬を先に並べ、不適合も理由つきで見せる。既存の各瓶の絵と生成済み深緑枠を再利用し、新しい巨大札/浮遊ボタンを増やさない。
- 選択だけでは在庫/コイン/報酬は変わらない。確認→渡すという既存の取引処理を使用。古い選択コールバックはstate/客/画面/取引revisionで無効化。キーボード矢印/Home/Endとaria-checkedに対応。
- チュートリアルの強調先を隠れたselectから実際の瓶ボタン/確認ボタンへ変更。内部値の互換用selectはhiddenで保持し、実操作/読み上げは新しい選択肢を使う。
- 画像選択/選び直し/矢印/無消費/受け渡し後の古い選択無効/二重報酬防止を実コールバックで自動検証。画像自体は目視確認、スマホ実画面の見た目・通しプレイは未確認。


## v2.10.4 加工品の絵と受け取り結果（2026-10-23）
- 内蔵ImageGenで実装前に透過イラスト2点を制作。`assets/brewing/dried-herbs.png`（麻ひもで結んだ乾燥薬草2束）/`herbal-powder.png`（葉の封蝋つき羊皮紙に包んだ香草の粉1包）。共通プロンプトは植物図譜の細線と淡い水彩、生成り/セージ/古真鍮、背景/文字/写真調/3Dなし。
- 乳鉢の加工成功/乾燥ハーブ受取成功のとき、既存生成済み植物枠に完成品・今回の個数・現在の在庫・用途を表示。取引revisionに結びつく一時的な結果で、再開時に再受取したように見せない。在庫は既存保存形式のまま。
- 乾燥中/受取前には完成受取の表示をしない。受取で新たな素材を消費しないこと、粉は素材1個を使うことを明記。所持分の絵は棚の在庫と接客の添え物選択でも共通使用。
- 設備の品書き/見出し/一覧にある絵文字を既存の植物線画と乳鉢イラストへ置換。客など他の未対象UIについて一括変更しない。庭画像寸法/金枠/上下メニュー/価格/報酬/セーブは変更しない。
- 自動確認に、加工成功結果・重複加工防止・乾燥中の完成品非表示・翌朝受取・受取重複防止・再表示は在庫のみを追加。画像自体は目視確認済み。スマホ実画面でのレイアウト確認は未実施。


## v2.11.0 調合の実録音（CC0 1.0）

- grind：OlyveBone — https://freesound.org/people/OlyveBone/sounds/486995/
- tap：StarTowerStudio — https://freesound.org/people/StarTowerStudio/sounds/424981/
- stir：PotatokingXII — https://freesound.org/people/PotatokingXII/sounds/352872/
- pour：TheHiraHira — https://freesound.org/people/TheHiraHira/sounds/460245/

HQ公開プレビューを短く編集・低域カット・音量調整・フェード。配布ページでCC0を確認（2026-10-24）。ライセンス：https://creativecommons.org/publicdomain/zero/1.0/


## v2.11.0 調合の操作・一画面化・初回導線（2026-10-24）
- ユーザー指摘：調合の縦スクロール、重い乳鉢、水の単線/口とのずれ、匙が液面に入らない、瓶詰めが完了できない、最初の行き先過多とひと言が畳まれていること。
- 新規レイアウトは先に画像生成。`src/approved-single-screen-crafting.png`は枠構成の参照。実画面は既存の生成済み植物枠/道具/作業台を使用。`assets/brewing/open-bottle.png`は透過の開口瓶を内蔵ImageGenで作成。文字/値/操作を画像に焼き込まない。
- 素材選択は2〜4種類ずつのページ切替へ。短い画面では1行2種類、広ければ2行4種類。調合工程はヘッダー・作業領域・進捗・主操作・戻るを固定した一画面。工程を始めると他の選択枠と通常の大きな案内枠を隠す。結果も一画面で次の調合/開店へ。
- 乳鉢は軽い3タップ/短い擦りで進む。注水/瓶詰めは押し続けても短いドラッグ/補助タップでも完了。pointercancel/lost capture/画面離脱で入力を止める。素材は最後の仕上げだけ消費し、二重完了を防ぐ。
- 水は器の口の座標を回転変換し、その点から受け口へ透明な帯/ハイライト/波紋を描画。容器本体から出る固定の青線を撤去。新しい開口瓶に液面が増え、100%後に仕上げられる。匙は鍋の液面内を動かし、下部を液面マスクで隠す。
- 初回だけ journey.onboarding=0〜4。採取→街の道具→鍵と調合室→最初の一瓶→開店。上の行き先は段階的に表示。主人公のひと言を最初から開き、次の実操作ボタンを表示。最初の案内一覧の自動モーダルは出さない。保存・再開・案内メニューからスキップ可能。旧セーブはonboarding=-1として移動先を狭めない。
- 効果音は白色ノイズによる擦過音からCC0実録サンプルへ。擦る/打音/混ぜる/注ぐを分離、軽いピッチ/切出し差、音量設定、重なり制限とフェード。`assets/audio/foley/SOURCES.json`と設定内のクレジットに作者/出典。サンプルを短く切り出し、低域カット/音量調整/フェードを実施。聴感品質は自動検証で保証しない。
- 元の庭の縦長寸法/金縁/装飾メニュー/セーブ資産/客の報酬/現実日付回数を保持。新しい導線は初回だけ。
- テスト：実イベントで3タップ、押し続け注水、小さく混ぜる、押し続け瓶詰め、キャンセルでタイマー停止、最後の二重消費防止、既存セーブ自由移動、音量0/非表示/重なり制限を確認。管理プレビュー起動サービスが不在のためスマホ実画面・実機タッチ・最終音量バランスは未確認。
# v2.18.0 着せ替え用の着用済み手袋

- `dist/test/assets/wardrobe/fitted-gloved-arms-v4.png`：OpenAI組込み画像生成で制作した透明アトラス。既存4種の手袋の意匠とユーザー添付の主人公を参考に、前腕・手首・手袋の指を一体で生成。全身の完成イメージは別の生成プレビューであり、ゲーム画面そのものではありません。

- v2.18.4 `dist/test/assets/ui/botanical-reopen-button.png`：ユーザー採用の丸い＋ボタン案から、組込み画像生成で透過アセットを制作。生成り・古い真鍮・葉・白い花・緑石の意匠。中央の＋はHTMLで表示。

## 焚き火の環境音（v2.22.1）

- Fireplace Sound loop — PagDev
- https://opengameart.org/content/fireplace-sound-loop
- CC0 1.0: https://creativecommons.org/publicdomain/zero/1.0/
- 元音声: https://opengameart.org/sites/default/files/fire.wav
- 高域/低域を軽く整理し、-24 LUFS・最大-9dBTP目標で音量を整え、端40msをフェード。MP3 128kbps、44.1kHz。元の連続ノイズを夜の庭では止める。出所とハッシュはassets/audio/CAMPFIRE-SOURCE.json。
- 環境音スライダーに連動し、庭の夜だけ再生。移動でフェード停止、非表示で即停止。既存の昼夜BGMは保持。

## v2.24.0 Additional apothecary visitors
100 new original customer portraits generated for this game with OpenAI image generation. Four transparent 5×5 portrait atlases, in row-major authored order: visitors-1.png (exec-56ad6c57-7e71-4911-b915-735003476949), visitors-2.png (exec-708efadc-8311-4930-914d-c0eb56167aa3), visitors-3.png (exec-1c30f562-8601-48aa-9fad-ae62f74de1d3), visitors-4.png (exec-a8c92eba-5cb5-4cf5-881d-7ef935c8ec5c). Original PNG bytes retained; per-cell CSS positioning only. Names, dialogue and orders in src/customer-expansion.js. No third-party character likenesses or online profile data used.

## v2.24.1 Starter bedroom
Approved imagegen edit exec-c5236fe3-84b9-4315-8350-b11618ac72c3: original botanical bedroom simplified to furniture, desk lantern, journal and pet cushion, leaving empty decorating surfaces. Stored as assets/room/bedroom-starter.png; original PNG bytes, no subsequent image edits.

## v2.25.0 Room decorations
20 original watercolor botanical fantasy ornaments generated as one transparent sprite sheet with OpenAI image generation, exec-ad06e304-6bcd-4720-ab29-2b032c589c96. Original PNG stored unchanged at assets/room/decor-collection.png. Individual objects use measured CSS crop frames only. Room entry composition approved from exec-664d1c8d-72f9-4445-8c6d-15b57b36f1c9. Catalogue and editor reuse previously approved inventory-botanical-frame and forest-navigation-frame assets; labels, prices, stock and transaction controls are live HTML.

## Male protagonist sprites (v2.27.0)
- `assets/wardrobe/heads-male-v1.png` / `outfits-male-v1.png`: original generated transparent illustrations for this Site, 2026-10-25. Built-in image generation; existing approved protagonist atlases used only as style/material references. Head/hair in one drawing, adult masculine anatomy, four apothecary outfits. Prompts and generation IDs in ROOM_HANDOFF.md. Source PNG bytes preserved; rendering uses measured source-coordinate crops/masks and existing fitted glove/accessory art.
