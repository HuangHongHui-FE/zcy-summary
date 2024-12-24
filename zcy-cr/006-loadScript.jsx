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

renderUEditor() {
    const alljs = `${uePath}/ueditor.config.js`;
    const configjs = `${uePath}/ueditor.all.js`;
    const loadAll = this.loadScript(alljs, 'usalljs');
    const loadConfig = this.loadScript(configjs, 'ueconfigjs');
    return Promise.all([loadConfig, loadAll]);
}

