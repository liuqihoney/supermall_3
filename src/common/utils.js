// 防抖函数
export function debounce(func, delay) { // 参数为方法名，延迟等待时间
  let timer = null
  return function(...args) {
    if(timer) clearTimeout(timer) //如果在等待时间内再次调用这个方法，清除上一次的等待
    timer = setTimeout(() => { //设置定时器，等待延迟，如果延迟过去，调用方法
      func.apply(this, args);
    }, delay);
  }
}
