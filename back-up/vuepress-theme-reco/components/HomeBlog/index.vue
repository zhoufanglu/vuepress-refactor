<template>
  <div class="home-blog">
    <div class="hero" :style="{ ...bgImageStyle }">
      <div class="bg-water" ref="boxRef">
        <canvas class="bg-canvas" ref="canvasRef"> </canvas>
      </div>
      <div class="text-panel">
        <ModuleTransition>
          <img
            class="hero-img"
            v-if="recoShowModule && $frontmatter.heroImage"
            :style="heroImageStyle || {}"
            :src="$withBase($frontmatter.heroImage)"
            alt="hero"
          />
        </ModuleTransition>

        <ModuleTransition delay="0.04">
          <h1 style="font-family: 'Rock Salt', cursive;" v-if="recoShowModule && $frontmatter.heroText !== null">
            {{ $frontmatter.heroText || $title || 'vuePress-theme-reco' }}
          </h1>
        </ModuleTransition>

        <ModuleTransition delay="0.08">
          <p v-if="recoShowModule && $frontmatter.tagline !== null" class="description">
            {{ $frontmatter.tagline || $description || 'Welcome to your vuePress-theme-reco site' }}
          </p>
        </ModuleTransition>

        <ModuleTransition delay="0.08">
          <p id="descText" class="description">
          </p>
        </ModuleTransition>
      </div>
    </div>

    <ModuleTransition delay="0.16">
      <div v-show="recoShowModule" class="home-blog-wrapper">
        <div class="blog-list">
          <!-- 博客列表 -->
          <note-abstract :data="$recoPosts" @paginationChange="paginationChange" />
        </div>
        <div class="info-wrapper">
          <PersonalInfo/>
          <h4><reco-icon icon="reco-category" /> {{$recoLocales.category}}</h4>
          <ul class="category-wrapper">
            <li class="category-item" v-for="(item, index) in this.$categories.list" :key="index">
              <router-link :to="item.path">
                <span class="category-name">{{ item.name }}</span>
                <span class="post-num" :style="{ 'backgroundColor': getOneColor() }">{{ item.pages.length }}</span>
              </router-link>
            </li>
          </ul>
          <hr>
          <h4 v-if="$tags.list.length !== 0"><reco-icon icon="reco-tag" /> {{$recoLocales.tag}}</h4>
          <TagList @getCurrentTag="getPagesByTags" />
          <h4 v-if="$themeConfig.friendLink && $themeConfig.friendLink.length !== 0"><reco-icon icon="reco-friend" /> {{$recoLocales.friendLink}}</h4>
          <FriendLink />
        </div>
      </div>
    </ModuleTransition>

    <ModuleTransition delay="0.24">
      <Content v-show="recoShowModule" class="home-center" custom/>
    </ModuleTransition>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import TagList from '@theme/components/TagList'
import FriendLink from '@theme/components/FriendLink'
import NoteAbstract from '@theme/components/NoteAbstract'
import { ModuleTransition, RecoIcon } from '@vuepress-reco/core/lib/components'
import PersonalInfo from '@theme/components/PersonalInfo'
import { getOneColor } from '@theme/helpers/other'
import { useInstance, useShowModule } from '@theme/helpers/composable'
import WaterRipple from '@theme/components/Mode/waterRipple'

