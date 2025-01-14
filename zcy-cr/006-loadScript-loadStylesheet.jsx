loadScript(url, id) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        if (id) {
            script.id = id;
        }
        if (script.readyState) { // IE
            script.onreadystatechange = function () {
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                    script.onreadystatechange = null;
                    resolve();
                }
            };
        } else { // Others
            script.onload = function () {
                resolve();
            };
        }
        script.src = url;
        document.getElementsByTagName('body')[0].appendChild(script);
    });
}

export function loadScript(
    src: string,
    compCode: string
): Promise<React.LazyExoticComponent<React.ComponentType<any>>> {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;

        const handleLoad = () => {
            if (typeof (window as any)[compCode] === 'function') {
                // 创建一个懒加载组件
                const LazyComponent = React.lazy(() => Promise.resolve({ default: (window as any)[compCode] }));
                resolve(LazyComponent);
            } else {
                console.error('Failed to load comp script:', src, compCode);
                reject(new Error('Failed to load component from URL'));
            }
        };

        const handleError = () => {
            console.error('Failed to load comp script:', src, compCode);
            reject(new Error(`Failed to load comp script at ${compCode}`));
        };

        if ((script as unknown as XMLHttpRequest).readyState) {
            // IE
            (script as unknown as XMLHttpRequest).onreadystatechange = () => {
                if ((script as unknown as XMLHttpRequest).readyState === 4) {
                    (script as unknown as XMLHttpRequest).onreadystatechange = null;
                    handleLoad();
                }
            };
        } else {
            // 非IE
            script.onload = handleLoad;
            script.onerror = handleError;
        }

        document.head.appendChild(script);
    });
}

// export function loadStylesheet(
//     href: string,
//     compCode: string
// ): Promise<React.LazyExoticComponent<React.ComponentType<any>>> {
//     return new Promise((resolve, reject) => {
//         const link = document.createElement('link');
//         link.rel = 'stylesheet';
//         link.type = 'text/css';
//         link.href = href;
//         const handleLoad = () => {
//             resolve(null);
//         };

//         const handleError = () => {
//             console.error('Failed to load comp stylesheet:', link, compCode);
//             reject(new Error(`Failed to load comp stylesheet at ${compCode}`));
//         };

//         if ((link as unknown as XMLHttpRequest).readyState) {
//             // IE
//             (link as unknown as XMLHttpRequest).onreadystatechange = () => {
//                 if ((link as unknown as XMLHttpRequest).readyState === 4) {
//                     (link as unknown as XMLHttpRequest).onreadystatechange = null;
//                     handleLoad();
//                 }
//             };
//         } else {
//             // 非IE
//             link.onload = handleLoad;
//             link.onerror = handleError;
//         }

//         document.head.appendChild(link);
//     });
// }


renderUEditor() {
    const alljs = `${uePath}/ueditor.config.js`;
    const configjs = `${uePath}/ueditor.all.js`;
    const loadAll = this.loadScript(alljs, 'usalljs');
    const loadConfig = this.loadScript(configjs, 'ueconfigjs');
    return Promise.all([loadConfig, loadAll]);
}



// 推荐使用：systemjs来处理打包
