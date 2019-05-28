# Rubify

**Rubify** is an HTML Generator for **ruby characters** (phonetic guides). Its main purpose is to place **Jyutping** (粵拼) and **Pinyin** (漢語拼音) above Chinese characters (漢字).

https://kamide.github.io/Rubify/


## Examples

凹凸凸凹 + āotú tū'āo = <ruby><rb>凹凸</rb><rt>āotú</rt><rb>凸凹</rb><rt>tū'āo</rt></ruby>

```html
<ruby><rb>凹凸</rb><rt>āotú</rt><rb>凸凹</rb><rt>tū'āo</rt></ruby>
```

三九四零五二七八六 + saam1 gau2 sei3 ling4 ng5 ji6 cat1 baat3 luk6 = <ruby><rb style="color: lightskyblue;">三</rb><rt style="color: lightskyblue;">saam<sup>1</sup></rt><rb style="color: orange;">九</rb><rt style="color: orange;">gau<sup>2</sup></rt><rb style="color: royalblue;">四</rb><rt style="color: royalblue;">sei<sup>3</sup></rt><rb style="color: darkseagreen;">零</rb><rt style="color: darkseagreen;">ling<sup>4</sup></rt><rb style="color: crimson;">五</rb><rt style="color: crimson;">ng<sup>5</sup></rt><rb style="color: midnightblue;">二</rb><rt style="color: midnightblue;">ji<sup>6</sup></rt><rb style="color: lightskyblue;">七</rb><rt style="color: lightskyblue;">cat<sup>1</sup></rt><rb style="color: royalblue;">八</rb><rt style="color: royalblue;">baat<sup>3</sup></rt><rb style="color: midnightblue;">六</rb><rt style="color: midnightblue;">luk<sup>6</sup></rt></ruby>

```html
<ruby><rb style="color: lightskyblue;">三</rb><rt style="color: lightskyblue;">saam<sup>1</sup></rt><rb style="color: orange;">九</rb><rt style="color: orange;">gau<sup>2</sup></rt><rb style="color: royalblue;">四</rb><rt style="color: royalblue;">sei<sup>3</sup></rt><rb style="color: darkseagreen;">零</rb><rt style="color: darkseagreen;">ling<sup>4</sup></rt><rb style="color: crimson;">五</rb><rt style="color: crimson;">ng<sup>5</sup></rt><rb style="color: midnightblue;">二</rb><rt style="color: midnightblue;">ji<sup>6</sup></rt><rb style="color: lightskyblue;">七</rb><rt style="color: lightskyblue;">cat<sup>1</sup></rt><rb style="color: royalblue;">八</rb><rt style="color: royalblue;">baat<sup>3</sup></rt><rb style="color: midnightblue;">六</rb><rt style="color: midnightblue;">luk<sup>6</sup></rt></ruby>
```