export default defineComponent({
  components: { NoteAbstract, TagList, FriendLink, ModuleTransition, PersonalInfo, RecoIcon },
  setup (props, ctx) {
    const instance = useInstance()

    const state = reactive({
      recoShow: false,
      heroHeight: 0
    })

    const recoShowModule = useShowModule()

    const heroImageStyle = computed(() => instance.$frontmatter.heroImageStyle || {})

    const bgImageStyle = computed(() => {
      const url = instance.$frontmatter.bgImage
        ? instance.$withBase(instance.$frontmatter.bgImage)
        : require('./img.jpg')

      const initBgImageStyle = {
        textAlign: 'center',
        overflow: 'hidden',
        background: `url(${url}) center/cover no-repeat`
      }

      const { bgImageStyle } = instance.$frontmatter

      return bgImageStyle ? { ...initBgImageStyle, ...bgImageStyle } : initBgImageStyle
    })

    onMounted(() => {
      state.heroHeight = document.querySelector('.hero').clientHeight
      state.recoShow = true

      /**********************首页输入文字-----S***********************/
      class TextScramble {
        constructor(el) {
          this.el = el
          this.chars = '!<>-_\\/[]{}—=+*^?#________'
          this.update = this.update.bind(this)
        }
        setText(newText) {
          const oldText = this.el.innerText
          const length = Math.max(oldText.length, newText.length)
          const promise = new Promise((resolve) => this.resolve = resolve)
          this.queue = []
          for (let i = 0; i < length; i++) {
            const from = oldText[i] || ''
            const to = newText[i] || ''
            const start = Math.floor(Math.random() * 40)
            const end = start + Math.floor(Math.random() * 40)
            this.queue.push({ from, to, start, end })
          }
          cancelAnimationFrame(this.frameRequest)
          this.frame = 0
          this.update()
          return promise
        }
        update() {
          let output = ''
          let complete = 0
          for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i]
            if (this.frame >= end) {
              complete++
              output += to
            } else if (this.frame >= start) {
              if (!char || Math.random() < 0.28) {
                char = this.randomChar()
                this.queue[i].char = char
              }
              output += `<span class="dud">${char}</span>`
            } else {
              output += from
            }
          }
          this.el.innerHTML = output
          if (complete === this.queue.length) {
            this.resolve()
          } else {
            this.frameRequest = requestAnimationFrame(this.update)
            this.frame++
          }
        }
        randomChar() {
          return this.chars[Math.floor(Math.random() * this.chars.length)]
        }
      }
      const el = document.getElementById('descText')
      const fx = new TextScramble(el)
      const phrases = [
        '书山有路勤为径',
        '学海无涯苦作舟',
        '做难事必有所得',
        '人生而在世，当为君子'
      ]
      // fx.setText('写代码的憨憨')
      let counter = 0
      const next = () => {
        fx.setText(phrases[counter]).then(() => {
          setTimeout(next, 1200)
        })
        counter = (counter + 1) % phrases.length
      }

      next()
      /**********************首页输入文字-----E***********************/

      /**********************波纹效果***********************/
      const waterBg = require('./img.jpg');
      const boxRef =  document.querySelector('.bg-water')
      const canvasRef = document.querySelector('.bg-canvas')
      console.log(192, boxRef)
      let canvasWidth = 600,
          canvasHeight = 600

      if (boxRef && canvasRef) {
        const { offsetWidth, offsetHeight } = boxRef
        canvasWidth = offsetWidth
        canvasHeight = offsetHeight
        canvasRef.width = canvasWidth
        canvasRef.height = canvasHeight
      }

      const waterImg = new Image()
      waterImg.src = waterBg
      const waterRipple = new WaterRipple({
        canvas: canvasRef,
        background: waterImg,
        boxRef,
      })

      waterRipple.animate()

      const timer = window.setInterval(() => {
        const x = Math.floor(canvasWidth * Math.random())
        const y = Math.floor(canvasHeight * Math.random())
        waterRipple?.ripple(x, y)
      }, 1000)

      waterRipple.addMousemove()

    })

    return { recoShowModule, heroImageStyle, bgImageStyle, ...toRefs(state), getOneColor }
  },
  methods: {
    paginationChange (page) {
      setTimeout(() => {
        window.scrollTo(0, this.heroHeight)
      }, 100)
    },
    getPagesByTags (tagInfo) {
      this.$router.push({ path: tagInfo.path })
    }
  }
})
</script>

<style lang="stylus">
.home-blog {
  padding: 0;
  margin: 0px auto;
  .text-panel{
    position: absolute;
    right: 20px;
    top: 20px;
    text-shadow: #000 0 0 10px
  }
  .bg-water{
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    box-sizing 'border-box'
  }
  .hero {
    margin $navbarHeight auto 0
    position relative
    box-sizing border-box
    padding 0 20px
    height 100vh
    display flex
    align-items center
    justify-content center
    .hero-img {
      max-width: 300px;
      margin: 0 auto 1.5rem
    }

    h1 {
      display: block;
      margin:0 auto 1.8rem;
      font-size: 2.5rem;
    }

    .description {
      margin: 1.8rem auto;
      font-size: 1.6rem;
      line-height: 1.3;
    }
  }
  .home-blog-wrapper {
    display flex
    align-items: flex-start;
    margin 20px auto 0
    padding 0 20px
    max-width $homePageWidth
    .blog-list {
      flex auto
      width 0
      .abstract-wrapper {
        .abstract-item:last-child {
          margin-bottom: 0px;
        }
      }
    }
    .info-wrapper {
      position -webkit-sticky;
      position sticky;
      top 70px
      overflow hidden
      transition all .3s
      margin-left 15px
      flex 0 0 300px
      height auto
      box-shadow var(--box-shadow)
      border-radius $borderRadius
      box-sizing border-box
      padding 0 15px
      background var(--background-color)
      &:hover {
        box-shadow var(--box-shadow-hover)
      }
      h4 {
        color var(--text-color)
      }
      .category-wrapper {
        list-style none
        padding-left 0
        .category-item {
          margin-bottom .4rem
          padding: .4rem .8rem;
          transition: all .5s
          border-radius $borderRadius
          box-shadow var(--box-shadow)
          background-color var(--background-color)
          &:hover {
            transform scale(1.04)
            a {
              color $accentColor
            }
          }
          a {
            display flex
            justify-content: space-between
            align-items: center
            color var(--text-color)
            .post-num {
              width 1.6rem;
              height 1.6rem
              text-align center
              line-height 1.6rem
              border-radius $borderRadius
              background #eee
              font-size 13px
              color #fff
            }
          }
        }
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .home-blog {
    .hero {
      height 100vh!important;
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        margin: 0 auto 1.8rem ;
        font-size: 2rem;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }
    .home-blog-wrapper {
      display block!important
      .blog-list {
        width auto
      }
      .info-wrapper {
        // display none!important
        margin-left 0
        .personal-info-wrapper {
          display none
        }
      }
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home-blog {
    .hero {
      height 100vh!important;
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        margin: 0 auto 1.8rem ;
        font-size: 2rem;
      }

      h1, .description, .action {
        // margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .home-blog-wrapper {
      display block!important
      .blog-list {
        width auto
      }
      .info-wrapper {
        // display none!important
        margin-left 0
        .personal-info-wrapper {
          display none
        }
      }
    }
  }
}
</style>
