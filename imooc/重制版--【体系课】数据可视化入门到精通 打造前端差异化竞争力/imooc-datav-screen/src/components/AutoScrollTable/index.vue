<template>
  <div class="dv-scroll-board" :ref="ref">
    <div class="header" v-if="header.length && mergedConfig" :style="`background-color: ${mergedConfig.headerBGC};`">
      <div
        class="header-item"
        v-for="(headerItem, i) in header"
        :key="headerItem + i"
        :style="`
          height: ${mergedConfig.headerHeight}px;
          line-height: ${mergedConfig.headerHeight}px;
          width: ${widths[i]}px;
          font-size: ${mergedConfig.headerFontSize}px;
        `"
        :align="aligns[i]"
        v-html="headerItem"
      />
    </div>

    <div
      v-if="mergedConfig"
      class="rows"
      :style="{
       height: `${height - (header.length ? mergedConfig.headerHeight : 0) - mergedConfig.columnMarginTop}px`,
       marginTop: `${mergedConfig.columnMarginTop}px`,
       marginRight: `${mergedConfig.columnMarginRight}px`,
      }"
    >
      <div
        class="row-item"
        v-for="(row, ri) in rows"
        :key="row.toString() + row.scroll"
        :style="`
          height: ${heights[ri]}px;
          line-height: ${heights[ri]}px;
          background-color: ${mergedConfig[row.rowIndex % 2 === 0 ? 'evenRowBGC' : 'oddRowBGC']};
          fontSize: ${mergedConfig.columnFontSize}px;
        `"
      >
        <div
          class="ceil"
          v-for="(ceil, ci) in row.ceils"
          :key="ceil + ri + ci"
          :style="{
            width: `${widths[ci]}px`,
            ...mergedConfig.columnStyle[ci]
          }"
          :align="aligns[ci]"
          v-html="ceil"
          @click="emitEvent(ri, ci, row, ceil)"
        />

      </div>
    </div>
  </div>
</template>

<script>
  import autoResize from '../Container/autoResize'
  import { deepMerge } from '@jiaminghi/charts/lib/util/index'
  import { deepClone } from '@jiaminghi/c-render/lib/plugin/util'

  export default {
    name: 'AutoScrollTable',
    mixins: [autoResize],
    props: {
      config: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        ref: 'scroll-board',
        defaultConfig: {
          /**
           * @description Board header
           * @type {Array<String>}
           * @default header = []
           * @example header = ['column1', 'column2', 'column3']
           */
          header: [],
          /**
           * @description Board data
           * @type {Array<Array>}
           * @default data = []
           */
          data: [],
          /**
           * @description Row num
           * @type {Number}
           * @default rowNum = 5
           */
          rowNum: 5,
          /**
           * @description Header background color
           * @type {String}
           * @default headerBGC = '#00BAFF'
           */
          headerBGC: '#00BAFF',
          headerFontSize: 15, // 表头文字大小
          columnFontSize: 14, // 列文字大小
          columnMarginTop: 0, // 表格与表头间距
          columnMarginRight: 0, // 表格与右侧间距
          /**
           * @description Odd row background color
           * @type {String}
           * @default oddRowBGC = '#003B51'
           */
          oddRowBGC: '#003B51',
          /**
           * @description Even row background color
           * @type {String}
           * @default evenRowBGC = '#003B51'
           */
          evenRowBGC: '#0A2732',
          /**
           * @description Scroll wait time
           * @type {Number}
           * @default waitTime = 2000
           */
          waitTime: 2000,
          /**
           * @description Header height
           * @type {Number}
           * @default headerHeight = 35
           */
          headerHeight: 35,
          /**
           * @description Column width
           * @type {Array<Number>}
           * @default columnWidth = []
           */
          columnWidth: [],
          columnIndex: [],
          columnStyle: [],
          /**
           * @description Column align
           * @type {Array<String>}
           * @default align = []
           * @example align = ['left', 'center', 'right']
           */
          align: [],
          /**
           * @description Show index
           * @type {Boolean}
           * @default index = false
           */
          index: false,
          /**
           * @description index Header
           * @type {String}
           * @default indexHeader = '#'
           */
          indexHeader: '#',
          /**
           * @description Carousel type
           * @type {String}
           * @default carousel = 'single'
           * @example carousel = 'single' | 'page'
           */
          carousel: 'single',
          autoPlay: true
        },
        mergedConfig: null,
        header: [],
        rowsData: [],
        rows: [],
        widths: [],
        heights: [],
        avgHeight: 0,
        aligns: [],
        animationIndex: 0,
        animationHandler: '',
        updater: 0
      }
    },
    watch: {
      config() {
        this.stopAnimation()
        this.calcData()
      }
    },
    methods: {
      afterAutoResizeMixinInit() {
        this.calcData()
      },
      onResize() {
        if (!this.mergedConfig) return
        this.calcWidths()
        this.calcHeights()
      },
      calcData() {
        this.mergeConfig()
        this.calcHeaderData()
        this.calcRowsData()
        this.calcWidths()
        this.calcHeights()
        this.calcAligns()
        if (this.mergedConfig.autoPlay) {
          this.animation(true)
        }
      },
      mergeConfig() {
        this.mergedConfig = deepMerge(deepClone(this.defaultConfig, true), this.config || {})
      },
      calcHeaderData() {
        let { header, index, indexHeader } = this.mergedConfig
        if (!header.length) {
          this.header = []
          return
        }
        header = [...header]
        if (index) header.unshift(indexHeader)
        this.header = header
      },
      calcRowsData() {
        let { data, index, headerBGC, rowNum, columnIndex } = this.mergedConfig
        if (index) {
          data = data.map((row, i) => {
            row = [...row]
            let indexTag = `<span class="index" style="background-color: ${headerBGC};">${i + 1}</span>`
            if (columnIndex && columnIndex[i]) {
              indexTag = columnIndex[i]
            }
            row.unshift(indexTag)
            return row
          })
        }
        data = data.map((ceils, i) => ({ ceils, rowIndex: i }))
        const rowLength = data.length
        if (rowLength > rowNum && rowLength < 2 * rowNum) {
          data = [...data, ...data]
        }
        data = data.map((d, i) => ({ ...d, scroll: i }))
        this.rowsData = data
        this.rows = data
      },
      calcWidths() {
        const { columnWidth, header } = this.mergedConfig
        const usedWidth = columnWidth.reduce((all, w) => all + w, 0)
        let columnNum = 0
        if (this.rowsData[0]) {
          columnNum = this.rowsData[0].ceils.length
        } else if (header.length) {
          columnNum = header.length
        }
        const avgWidth = (this.width - usedWidth) / (columnNum - columnWidth.length)
        const widths = new Array(columnNum).fill(avgWidth)
        this.widths = deepMerge(widths, columnWidth)
      },
      calcHeights(onresize = false) {
        const { headerHeight, rowNum, data, columnMarginTop } = this.mergedConfig
        let allHeight = this.height
        if (this.header.length) allHeight -= headerHeight
        allHeight -= columnMarginTop
        const avgHeight = allHeight / rowNum
        this.avgHeight = avgHeight
        if (!onresize) this.heights = new Array(data.length).fill(avgHeight)
      },
      calcAligns() {
        const columnNum = this.header.length
        const aligns = new Array(columnNum).fill('left')
        const { align } = this.mergedConfig
        this.aligns = deepMerge(aligns, align)
      },
      async animation(start = false) {
        let { avgHeight, animationIndex, mergedConfig, rowsData, animation, updater } = this
        const { waitTime, carousel, rowNum } = mergedConfig
        const rowLength = rowsData.length
        if (rowNum >= rowLength) return
        if (start) {
          await new Promise(resolve => setTimeout(resolve, waitTime))
          if (updater !== this.updater) return
        }
        const animationNum = carousel === 'single' ? 1 : rowNum
        const rows = rowsData.slice(animationIndex)
        rows.push(...rowsData.slice(0, animationIndex))
        this.rows = rows
        this.heights = new Array(rowLength).fill(avgHeight)
        await new Promise(resolve => setTimeout(resolve, 300))
        if (updater !== this.updater) return
        this.heights.splice(0, animationNum, ...new Array(animationNum).fill(0))
        animationIndex += animationNum
        const back = animationIndex - rowLength
        if (back >= 0) animationIndex = back
        this.animationIndex = animationIndex
        this.animationHandler = setTimeout(animation, waitTime - 300)
      },
      stopAnimation() {
        const { animationHandler, updater } = this
        this.updater = (updater + 1) % 999999
        if (!animationHandler) return
        clearTimeout(animationHandler)
      },
      emitEvent(ri, ci, row, ceil) {
        const { ceils, rowIndex } = row
        this.$emit('click', {
          row: ceils,
          ceil,
          rowIndex,
          columnIndex: ci
        })
      }
    },
    destroyed() {
      const { stopAnimation } = this
      stopAnimation()
    }
  }
</script>

<style lang="less">
  .dv-scroll-board {
    position: relative;
    width: 100%;
    height: 100%;
    color: #fff;

    .text {
      padding: 0 10px;
      box-sizing: border-box;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .header {
      display: flex;
      flex-direction: row;
      font-size: 15px;

      .header-item {
        .text;
        transition: all 0.3s;
      }
    }

    .rows {
      overflow: hidden;

      .row-item {
        display: flex;
        font-size: 24px;
        transition: all 0.3s;
      }

      .ceil {
        .text;
      }

      .index {
        border-radius: 3px;
        padding: 0 3px;
      }
    }
  }
</style>
