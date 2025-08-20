
function watermark(settings) {
    // 精简默认设置（只保留必要参数）
    const defaultSettings = {
        watermark_txt: "ID 禁止截图",
        watermark_color: '#aaa',
        watermark_alpha: 0.3, // 透明度
        watermark_fontsize: '18px', // 字体大小
        watermark_angle: 20 // 旋转角度
    };

    // 合并用户设置
    const config = { ...defaultSettings, ...settings };

    // 获取页面实际内容区域
    const contentArea = document.body.getBoundingClientRect();
    const contentWidth = contentArea.width;
    const contentHeight = contentArea.height;

    // 创建水印容器（限制在内容区域内）
    const watermarkContainer = document.createElement('div');
    watermarkContainer.style.position = 'absolute';
    watermarkContainer.style.top = `${contentArea.top}px`;
    watermarkContainer.style.left = `${contentArea.left}px`;
    watermarkContainer.style.width = `${contentWidth}px`;
    watermarkContainer.style.height = `${contentHeight}px`;
    watermarkContainer.style.overflow = 'hidden';
    watermarkContainer.style.pointerEvents = 'none';
    watermarkContainer.style.zIndex = '9999';

    // 计算水印密度（根据内容区域大小自适应）
    const cols = Math.ceil(contentWidth / 480);
    const rows = Math.ceil(contentHeight / 100);
    const xSpace = contentWidth / cols;
    const ySpace = contentHeight / rows;

    // 创建水印元素
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const watermarkEl = document.createElement('div');
            watermarkEl.textContent = config.watermark_txt;
            watermarkEl.style.position = 'absolute';
            watermarkEl.style.left = `${j * xSpace}px`;
            watermarkEl.style.top = `${i * ySpace}px`;
            watermarkEl.style.transform = `rotate(-${config.watermark_angle}deg)`;
            watermarkEl.style.opacity = config.watermark_alpha;
            watermarkEl.style.color = config.watermark_color;
            watermarkEl.style.fontSize = config.watermark_fontsize;
            watermarkEl.style.whiteSpace = 'nowrap';
            watermarkContainer.appendChild(watermarkEl);
        }
    }

    document.body.appendChild(watermarkContainer);
}

// 页面加载完成后初始化水印
window.addEventListener('load', () => {
    watermark({
        watermark_txt: `ID ${getNow()} 禁止截图`
    });
});

// 获取当前时间
function getNow() {
    const d = new Date();
    return `${d.getFullYear()}年${(d.getMonth() + 1).toString().padStart(2, '0')}月${d.getDate().toString().padStart(2, '0')}日 ${d.getHours().toString().padStart(2, '0')}时${d.getMinutes().toString().padStart(2, '0')}分${d.getSeconds().toString().padStart(2, '0')}秒`;
}
