<template>
  <div>
    <Navbar/>
    <div class="write-example">
      <p>本网站所有博客均由HTML书写，以下是自定义的写法规则</p>

      <p class="sm-title">标题</p>
      <p>大标题</p>
      <div class="code">
        <pre class="single-line"><code class="hljs csharp">&lt;p <span class="hljs-keyword">class</span>=<span class="hljs-string">"title"</span>&gt;大标题&lt;/p&gt;</code></pre>
      </div>
      <p>小标题</p>
      <div class="code">
        <pre class="single-line"><code class="html hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sm-title"</span>&gt;</span>小标题<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
      </div>

      <p class="sm-title" style="margin-top: 50px;">段落</p>
      <p>普通段落</p>
      <div class="code">
        <pre class="single-line"><code class="html hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是段落<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
      </div>
      <p>带有颜色的段落</p>
      <div class="code">
        <pre class="single-line"><code class="html hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>带有<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>颜色<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>的段落<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
      </div>


      <p class="sm-title" style="margin-top: 50px;">图片</p>
      <div class="code">
        <pre><code class="html hljs xml"><table class="hljs-ln"><tbody><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img"</span>&gt;</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">     <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../assets/img/user.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"这是图片"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"这是图片"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100px"</span>&gt;</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></div></td></tr></tbody></table></code></pre>
      </div>

      <p class="sm-title" style="margin-top: 50px;">页脚注释</p>
      <div class="code">
        <pre class="single-line"><code class="html hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"info"</span>&gt;</span>这是一段页脚注释<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
      </div>


      <p class="sm-title" style="margin-top: 50px;">解释文本</p>
      <div class="code">
        <pre><code class="html hljs xml"><table class="hljs-ln"><tbody><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"explain"</span>&gt;</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">   这是一段解释文本</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></div></td></tr></tbody></table></code></pre>
      </div>

      <p class="sm-title" style="margin-top: 50px;">列表</p>
      <p>无序列表</p>
      <div class="code">
        <pre><code class="html hljs xml"><table class="hljs-ln"><tbody><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>无序列表项1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>无序列表项2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="4"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>无序列表项3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="5"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></div></td></tr></tbody></table></code></pre>
      </div>
      <p>有序列表</p>
     <div class="code">
       <pre><code class="html hljs xml"><table class="hljs-ln"><tbody><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">   <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>有序列表项1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">   <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>有序列表项2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="4"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">   <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>有序列表项3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="5"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span></div></td></tr></tbody></table></code></pre>
     </div>

      <p class="sm-title" style="margin-top: 50px;">代码块</p>
      <p>以如下形式存放代码块</p>
      <div class="code">
        <pre><code class="html hljs xml"><table class="hljs-ln"><tbody><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"code"</span>&gt;</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">  这里存放代码块</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></div></td></tr></tbody></table></code></pre>
      </div>



    </div>
  </div>
</template>

<script>
import Navbar from "@com/Navbar";
export default {
  name: "write-example",
  components:{
    Navbar
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/blogdetail2";
  .write-example{
    margin: 10px auto;
    max-width: 800px;
    padding: 20px;
    background-color: white;
  }
  pre{
    padding: 8px 0;
    &.single-line{
      padding-left: 8px;
    }
  }
</style>
