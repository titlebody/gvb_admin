<script setup>
import SimpleIconsTencentqq from '~icons/simple-icons/tencentqq';
import SimpleIconsWechat from '~icons/simple-icons/wechat';
import SimpleIconsBilibili from '~icons/simple-icons/bilibili';
import SimpleIconsGithub from '~icons/simple-icons/github';
</script>

<template>
  <a-card class="overflow-hidden">
    <div data-state="#about" >
      <div class="card-header">
        <div
          class="card-cover"
          style="
            background-image: url('https://img.zcool.cn/community/016e5d6547b124000ce610004b6c80.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100');
          "
        ></div>
        <img
          class="card-avatar"
          src="https://img.zcool.cn/community/016e5d6547b124000ce610004b6c80.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_1000"
          alt="avatar"
        />
        <h1 class="card-fullname">胡晨曦</h1>
        <h2 class="card-jobtitle">UI Developer</h2>
      </div>
      <div class="card-main">
        <div class="card-section is-active" id="about">
          <div class="card-content">
            <div class="card-subtitle">ABOUT</div>
            <p class="card-desc">
              本人菜鸟一枚，自己经常在网上查看别人的博客资料，深受启发。近来回想自己学习过的知识，繁多杂乱，故想通过写博客的形式进行总结整理一下，也可以给需要的朋友提供参考。
            </p>
          </div>
          <div class="card-social">
            <a>
              <SimpleIconsTencentqq class=" w-[1.8rem] h-[1.8rem] svg"></SimpleIconsTencentqq>
            </a>
            <a>
              <SimpleIconsWechat  class=" w-[1.8rem] h-[1.8rem] svg"></SimpleIconsWechat>
            </a>
           <a>
             <SimpleIconsBilibili  class=" w-[1.8rem] h-[1.8rem] svg"></SimpleIconsBilibili>
           </a>
          <a>
            <SimpleIconsGithub class=" w-[1.8rem] h-[1.8rem] svg"></SimpleIconsGithub>
          </a>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=DM+Sans:400,500|Jost:400,500,600&display=swap");

* {
  box-sizing: border-box;
}

.card {
  max-width: 100%;
  margin: auto;
  overflow-y: auto;
  position: relative;
  z-index: 1;
  overflow-x: hidden;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  transition: 0.3s;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.2);
}

.card[data-state="#about"] {
  height: 450px;
  .card-main {
    padding-top: 0;
  }
}

.card[data-state="#contact"] {
  height: 430px;
}

.card[data-state="#experience"] {
  height: 550px;
}

.card.is-active {
  .card-header {
    height: 80px;
  }

  .card-cover {
    height: 100px;
    top: -50px;
  }

  .card-avatar {
    transform: none;
    left: 20px;
    width: 50px;
    height: 50px;
    bottom: 10px;
  }

  .card-fullname,
  .card-jobtitle {
    left: 86px;
    transform: none;
  }

  .card-fullname {
    bottom: 18px;
    font-size: 19px;
  }

  .card-jobtitle {
    bottom: 16px;
    letter-spacing: 1px;
    font-size: 10px;
  }
}

.card-header {
  position: relative;
  display: flex;
  height: 200px;
  flex-shrink: 0;
  width: 100%;
  transition: 0.3s;

  * {
    transition: 0.3s;
  }
}

.card-cover {
  width: 100%;
  height: 100%;
  position: absolute;
  height: 160px;
  top: -20%;
  left: 0;
  will-change: top;
  background-size: cover;
  background-position: center;
  filter: blur(30px);
  transform: scale(1.2);
  transition: 0.5s;
}

.card-avatar {
  width: 100px;
  height: 100px;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  object-position: center;
  object-fit: cover;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-64px);
}

.card-fullname {
  position: absolute;
  bottom: 0;
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  transform: translateY(-10px) translateX(-50%);
  left: 50%;
}

.card-jobtitle {
  position: absolute;
  bottom: 0;
  font-size: 11px;
  white-space: nowrap;
  font-weight: 500;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-7px);
}

.card-main {
  position: relative;
  flex: 1;
  display: flex;
  padding-top: 10px;
  flex-direction: column;
}

.card-subtitle {
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 8px;
}

.card-content {
  padding: 20px;
}

.card-desc {
  line-height: 1.6;
  color: #636b6f;
  font-size: 14px;
  margin: 0;
  font-weight: 400;
  font-family: "DM Sans", sans-serif;
}

.card-social {
  display: flex;
  padding: 0 20px;
  margin-bottom: 30px;
  justify-content: space-around;
  .svg {
    fill: rgb(165, 181, 206);
    width: 32px;
    display: block;
    transition: 0.6s;
    cursor: pointer;
  }
  a {
    color: #8797a1;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: 0.8s;
    background-color: rgba(93, 133, 193, 0.05);
    margin-right: 10px;

    &:hover {
      .svg {
        color: black;
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

.card-section {
  display: none;
  &.is-active {
    display: block;
    animation: fadeIn 0.6s both;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translatey(40px);
  }
  100% {
    opacity: 1;
  }
}
</style>