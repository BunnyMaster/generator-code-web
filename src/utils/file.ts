export function downloadTextAsFile(text: string, filename: string) {
  // 直接创建 File 对象（比 Blob 更高级）
  const file = new File([text], filename, { type: 'text/plain' });

  // 创建下载链接
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;

  // 触发下载
  document.body.appendChild(a);
  a.click();

  // 清理
  requestIdleCallback(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  });
}
