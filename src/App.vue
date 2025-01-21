<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  MinusOutlined,        // 最小化
  FullscreenOutlined,   // 最大化
  FullscreenExitOutlined, // 还原
  CloseOutlined         // 关闭
} from '@ant-design/icons-vue'

const count = ref(0)
const inputValue = ref('')
const isMaximized = ref(false)  // 添加一个状态来跟踪窗口是否最大化
const options = [
  { value: '1', label: '选项1' },
  { value: '2', label: '选项2' },
  { value: '3', label: '选项3' },
]

// 窗口控制函数
const minimize = () => {
  window.electronAPI.minimize()
}

const maximize = () => {
  window.electronAPI.maximize()
}

const close = () => {
  window.electronAPI.close()
}

onMounted(() => {
  // 添加事件监听
  const cleanup = window.electronAPI.onMaximize((maximized) => {
    isMaximized.value = maximized
  })

  // 组件卸载时清理
  onUnmounted(() => {
    cleanup()
  })
})
</script>

<template>
  <div class="layout">
    <div class="titlebar">
      <!-- 自定义标题栏内容 -->
      <div class="title">我的应用</div>
      <div class="window-controls">
        <a-button type="text" class="min-btn" @click="minimize">
          <template #icon><MinusOutlined /></template>
        </a-button>
        <a-button type="text" class="max-btn" @click="maximize">
          <template #icon>
            <FullscreenExitOutlined v-if="isMaximized" />
            <FullscreenOutlined v-else />
          </template>
        </a-button>
        <a-button type="text" class="close-btn" @click="close">
          <template #icon><CloseOutlined /></template>
        </a-button>
      </div>
    </div>
    <a-config-provider :theme="{ token: { colorPrimary: '#00b96b' } }">
      <div class="app-container">
        <!-- 按钮组 -->
        <div class="button-group">
          <a-button type="primary" @click="count++">点击次数: {{ count }}</a-button>
          <a-button type="default">默认按钮</a-button>
          <a-button type="dashed">虚线按钮</a-button>
          <a-button type="link">链接按钮</a-button>
        </div>

        <!-- 表单控件 -->
        <div class="form-group">
          <a-input v-model:value="inputValue" placeholder="请输入内容" style="width: 200px" />
          <a-select
            v-model:value="inputValue"
            style="width: 200px"
            placeholder="请选择"
            :options="options"
          />
        </div>

        <!-- 卡片展示 -->
        <a-card title="卡片标题" style="width: 300px">
          <p>卡片内容</p>
          <p>输入的内容: {{ inputValue }}</p>
        </a-card>
      </div>
    </a-config-provider>
  </div>
</template>

<style scoped>
.layout {
  height: 100%;  /* 填充父元素的全部高度 */
  width: 100%;   /* 填充父元素的全部宽度 */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: white; /* 或者你想要的背景色 */
}

.titlebar {
  height: 30px;
  min-height: 30px; /* 防止压缩 */
  background: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  user-select: none;
  -webkit-app-region: drag;
}

.window-controls {
  display: flex;
  -webkit-app-region: no-drag;
}

.window-controls .ant-btn {
  -webkit-app-region: no-drag;
  height: 30px;
  width: 46px;  /* Windows 风格的宽度 */
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  transition: all 0.2s;
  border: none;
}

/* 分别设置不同按钮的悬停效果 */
.window-controls .min-btn:hover {
  background-color: #e5e5e5;
}

.window-controls .max-btn:hover {
  background-color: #e5e5e5;
}

.window-controls .close-btn:hover {
  background-color: #e81123;
  color: white;
}

/* 图标大小调整 */
.window-controls .anticon {
  font-size: 12px;  /* 调整图标大小 */
}

.app-container {
  flex: 1;
  overflow: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: calc(100% - 30px); /* 减去标题栏高度 */
}

.button-group {
  display: flex;
  gap: 10px;
}

.form-group {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}
</style>
