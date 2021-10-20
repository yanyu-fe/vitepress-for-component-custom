<template>
  <ClientOnly>
    <article v-bind="$attrs" class="demo">
      <div class="demo-slot">
        <slot></slot>
      </div>

      <div class="demo-title-desc" v-show="title || desc">
        <span class="demo-title">{{ title }}</span>
        <span class="demo-desc" v-html="getDesc"></span>
      </div>

      <div class="demo-actions">
        <div class="demo-platforms">
          <OnlineEdit v-if="codeSandBox" :content="decodedCodeStr" :importMap="importMap" />
        </div>
        <div class="demo-buttons">
          <div class="demo-actions-copy">
            <span v-show="showTip" class="demo-actions-tip">复制成功!</span>
            <copySvg v-show="!showTip" @click="copyCode" title="复制" />
          </div>
          <codeSvg
            class="demo-actions-expand"
            @click="toggleExpand()"
            title="展开"
          />
        </div>
      </div>
      <div
        v-show="expand"
        v-html="decodedHtmlStr"
        :class="`language-${language} extra-class`"
      />
    </article>
  </ClientOnly>
</template>

<script lang="ts">
import { computed } from 'vue'
import './demo.css'
import copySvg from './icons/copy.vue'
import codeSvg from './icons/code.vue'
import OnlineEdit from './OnlineEdit'
import { useCopyCode } from './useCopyCode'
import { useParseCode } from './useParseCode'

export default {
  props: {
    componentName: String,
    htmlStr: String,
    codeStr: String,
    importMap: String,
    language: { default: 'vue', type: String },
    platforms: {
      default: () => ['codepen'],
      type: Array
    },
    jsLibsStr: { type: String, default: '[]' },
    cssLibsStr: { type: String, default: '[]' },
    title: { type: String, default: '' },
    desc: { type: String, default: '' },
    codeSandBox:{type:Boolean,default:false}
  },
  components: {
    copySvg,
    codeSvg,
    OnlineEdit
  },
  setup(props:any) {
    const decodedHtmlStr = computed(() =>
      decodeURIComponent(props.htmlStr ?? '')
    )
    const decodedCodeStr = computed(() =>
      decodeURIComponent(props.codeStr ?? '')
    )
    const { showTip, copyCode } = useCopyCode(decodedCodeStr.value)
    const { expand, toggleExpand, parsedCode } = useParseCode(
      decodedCodeStr.value,
      props.jsLibsStr,
      props.cssLibsStr
    )

    const getDesc = computed(()=>{
      // 判断数据中是否存在\n，存在就对当前的数据做换行处理
      const desc = props.desc;
      return desc?.replace(/\\n/,"<br/>")
    })

    return {
      getDesc,
      expand,
      toggleExpand,
      decodedHtmlStr,
      parsedCode,
      showTip,
      copyCode,
      decodedCodeStr
    }
  }
}
</script>
