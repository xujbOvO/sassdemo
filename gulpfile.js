const { series, watch, src } = require('gulp');
var Sassdoc = require('sassdoc');
var browserSync = require('browser-sync').create();
const scssPath = ['./*.scss', './src/**/*.scss']

function browsersync(cb) {
    browserSync.init({
        server: {
            baseDir: './'
        },
        port: 3001,
        startPath: './docs/index.html'
    });

    watch(scssPath, series(sassdoc));
    cb();
}

function sassdoc() {
    // 配置参数说明文档 http://sassdoc.com/configuration/
    var options = {
        dest: 'docs',
        verbose: true, // 显示日志
        // 控制显示access
        display: {
            access: ['public', 'private'],
            alias: true,
            watermark: true,
        },
        // 分组展示命名
        groups: {
            'undefined': 'Ungrouped',
            foo: 'Foo group',
            bar: 'Bar group',
        },
        // view source
        basePath: 'https://github.com/SassDoc/sassdoc',
    }

    return src(scssPath)
        .pipe(Sassdoc(options))
        .pipe(browserSync.reload({stream: true}));
}

exports.browsersync = browsersync;
exports.sassdoc = sassdoc;
